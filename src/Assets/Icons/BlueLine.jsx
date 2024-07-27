import React from "react";

export default function BlueLine() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="230"
      height="2"
      viewBox="0 0 373 2"
      fill="none"
    >
      <path
        d="M1 1H372"
        stroke="url(#paint0_linear_519_2543)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_519_2543"
          x1="1"
          y1="1.5"
          x2="372"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#82C3FF" />
          <stop offset="0.61" stop-color="#9ECDF9" stop-opacity="0.5" />
          <stop offset="1" stop-color="#5D7C99" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
