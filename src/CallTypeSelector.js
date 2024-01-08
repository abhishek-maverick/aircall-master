const CallTypeSelector = ({ selectedCallType, setSelectedCall }) => {
  const callTypes = ["Inbox", "Archived", "All Calls"];

  return (
    <div
      style={{
        width: "70%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "2px",
      }}
    >
      {callTypes.map((callType) => (
        <div
          key={callType}
          style={{
            padding: "10px",
            cursor: "pointer",
            borderBottom:
              selectedCallType === callType ? "2px solid blue" : "none",
          }}
          onClick={() => setSelectedCall(callType)}
        >
          {callType}
        </div>
      ))}
    </div>
  );
};

export default CallTypeSelector;
