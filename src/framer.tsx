import React from "react";
import { addPropertyControls, ControlType } from "framer";
import Eye, { Props } from "./Eye.js";

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */

function FramerEye(props: Props) {
  return <Eye {...props} />;
}

addPropertyControls(FramerEye, {
  white: {
    type: ControlType.Object,
    controls: {
      x: { type: ControlType.Number, defaultValue: 150 },
      y: { type: ControlType.Number, defaultValue: 150 },
    },
  },
  iris: {
    type: ControlType.Object,
    controls: {
      x: { type: ControlType.Number, defaultValue: 100 },
      y: { type: ControlType.Number, defaultValue: 100 },
      color: { type: ControlType.Color, defaultValue: "#000" },
    },
  },
});

export default FramerEye;
