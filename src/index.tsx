import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { v4 as uuidV4 } from "uuid";

type Props = {
  width: number;
  height: number;
  irisWidth: number;
  irisHeight: number;
  className?: string;
  style?: React.CSSProperties;
  irisColor?: string;
  controlerRef?: React.MutableRefObject<Controler>;
};

export type Controler = {
  watch: (targetPosition: { x: number; y: number }) => void;
};
const Eye: React.FC<Props> = (props) => {
  const {
    width,
    height,
    irisWidth,
    irisHeight,
    irisColor,
    className,
    style,
    controlerRef,
  } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const irisControl = useAnimation();
  const eyeRef = useRef(null);
  const irisRef = useRef(null);
  const clipId = uuidV4();
  const timerRef = useRef(null);
  const focus = ({ targetPosition }) => {
    if (eyeRef.current && irisRef.current) {
      const currentRect = eyeRef.current.getBoundingClientRect();
      const currentIrisRect = irisRef.current.getBoundingClientRect();
      const distance = {
        x: targetPosition.x - (currentRect.left + width / 2 + window.scrollX),
        y: targetPosition.y - (currentRect.top + height / 2 + window.scrollY),
      };
      const insideRangeEllipse = {
        x: currentRect.width / 2 - currentIrisRect.width / 2,
        y: currentRect.height / 2 - currentIrisRect.height / 2,
      };
      const deg = Math.atan2(distance.y, distance.x);
      if (
        //inside of ellipse: ｘ^2／ａ^2＋ｙ^2／ｂ^2＝１
        distance.x ** 2 / insideRangeEllipse.x ** 2 +
          distance.y ** 2 / insideRangeEllipse.y ** 2 <=
        1
      ) {
        irisControl.start({
          cx: targetPosition.x - currentRect.x,
          cy: targetPosition.y - currentRect.y,
          transition: { duration: 0.05 },
        });
      } else {
        const degToCalc = deg;
        //x=1/√((1/a)^2+(tanθ/b)^2)
        const x =
          1 /
          Math.sqrt(
            (1 / insideRangeEllipse.x) ** 2 +
              (Math.tan(degToCalc) / insideRangeEllipse.y) ** 2
          );
        irisControl.start({
          cx: x * (distance.x < 0 ? -1 : 1) + currentRect.width / 2,
          cy:
            x * Math.tan(degToCalc) * (distance.x < 0 ? -1 : 1) +
            currentRect.height / 2,
          transition: { duration: 0.05 },
        });
      }
    }
  };
  useEffect(() => {
    if (controlerRef) {
      const watch = ({ x, y }: { x: number; y: number }) => {
        focus({ targetPosition: { x, y } });
      };
      controlerRef.current = { watch: watch };
    }
    const reactMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.pageX, y: e.pageY });
    };
    const reactMouseLeave = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        irisControl.start({
          cx: width / 2,
          cy: height / 2,
          transition: { bounce: 0.1, duration: 0.6 },
        });
      }, 1000);
    };
    window.addEventListener("mousemove", reactMouse);
    window.document.addEventListener("mouseleave", reactMouseLeave);
    return () => {
      window.removeEventListener("mousemove", reactMouse);
      window.document.removeEventListener("mouseleave", reactMouseLeave);
    };
  }, []);
  useEffect(() => {
    focus({
      targetPosition: mousePosition,
    });
  }, [mousePosition]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0, 0, ${width}, ${height}`}
      className={className}
      style={style}
    >
      <defs>
        <clipPath id={clipId}>
          <ellipse
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <ellipse
          ref={eyeRef}
          cx={width / 2}
          cy={height / 2}
          rx={width / 2}
          ry={height / 2}
          fill="#FFF"
        />
        <motion.ellipse
          ref={irisRef}
          cx={width / 2}
          cy={height / 2}
          rx={irisWidth / 2}
          ry={irisHeight / 2}
          fill={irisColor}
          animate={irisControl}
        />
      </g>
    </svg>
  );
};

//module.exports = Eye;
//module.exports.default = Eye;
export default Eye;
