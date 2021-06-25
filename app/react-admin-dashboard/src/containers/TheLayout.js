import React from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  return (
    <div>
      {/* <TheSidebar/> */}
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        {/* <TheFooter/> */}
      </div>
      <svg className="curved-svg" viewBox="0 0 1440 400">
        <path
          d="M 0,400 C 0,400 0,200 0,200 C 149.59999999999997,246.66666666666666 299.19999999999993,293.3333333333333 451,269 C 602.8000000000001,244.66666666666669 756.8000000000002,149.33333333333334 922,126 C 1087.1999999999998,102.66666666666666 1263.6,151.33333333333331 1440,200 C 1440,200 1440,400 1440,400 Z"
          fill="#FFF7F8"
          fill-opacity="1"
        ></path>
      </svg>

      {/* <svg viewBox="0 0 1440 319" className="curved-svg">
        <path
          fill="#FFF7F8"
          fill-opacity="1"
          d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg> */}
    </div>
  );
};

export default TheLayout;
