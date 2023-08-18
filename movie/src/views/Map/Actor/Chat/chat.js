import Styles from "./Chat.module.scss";
import { useEffect, useRef, useState } from "react";
import { getActorsWithAvatar } from "../../../../api/actor";
import { inject, observer } from "mobx-react";
import { setChatTemplate } from "./util";
import MovieCard from "./Card";
import React from "react";
import { createRoot } from "react-dom/client";

const Chat = ({ actorStore }) => {
  const { toggleModal } = actorStore;
  const chatContainerRef = useRef(null);
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getActorsWithAvatar().then((res) => {
      if (res.status === 200) {
        const data = res.data.data;
        const actorInfoList = [];
        data.forEach((n) => {
          const tempActorInfoList = setChatTemplate(n);
          for (let i = 0; i < tempActorInfoList.length; i++) {
            actorInfoList.push(tempActorInfoList[i]);
          }
        });
        setChatData(actorInfoList);
      }
    });
  }, []);

  useEffect(() => {
    if (!chatData.length) return;
    let container = chatContainerRef.current;
    let chats = [];

    function createElement(opts = {}) {
      let ele = document.createElement("div");
      if ("class" in opts) {
        if (!Array.isArray(opts.class)) {
          opts.class = [opts.class];
        }
        ele.classList.add(...opts.class);
      }
      // 如果是text，则在div中创建p标签
      if ("text" in opts) {
        let p = document.createElement("p");
        p.innerText = opts.text;
        ele.appendChild(p);
      }
      if ("card" in opts) {
        const movieCardElement = React.createElement(MovieCard, opts.card);

        // 使用 createRoot 渲染 React 元素
        const movieCardRoot = createRoot(ele);
        movieCardRoot.render(movieCardElement);
      }
      return ele;
    }

    function addChat() {
      let chat = new Chat();
      chats.push(chat);
      setTimeout(() => chat.loop(), 2000);
    }

    class Chat {
      constructor() {
        this.ele = createElement({ class: Styles.chat });
        this.lines = [];
        this.anim = null;
        container.appendChild(this.ele);
      }
      addLine() {
        let l = new Line();
        this.lines.push(l);
        this.ele.appendChild(l.ele.lineContainer);
        return l;
      }
      removeOldest() {
        let maxCount = Math.ceil((window.innerHeight / 1080) * 9);
        if (this.lines.length > maxCount) {
          let oldest = this.lines.splice(0, this.lines.length - maxCount);
          oldest.forEach((n) => this.ele.removeChild(n.ele.lineContainer));

        }
      }
      loop() {
        if (this.anim) {
          this.stopLoop();
        }
        this.addLine();
        this.removeOldest();
        // 如果是视频或者音频，循环的时候稍微慢一点
        if (this.lines[this.lines.length - 1].hasCard) {
          this.anim = setTimeout(
            () => this.loop(),
            Math.random() * 10000 + 400
          );
        } else {
          this.anim = setTimeout(
            () => this.loop(),
            Math.random() * 6000 + 180
          );
        }
      }
      stopLoop() {
        clearTimeout(this.anim);
        this.anim = null;
      }
    }

    class Line {
      constructor() {
        this.pickActor();
        this.pickHasImg();
        this.pickHasCard();
        this.setupElements();
        this.animateIn();
      }

      pickActor() {
        let actor = chatData[Math.floor(Math.random() * chatData.length)];
        this.actor = actor;
        this.avatarUrl = actor.avatarUrl;
        this.name = actor.name;
        return actor;
      }

      pickHasImg() {
        this.hasImg = this.actor.hasImage;
      }

      pickHasCard() {
        this.hasCard = this.actor.hasCard;
      }

      setupElements() {
        let ele = this.createElement();
        this.ele = ele;
        // profile image
        ele.profileImg.style.background = `url(${this.avatarUrl})`;
        ele.profileImg.style.backgroundSize = "cover";
        ele.profileImg.style.backgroundPosition = "center";
        // name
        ele.name.innerText = this.name;
        // img
        if (this.hasImg) {
          ele.img.style.background = `url(${this.actor.imagePath})`;
          ele.img.style.backgroundSize = "cover";
          ele.img.style.backgroundPosition = "center";
        }
        ele.profileImg.addEventListener("click", () => {
          console.log(this.actor);
          toggleModal(true);
        });
      }

      animateIn() {
        let delay = 35; // Some times it won't animate correctly without this
        let ele = this.ele;
        setTimeout(() => {
          ele.lineContainer.style.opacity = 1;
          ele.lineContainer.style.maxHeight = "500px";
          ele.lineContainer.style.transform = "translateX(0px) scale(1)";
        }, delay);

        let otherEleList = [ele.profileImg, ele.name, ele.text];

        if ("img" in ele) {
          otherEleList.push(ele.img);
        }

        delay += 40;

        otherEleList.forEach((e, i) => {
          setTimeout(() => {
            e.style.opacity = 1;
            e.style.transform = "translateY(0px)";
          }, (delay += 50));
        });
      }

      createElement() {
        let lineContainer = createElement({ class: Styles.lineContainer });
        let line = createElement({ class: Styles.line });
        let profileImg = createElement({ class: Styles.profileImg });
        let body = createElement({ class: Styles.body });
        let name = createElement({ class: Styles.name });
        let text = createElement({ class: Styles.text, text: this.actor.text });
        let img = createElement({ class: Styles.img });
        let card = createElement({ class: Styles.card, card: this.actor });
        body.appendChild(name);
        body.appendChild(text);
        line.appendChild(profileImg);
        line.appendChild(body);
        lineContainer.appendChild(line);
        let out = { lineContainer, line, profileImg, body, name, text, card };
        this.hasImg && (out.img = img) && body.appendChild(img);
        this.hasCard && (out.card = card) && body.appendChild(card);
        return out;
      }
    }

    function loop() {
      chats.forEach((n) => n.loop());
    }

    function stopLoop() {
      chats.forEach((n) => n.stopLoop());
    }

    addChat();
  }, [chatData]);
  return <div className={Styles.chatContainer} ref={chatContainerRef}></div>;
};

export default inject("actorStore")(observer(Chat));
