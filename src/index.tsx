import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

type Props = {
  width: number;
  height: number;
  irisWidth: number;
  irisHeight: number;
  className?: string;
  style?: React.CSSProperties;
  irisColor?: string;
};

const Eye: React.FC<Props> = (props) => {
  const { width, height, irisWidth, irisHeight, irisColor, className, style } =
    props;
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [irisPosition, setIrisPosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef(null);
  const irisRef = useRef(null);
  const clipId = uuidV4();
  useEffect(() => {
    const reactMouse = (e) => {
      setTargetPosition({ x: e.pageX, y: e.pageY });
    };
    window.addEventListener("mousemove", reactMouse);
    return () => window.removeEventListener("mousemove", reactMouse);
  }, []);
  useEffect(() => {
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
        setIrisPosition({
          x: targetPosition.x - currentRect.x,
          y: targetPosition.y - currentRect.y,
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
        setIrisPosition({
          x: x * (distance.x < 0 ? -1 : 1) + currentRect.width / 2,
          y:
            x * Math.tan(degToCalc) * (distance.x < 0 ? -1 : 1) +
            currentRect.height / 2,
        });
      }
    }
  }, [targetPosition]);
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
      <ellipse
        ref={irisRef}
        cx={irisPosition.x}
        cy={irisPosition.y}
        rx={irisWidth / 2}
        ry={irisHeight / 2}
        fill={irisColor}
      />
      </g>
    </svg>
  );
};

//module.exports = Eye;
//module.exports.default = Eye;
export default Eye;
