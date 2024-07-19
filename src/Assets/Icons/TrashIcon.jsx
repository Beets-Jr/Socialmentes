import React from "react";

function TrashIcon() {
  return (
    <svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <mask
        id="mask0_2612_7119"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="22"
        height="24"
      >
        <rect width="21.7" height="24" fill="url(#pattern0_2612_7119)" />
      </mask>
      <g mask="url(#mask0_2612_7119)">
        <rect width="22.2" height="24" fill="#FF0659" />
      </g>
      <defs>
        <pattern
          id="pattern0_2612_7119"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image0_2612_7119"
            transform="matrix(0.0021645 0 0 0.00195707 0 -0.00101012)"
          />
        </pattern>
        <image
          id="image0_2612_7119"
          width="462"
          height="512"
          xlink:href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export default TrashIcon;
