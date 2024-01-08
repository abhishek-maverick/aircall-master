import { useEffect, useState } from "react";
import CallList from "./CallList";
import CallTypeSelector from "./CallTypeSelector";

const Body = () => {
  // const callTypes = ["Inbox", "Archived", "All Calls"];
  const [selectedCall, setSelectedCall] = useState("Inbox");

  return (
    <div>
      <div></div>
      {/* <CallTypeSelector
        selectedCallType={selectedCall}
        setSelectedCall={setSelectedCall}
      /> */}
      <CallList />
      {/* <div className="calls-container">
        {calls.map((eachCall) => (
          <div key={eachCall}>{eachCall}</div> //todo: add some color change to the selected call
        ))}
      </div> */}
      {/* {data.length && <CallList />} */}
      {/* {data.length &&
        data.map((eachCall, index) => {
          return (
            eachCall.from && (
              <div
                style={{
                  height: "50px",
                  overflowY: "scroll",
                  overflow: "auto",
                  border: "1px solid #ccc",
                  // display: "flex",
                  // flexDirection: "column",
                }}
                // key={eachCall?.id || index}
              >
                {eachCall.from}
              </div>
            )
          );
        })} */}
    </div>
  );
};

export default Body;
