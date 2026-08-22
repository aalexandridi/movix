import * as React from "react";
const SearchIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    width={props.width || 32}
    height={props.height || 32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    {...props}
  >
    <path
      d="M28 28L22.2093 22.2094M22.2093 22.2094C23.1999 21.2188 23.9856 20.0429 24.5216 18.7488C25.0577 17.4546 25.3336 16.0675 25.3336 14.6667C25.3336 13.2659 25.0577 11.8788 24.5216 10.5846C23.9856 9.29046 23.1999 8.11455 22.2093 7.12403C21.2188 6.13351 20.0429 5.34779 18.7487 4.81173C17.4546 4.27566 16.0675 3.99976 14.6667 3.99976C13.2659 3.99976 11.8788 4.27566 10.5846 4.81173C9.29043 5.34779 8.11452 6.13351 7.124 7.12403C5.12356 9.12447 3.99973 11.8376 3.99973 14.6667C3.99973 17.4957 5.12356 20.2089 7.124 22.2094C9.12444 24.2098 11.8376 25.3336 14.6667 25.3336C17.4957 25.3336 20.2089 24.2098 22.2093 22.2094Z"
      stroke="currentColor"
      strokeWidth="var(--search-stroke-width, 1.7)"
      // strokeWidth={props.strokeWidth || 1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SearchIcon;
