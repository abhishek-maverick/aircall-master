import React, { useState } from "react";
import ReactDOM from "react-dom";
import Body from "./Body.js";
import CallTypeSelector from "./CallTypeSelector.js";
import Footer from "./Footer.js";
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
      <Body />
      <Footer />
      {/* //todo: body component */}

      {/* <div className="container-view">Some activities should be here</div> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
