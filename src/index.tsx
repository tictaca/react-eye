import React, { useEffect, useState, useRef } from "react";

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
  const { width, height, irisWidth, irisHeight, irisColor, className, style } = props;
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [irisPosition, setIrisPosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef(null);
  const irisRef = useRef(null);
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
      const distanceX =
        targetPosition.x - (currentRect.left + width / 2 + window.scrollX);
      const distanceY =
        targetPosition.y - (currentRect.top + height / 2 + window.scrollY);
      const r = currentRect.width / 2 - currentIrisRect.width / 2;
      const deg = Math.atan(distanceY / distanceX);
      if (distanceX * distanceX + distanceY * distanceY < r * r) {
        setIrisPosition({
          x: targetPosition.x - currentRect.x,
          y: targetPosition.y - currentRect.y,
        });
      } else if (distanceX >= 0) {
        setIrisPosition({
          x: Math.cos(deg) * r + currentRect.width / 2,
          y: Math.sin(deg) * r + currentRect.height / 2,
        });
      } else {
        setIrisPosition({
          x: Math.cos(deg + (180 * Math.PI) / 180) * r + currentRect.width / 2,
          y: Math.sin(deg + (180 * Math.PI) / 180) * r + currentRect.height / 2,
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
      <circle
        ref={eyeRef}
        cx={width / 2}
        cy={height / 2}
        r={width / 2}
        fill="#FFF"
      />
      <circle
        ref={irisRef}
        cx={irisPosition.x}
        cy={irisPosition.y}
        r={irisWidth / 2}
        fill={irisColor}
      />
    </svg>
  );
};

//module.exports = Eye;
//module.exports.default = Eye;
export default Eye;
