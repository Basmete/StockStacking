import React from "react";
import { Cell } from "rsuite-table";

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: "#f5f5f5",
        borderRadius: 20,
        marginTop: 2,
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <img src={rowData[dataKey]} width="44" alt="cellimg" />
    </div>
  </Cell>
);

export default ImageCell;
