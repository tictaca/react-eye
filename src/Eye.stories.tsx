import React, {useRef, useEffect} from "react";
import Eye, { Controler } from "./";

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
        width={150}
        height={150}
        irisWidth={100}
        irisHeight={100}
        irisColor={"chocolate"}
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          marginLeft: -250
        }}
      />
      <Eye
        width={150}
        height={150}
        irisWidth={100}
        irisHeight={100}
        irisColor={"chocolate"}
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          marginLeft: 250
        }}
      />
    </div>
  );
};

export const DifferentRatio = () => {
  const eyeRef = useRef<Controler>();
  useEffect(() => {
    window.addEventListener("click", () => eyeRef.current.watch({x: 0, y: 0}));
  },[])
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
        width={100}
        height={200}
        irisWidth={60}
        irisHeight={80}
        irisColor={"#000"}
        style={{
          position: "absolute",
          top: 100,
          left: 100
        }}
      />
      <Eye
        width={200}
        height={100}
        irisWidth={80}
        irisHeight={60}
        irisColor={"#000"}
        style={{
          position: "absolute",
          top: 100,
          left: 300
        }}
      />
      <Eye
        width={100}
        height={100}
        irisWidth={80}
        irisHeight={80}
        irisColor={"#000"}
        style={{
          position: "absolute",
          top: 100,
          left: 550
        }}
      />
      <Eye
        width={300}
        height={200}
        irisWidth={10}
        irisHeight={80}
        irisColor={"#000"}
        style={{
          position: "absolute",
          top: 100,
          left: 800
        }}
      />
      <Eye
        width={100}
        height={100}
        irisWidth={30}
        irisHeight={80}
        irisColor={"#000"}
        style={{
          position: "absolute",
          top: 400,
          left: 800
        }}
      />
    </div>
  );
};
