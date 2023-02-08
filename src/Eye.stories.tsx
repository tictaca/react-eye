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
