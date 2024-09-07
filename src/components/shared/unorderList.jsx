import React from "react";

const UnorderList = ({ list=[], textStyle = {} }) => {
  return (
    <ul style={{ listStyleType: "disc" ,paddingLeft:'24px'}}>
      {list.map(l => (
        <li key={l} style={textStyle}>
          {l}
        </li>
      ))}
    </ul>
  );
};

export default UnorderList;
