import { inject, observer } from "mobx-react";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import constructNodesAndLinks from "./utils";

const ActorModal = ({ actorStore }) => {
  const { actorInfo } = actorStore;
  const info = JSON.parse(JSON.stringify(actorInfo));
  const svgRef = useRef(null);
  const [collide, setCollide] = useState(true);
  const [useRadial, setUseRadial] = useState(false);
  const [radialForce, setRadialForce] = useState(0.5);

  // 从info中构造数据
  const data = constructNodesAndLinks(info);

  function createTooltipText(links, d) {
    if (d.type === "img") {
      return `<img src="${d.imgUrl}" 
      style="width: 100px"/>`;
    }
    else
      return `<strong>${d.name}</strong><br/>`;
  }

  useEffect(() => {
    const width = 800;
    const height = 600;
    const svg = d3
      .select(svgRef.current)
      .style("overflow", "visible")
      .attr("viewBox", [0, 0, width, height]);

    const links = data.links; // Reuse the same nodes to have the animation work when changing the inputs
    const nodes = data.nodes;

    const simulation = d3
      .forceSimulation(nodes)
      .alpha(1)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
          .strength(0.25)
      )
      .force("charge", d3.forceManyBody())
      .force("collide", collide ? d3.forceCollide(30).iterations(4) : null)
      .force(
        "position",
        useRadial
          ? d3
            .forceRadial(
              (d) =>
                d.id.includes("Drag Race") ? width * 0.01 : width * 0.5,
              width / 2,
              height / 2
            )
            .strength(radialForce)
          : null
      )
      .force("x", d3.forceX(width / 2))
      .force("y", d3.forceY(height / 2).strength((0.1 * width) / height));

    const tooltip = d3
      .select("#actorBody")
      .append("div")
      .attr("class", "toolTip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .text("Placeholder");

    let linkedByIndex = {};
    data.links.forEach((d) => {
      linkedByIndex[`${d.source.id},${d.target.id}`] = true;
    });

    // nodes map
    let nodesById = {};
    data.nodes.forEach((d) => {
      nodesById[d.id] = { ...d };
    });

    const isConnectedAsSource = (a, b) => linkedByIndex[`${a},${b}`];
    const isConnectedAsTarget = (a, b) => linkedByIndex[`${b},${a}`];
    const isConnected = (a, b) =>
      isConnectedAsTarget(a, b) || isConnectedAsSource(a, b) || a === b;

    const nodeMouseOver = (d, links) => {
      tooltip
        .style("visibility", "visible")
        .html(createTooltipText(links, d));

      node.transition(500).style("opacity", (o) => {
        const isConnectedValue = isConnected(o.id, d.id);
        if (isConnectedValue) {
          return 1.0;
        }
        return 0.1;
      });

      link
        .transition(500)
        .style("stroke-opacity", (o) => {
          return o.source.id === d.id || o.target.id === d.id ? 1 : 0.1;
        })
        .transition(500)
        .attr("marker-end", (o) =>
          o.source.id === d.id || o.target.id === d.id
            ? "url(#arrowhead)"
            : "url()"
        );
    };

    const nodeMouseOut = (e, d) => {
      tooltip.style("visibility", "hidden");

      node.transition(500).style("opacity", 1);

      link.transition(500).style("stroke-opacity", (o) => {
        // console.log(o.value);
      });
    };

    const drag = () => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    const link = svg
      .append("g")
      .attr("stroke", "#D0D0D0")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .call(drag(simulation));

    //include circle backdrop to create border around images
    node
      .append("circle")
      .attr("fill", "black")
      //color & size of circle depends on what node represents (franchise? season? queen?)
      .attr("r", (d) =>
        d.id.includes("root") ? 24 :
          15
      )
      .attr("fill", (d) =>
        d.id.includes("root")
          ? "#99004D" :
          d.type == "name"
            ? "#004D99" :
            d.type == "basicInfo"
              ? "#009999" :
              d.type == "relation"
                ? "#999900" :
                d.type == "organization"
                  ? "#6B00D6" :
                  d.type == "time"
                    ? "#994D00" :
                    d.type == "createdWork"
                      ? "#000099" :
                      d.type == "uri"
                        ? "black"
                        :
                        "#009900"
      )
      .attr("stroke", "black");

    // add text to nodes representing seasons
    node
      .append("text")
      .text((d) => {
        if (d.type == "root") {
          return d.name;
        }
        else {
          return d.name ? (d.name.length > 3 ? "" : d.name) : "";
        }
      })
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "Chivo Mono")
      .attr("dominant-baseline", "central")
      .attr("fill", "white");

    //add images
    node
      .append("image")
      .attr("xlink:href", (d) => {
        return d.type == "img" ? d.imgUrl : "";
      })
      .attr("x", "-10px")
      // 拉成正方形
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("clip-path", "inset(0 0 0 0 round 50%)")
      .attr("y", "-10px")
      .attr("width", "20px")
      .attr("height", "20px")
      .on("mouseover", (e, d) => nodeMouseOver(d, data.links))
      // hovering out returns image to regular size
      .on("mouseout", nodeMouseOut)
      //from Raven
      .on("mousemove", (event, d) => {
        return tooltip
          .style("top", event.pageY + "px")
          .style("left", event.pageX + "px")
      }
      );

    const linkLabels = svg
      .selectAll(".link-label")
      .data(links)
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "Chivo Mono")
      .attr("fill", "black")
      .text((d) => d.label);



    const tick = () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      // Position the text elements
      linkLabels.attr("x", (d) => (d.source.x + d.target.x) / 2)
        .attr("y", (d) => (d.source.y + d.target.y) / 2);
    };

    simulation.on("tick", tick);

    return () => {
      simulation.stop();
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, [info]);

  return (
    <div id="actorBody">
      <svg ref={svgRef} id='actorSvg'></svg>
    </div>
  );
};

export default inject("actorStore")(observer(ActorModal));
