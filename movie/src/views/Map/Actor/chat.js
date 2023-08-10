import Styles from "./Chat.module.scss";
import { useEffect, useRef } from "react";

const Chat = () => {
  const chatContainerRef = useRef(null);
  const chatData = [
  {
    name: "Alice",
    text: "Hello there!",
    hasImg: false,
    hasRichBody: false,
  },
  {
    name: "Bob",
    text: "Hey! How's it going?",
    hasImg: false,
    hasRichBody: false,
  }
];
  useEffect(() => {
    let amountOfColors = 18; 
    let container = chatContainerRef.current;
    let lineWidth = 300;
    let profileImgWidth = 40;
    let textWidth = lineWidth - 20 - profileImgWidth - 10;
    let chats = [];
    let maxTexts = 3;
    if (window.innerWidth < 768) {
      lineWidth = 250;
      profileImgWidth = 10;
      textWidth = lineWidth - 20 - profileImgWidth - 10;
      maxTexts = 2;
    }

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
        this.anim = setTimeout(() => this.loop(), Math.random() * 1300 + 180);
      }
      stopLoop() {
        clearTimeout(this.anim);
        this.anim = null;
      }
    }

    class Line {
      constructor() {
        this.pickColor();
        this.pickName();
        this.pickText();
        this.pickHasImg();
        this.pickHasRichBody();
        this.setupElements();
        this.animateIn();
      }

      pickColor() {
        this.hue =
          Math.floor(Math.random() * amountOfColors) * (360 / amountOfColors);
        this.color = `hsl(${this.hue}, 90%, 50%)`;
        this.profileImgColor = `hsl(${this.hue}, 40%, 55%)`;
        return this.hue;
      }

      pickName() {
        this.name = Math.max(0.3, Math.random());
      }

      pickText() {
        let lengthChoice = Math.random();
        let lengthWeight = 1;
        if (lengthChoice < 0.5) {
          lengthWeight = 0.6;
        } else if (lengthChoice < 0.9) {
          lengthWeight = 0.8;
        }
        this.length = Math.max(0.02, lengthChoice * lengthWeight);
        this.textCount = this.length * maxTexts;
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
        ele.name.style.width = this.name * (textWidth / 2) + "px";
        ele.texts.forEach((n, i, arr) => {
          let w = textWidth;
          if (i === arr.length - 1) {
            w = Math.max(0.2, this.textCount - i) * textWidth;
          }
          n.style.width = w + "px";
        });
        ele.name.style.backgroundColor = this.color;
        ele.profileImg.style.backgroundColor = this.profileImgColor;
      }

      animateIn() {
        let delay = 35; // Some times it won't animate correctly without this
        let ele = this.ele;
        setTimeout(() => {
          ele.lineContainer.style.opacity = 1;
          ele.lineContainer.style.maxHeight = "200px";
          ele.lineContainer.style.transform = "translateX(0px) scale(1)";
        }, delay);

        let otherEleList = [ele.profileImg, ele.name, ...ele.texts];

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

        ele.texts.forEach((n, i, arr) =>
          setTimeout(() => (n.style.opacity = 1), 70 * (i + 3) + delay)
        );
      }

      createElement() {
        let lineContainer = createElement({ class: Styles.lineContainer });
        let line = createElement({ class: Styles.line });
        let profileImg = createElement({ class: Styles.profileImg });
        let body = createElement({ class: Styles.body });
        let name = createElement({ class: Styles.name });
        let texts = [];
        let img = createElement({ class: Styles.img });
        let richBody = createElement({ class: Styles.richBody });
        body.appendChild(name);
        for (let i = 0; i < (this.textCount || 1); i++) {
          let text = createElement({ class: Styles.text });
          texts.push(text);
          body.appendChild(text);
        }
        line.appendChild(profileImg);
        line.appendChild(body);
        lineContainer.appendChild(line);
        let out = { lineContainer, line, profileImg, body, name, texts };
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
  }, []);
  return (
    <div className={Styles.chatContainer} ref={chatContainerRef}>
      <div className={Styles.chatInput} id="chat-input">
        <div className={Styles.fileInput} id="file-input"></div>
      </div>
    </div>
  );
};

export default Chat;
