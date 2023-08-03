import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { inject, observer } from 'mobx-react';

// 用d3画一个节点图
const NameNode = ({ theatreStore }) => {
  // 转为list形式
  const { suits: observableSuits } = theatreStore;
  const suits = JSON.parse(JSON.stringify(observableSuits));

  const svgRef = useRef(null);
  const linkArc = (d) => {
    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * 2;
    return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
  };

  useEffect(() => {
    const width = 200;
    const height = 200;
    const types = Array.from(new Set(suits.map((d) => d.type)));
    const nodes = Array.from(
      new Set(suits.flatMap((l) => [l.source, l.target])),
      (id) => ({ id })
    );
    const links = suits.map((d) => Object.create(d));
    const color = d3.scaleOrdinal(types, d3.schemeCategory10);
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class", "name-node")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    const hoverText = svg.append("g").attr("class", "hover-text");

    const handleMouseEnter = (event, d) => {
      d3.select(event.target).style("cursor", "pointer");
      hoverText
        .append("text")
        .attr("class", "hover-label")
        .attr("x", d.target.x)
        .attr("y", d.target.y - 10)
        .text(`${d.time}`);
    };

    const handleMouseLeave = (event, d) => {
      hoverText.selectAll(".hover-label").remove();
      d3.select(event.target).style("cursor", "default");
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

    // Per-type markers, as they don't inherit styles.
    svg
      .append("defs")
      .selectAll("marker")
      .data(types)
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", color)
      .attr("d", "M0,-5L10,0L0,5");

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", (d) => color(d.type))
      .attr("marker-end", (d) => `url(#arrow-${d.type})`)
      .on("mouseenter", handleMouseEnter)
      .on("mouseleave", handleMouseLeave);

    const node = svg
      .append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation));

    node
      .append("circle")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr("r", 6);

    node
      .append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text((d) => d.id)
      .clone(true)
      .lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

    simulation.on("tick", () => {
      link.attr("d", linkArc);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
      d3.selectAll("svg.name-node").remove();
    };
  }, [suits]);

  return <div ref={svgRef}></div>;
};

export default inject('theatreStore')(observer(NameNode));
