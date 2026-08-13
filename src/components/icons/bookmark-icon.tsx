import * as React from "react";
const BookmarkIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    width={props.width || 16}
    height={props.height || 21}
    viewBox="0 0 16 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 20.6667V0H16V20.6667L8 17.2227L0 20.6667ZM1.33333 18.6L8 15.7333L14.6667 18.6V1.33333H1.33333V18.6Z"
      fill="currentColor"
    />
  </svg>
);
export default BookmarkIcon;
