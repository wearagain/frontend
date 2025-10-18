import * as React from "react";
import type { SVGProps } from "react";
const SvgNIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 20"
    {...props}
  >
    <g clipPath="url(#NIcon_svg__a)">
      <path
        fill="#fff"
        d="M14.061 10.703 6.646 0H.5v20h6.439V9.295L14.354 20H20.5V0h-6.439z"
      />
    </g>
    <defs>
      <clipPath id="NIcon_svg__a">
        <path fill="#fff" d="M.5 0h20v20H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgNIcon;
