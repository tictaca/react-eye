import React from "react";
import { ComponentMeta } from "@storybook/react";
import Eye from "./";

export default {
  title: "thisistest",
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Eye>;

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
