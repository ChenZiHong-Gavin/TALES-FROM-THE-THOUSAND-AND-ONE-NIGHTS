import Styles from "./Chat.module.scss";
import { useEffect, useRef, useState } from "react";
import { getActorsWithAvatar } from "../../../../api/actor";
import { inject, observer } from "mobx-react";
import { setChatTemplate } from "./util";

const Chat = ({actorStore}) => {
  const {toggleModal} = actorStore;
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
        let maxCount = Math.ceil((window.innerHeight / 1080) * 12);
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
        this.anim = setTimeout(() => this.loop(), Math.random() * 5200 + 180);
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
        this.pickHasRichBody();
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
        this.hasImg = Math.random() > 0.9;
      }

      pickHasRichBody() {
        this.hasRichBody = !this.hasImage && Math.random() > 0.85;
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
        // ele.name.style.width = this.name * (textWidth / 2) + "px";
        // text
        ele.text.innerText = this.actor.text;
        // ele.texts.forEach((n, i, arr) => {
        //   let w = textWidth;
        //   if (i === arr.length - 1) {
        //     w = Math.max(0.2, this.textCount - i) * textWidth;
        //   }
        //   n.style.width = w + "px";
        // });
        // 增加点击事件
        ele.line.addEventListener("click", () => {
          toggleModal(true);
        });
      }

      animateIn() {
        let delay = 35; // Some times it won't animate correctly without this
        let ele = this.ele;
        setTimeout(() => {
          ele.lineContainer.style.opacity = 1;
          ele.lineContainer.style.maxHeight = "200px";
          ele.lineContainer.style.transform = "translateX(0px) scale(1)";
        }, delay);

        let otherEleList = [ele.profileImg, ele.name, ele.text];

        if ("img" in ele) {
          otherEleList.push(ele.img);
        } else if ("richBody" in ele) {
          otherEleList.push(ele.richBody);
        }

        delay += 40;

        otherEleList.forEach((e, i) => {
          setTimeout(() => {
            e.style.opacity = 1;
            e.style.transform = "translateY(0px)";
          }, (delay += 50));
        });

        // ele.texts.forEach((n, i, arr) =>
        //   setTimeout(() => (n.style.opacity = 1), 70 * (i + 3) + delay)
        // );
      }

      createElement() {
        let lineContainer = createElement({ class: Styles.lineContainer });
        let line = createElement({ class: Styles.line });
        let profileImg = createElement({ class: Styles.profileImg });
        let body = createElement({ class: Styles.body });
        let name = createElement({ class: Styles.name });
        let text = createElement({ class: Styles.text });
        let img = createElement({ class: Styles.img });
        let richBody = createElement({ class: Styles.richBody });
        body.appendChild(name);
        body.appendChild(text);
        line.appendChild(profileImg);
        line.appendChild(body);
        lineContainer.appendChild(line);
        let out = { lineContainer, line, profileImg, body, name, text };
        this.hasImg && (out.img = img) && body.appendChild(img);
        this.hasRichBody &&
          (out.richBody = richBody) &&
          body.appendChild(richBody);
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
