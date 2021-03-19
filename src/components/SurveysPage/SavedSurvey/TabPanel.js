import React from "react";

function TabPanel({ children, value, index }) {
  return <>{value === index ? <>{children}</> : null}</>;
}

export default TabPanel;
