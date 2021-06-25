import React from "react";
import {
    
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";


const Dropdown = (props) => {
  return (
    <CDropdown>
      <CDropdownToggle color="primary">
      <CIcon name={props.icon} className="mfe-2" />{props.label}</CDropdownToggle>
      <CDropdownMenu>
        {props.items.map((item) => {
          return <CDropdownItem href={item.path} onClick={() => props.filter(item.val)}>{item.label}</CDropdownItem>;
        })}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default Dropdown;
