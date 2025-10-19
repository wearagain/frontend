import * as React from "react";
import type { SVGProps } from "react";
const SvgVector = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 80 80"
    {...props}
  >
    <path
      fill="#F4F5F6"
      d="M80 40c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40"
    />
    <path
      fill="#939396"
      d="M56 31c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16M40 51c12.4 0 23.48 5.643 30.817 14.5C63.48 74.357 52.4 80 40 80S16.519 74.357 9.182 65.5C16.519 56.643 27.6 51 40 51"
    />
  </svg>
);
export default SvgVector;
