import React, { useRef, useEffect } from "react";
import Eye, { Controler } from "./Eye";

export default {
  title: "thisistest",
  parameters: {
    layout: "fullscreen",
  },
};

export const Primary = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "limegreen",
      }}
    >
      <Eye
        white={{
          x: 150,
          y: 150,
        }}
        iris={{
          x: 100,
          y: 100,
          color: "chocolate",
        }}
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          marginLeft: -250,
        }}
      />
      <Eye
        white={{
          x: 150,
          y: 150,
        }}
        iris={{
          x: 100,
          y: 100,
          color: "chocolate",
        }}
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          marginLeft: 250,
        }}
      />
    </div>
  );
};

export const DifferentRatio = () => {
  const eyeRef = useRef<Controler>();
  useEffect(() => {
    window.addEventListener("click", () =>
      eyeRef.current.watch({ x: 0, y: 0 })
    );
  }, []);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#DDD",
      }}
    >
      <Eye
        controlerRef={eyeRef}
        white={{
          x: 100,
          y: 200,
        }}
        iris={{
          x: 60,
          y: 80,
          color: "#000",
        }}
        style={{
          position: "absolute",
          top: 100,
          left: 100,
        }}
      />
      <Eye
        white={{
          x: 200,
          y: 100,
        }}
        iris={{
          x: 80,
          y: 60,
          color: "#000",
        }}
        style={{
          position: "absolute",
          top: 100,
          left: 300,
        }}
      />
      <Eye
        white={{
          x: 100,
          y: 100,
        }}
        iris={{
          x: 80,
          y: 80,
          color: "#000",
        }}
        style={{
          position: "absolute",
          top: 100,
          left: 550,
        }}
      />
      <Eye
        white={{
          x: 300,
          y: 200,
        }}
        iris={{
          x: 10,
          y: 80,
          color: "#000",
        }}
        style={{
          position: "absolute",
          top: 100,
          left: 800,
        }}
      />
      <Eye
        white={{
          x: 100,
          y: 100,
        }}
        iris={{
          x: 30,
          y: 80,
          color: "#000",
        }}
        style={{
          position: "absolute",
          top: 400,
          left: 800,
        }}
      />
    </div>
  );
};
