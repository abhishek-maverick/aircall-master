import React, { useState } from "react";
import ReactDOM from "react-dom";
import Body from "./Body.js";
import CallTypeSelector from "./CallTypeSelector.js";
import Header from "./Header.jsx";

const App = () => {
  const [selectedCall, setSelectedCall] = useState("Inbox");
  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <Header />
        <CallTypeSelector
          selectedCallType={selectedCall}
          setSelectedCall={setSelectedCall}
        />
      </div>
      <Body selectedCallType={selectedCall} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
