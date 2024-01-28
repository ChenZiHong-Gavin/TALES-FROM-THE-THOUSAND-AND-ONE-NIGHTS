import Styles from "./Selection.module.scss";
import Script from "react-load-script";
import { useEffect, useRef, useState } from "react";
import { colorArray, captionArray, invitationInfo } from "./config";
import { Fade, Bounce } from "react-awesome-reveal";
import { FloatingMap, Emotion, Actors, Photo } from "./components";
import ReturnButton from "../../components/ReturnButton";
import { useNavigate } from "react-router-dom";

const Selction = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const dotsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const date = new Date();
  const dateStr = `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日`;
  const [invitation, setInvitation] = useState(invitationInfo[0]);
  const [activeSlide, setActiveSlide] = useState(0);

  const changeMode = (activeSlide) => {
    setActiveSlide(activeSlide);
    setInvitation(invitationInfo[activeSlide]);
  };

  useEffect(() => {
    if (loading | !containerRef.current) {
      return;
    }
    const gsap = window.gsap;
    const slides = sectionRefs.current;
    const container = containerRef.current;
    let dots = dotsRef.current;
    let oldSlide = 0;
    let activeSlide = 0;
    let dur = 0.6;
    let offsets = [];
    let ih = window.innerHeight;

    if (dots.innerHTML !== "") {
      dots.innerHTML = "";
    }

    for (let i = 0; i < slides.length; i++) {
      gsap.set(slides[i], { backgroundColor: colorArray[i] });
      let newDot = document.createElement("div");
      newDot.className = `${Styles.dot} dot`;
      newDot.index = i;
      newDot.addEventListener("click", slideAnim);
      dots.appendChild(newDot);
      offsets.push(-slides[i].offsetTop);
    }

    gsap.set(".dots", { yPercent: -50 });

    const dotAnim = gsap.timeline({ paused: true });
    dotAnim.to(
      ".dot",
      {
        stagger: { each: 1, yoyo: true, repeat: 1 },
        scale: 2.1,
        rotation: 0.1,
        ease: "none",
      },
      0.5
    );
    dotAnim.time(1);

    function slideAnim(e) {
      oldSlide = activeSlide;
      if (this.className === `${Styles.dot} dot`) {
        activeSlide = this.index;
      } else {
        activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
      }
      // make sure we're not past the end or beginning slide
      activeSlide = activeSlide < 0 ? 0 : activeSlide;
      activeSlide =
        activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
      if (oldSlide === activeSlide) {
        return;
      }
      changeMode(activeSlide);
      gsap.to(container, dur, {
        y: offsets[activeSlide],
        ease: "power2.inOut",
        onUpdate: tweenDot,
      });
    }

    window.addEventListener("wheel", slideAnim);
    window.addEventListener("resize", newSize);

    newSize();

    // resize all panels and refigure draggable snap array
    function newSize() {
      offsets = [];
      ih = window.innerHeight;
      gsap.set("#panelWrap", { height: slides.length * ih });
      gsap.set(slides, { height: ih });
      for (let i = 0; i < slides.length; i++) {
        offsets.push(-slides[i].offsetTop);
      }
      gsap.set(container, { y: offsets[activeSlide] });
    }

    // tween the dot animation as the draggable moves
    function tweenDot() {
      gsap.set(dotAnim, {
        time: Math.abs(gsap.getProperty(container, "y") / ih) + 1,
      });
    }

    return () => {
      window.removeEventListener("wheel", slideAnim);
      window.removeEventListener("resize", newSize);
    };
  }, [loading]);

  return (
    <>
      <ReturnButton />
      <div className={Styles.masterWrap}>
        <div className={Styles.panelWrap} ref={containerRef}>
          {captionArray.map((item, index) => {
            return (
              <section
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
              >
                <div className={Styles.caption}>
                  <div className={Styles.title}>{item.title}</div>
                  <div className={Styles.subtitle}>{item.subtitle}</div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <div className={`${Styles.dots} dots`} ref={dotsRef}></div>
      <div className={Styles.Selection}>
        <div className={Styles.map}>
          {
            activeSlide === 0 ? <FloatingMap /> :
            activeSlide === 1 ? <Emotion /> :
            activeSlide === 2 ? <Actors /> : 
            activeSlide === 3 ? <Photo /> : null
            // activeSlide === 4 ? <Search /> : null
          }
        </div>
        <div className={Styles.ticket}
        onClick = {() => {
          if (activeSlide === 0)
          {
            navigate("/map/theatre");
          }
          else if (activeSlide === 1)
          {
            navigate("/map/emotion");
          }
          else if (activeSlide === 2)
          {
            navigate("/map/actor");
          }
          else if (activeSlide === 3)
          {
            navigate("/map/photo");
          }
        }}
        >
          <div
            className={Styles.stub}
            style={{
              background: invitation.color.stub.background,
              color: invitation.color.stub.color,
            }}
          >
            <div className={Styles.top}>
              <span className={Styles.admit}>邀请函</span>
              <span className={Styles.line}></span>
              <span className={Styles.num}>敬启者</span>
            </div>
            <div className={Styles.number}>
              <Fade spy={invitation.number_cn}>{invitation.number_cn}</Fade>
            </div>
          </div>
          <div className={Styles.check}>
            <div className={Styles.big}>
              <span className={Styles.textEn}>{invitation.name_en}</span>
              <br />
              <span className={Styles.textCn}>
                <Bounce spy={invitation.name_cn}>{invitation.name_cn}</Bounce>
              </span>
            </div>
            <div className={Styles.number}>{invitation.number}</div>
            <div className={Styles.info}>
              <section>
                <div className={Styles.title}>
                  <strong>日期</strong>
                </div>
                <div>{dateStr}</div>
              </section>
              <section>
                <div className={Styles.title}>
                  <strong>主办方</strong>
                </div>
                <div>一千零一夜电影社</div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Script
        url={process.env.PUBLIC_URL + "/gsap.min.js"}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};

export default Selction;
