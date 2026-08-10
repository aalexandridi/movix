import * as React from "react";
const CheckIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    width={props.width || 32}
    height={props.height || 32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.7333 20.2L24.0333 8.9C24.3 8.63333 24.6111 8.5 24.9667 8.5C25.3222 8.5 25.6333 8.63333 25.9 8.9C26.1667 9.16667 26.3 9.48356 26.3 9.85067C26.3 10.2178 26.1667 10.5342 25.9 10.8L13.6667 23.0667C13.4 23.3333 13.0889 23.4667 12.7333 23.4667C12.3778 23.4667 12.0667 23.3333 11.8 23.0667L6.06667 17.3333C5.8 17.0667 5.672 16.7502 5.68267 16.384C5.69333 16.0178 5.83245 15.7009 6.1 15.4333C6.36756 15.1658 6.68445 15.0324 7.05067 15.0333C7.41689 15.0342 7.73333 15.1676 8 15.4333L12.7333 20.2Z"
      fill="white"
    />
  </svg>
);
export default CheckIcon;
