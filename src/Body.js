import { useEffect, useState } from "react";
import CallList from "./CallList";

const Body = ({ selectedCallType }) => {
  return (
    <div>
      <CallList selectedCallType={selectedCallType} />
    </div>
  );
};

export default Body;
