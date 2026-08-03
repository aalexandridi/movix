import * as React from "react";
const PlusIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    width={props.width || 22}
    height={props.height || 22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.6667 1.33325V19.9999M1.33334 10.6666H20"
      stroke="white"
      strokeWidth={2.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default PlusIcon;
