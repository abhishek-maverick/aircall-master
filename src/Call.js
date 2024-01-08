import React, { useState } from "react";
import { FaPhone, FaPhoneAlt, FaArchive, FaUndo } from "react-icons/fa";

const Call = ({ callData, callCount, lastReceivedTime, selectedCallType }) => {
  const baseAPIURL = "https://cerulean-marlin-wig.cyclic.app/";
  const [showDetails, setShowDetails] = useState(false);
  const isIncomingCall = callData.direction === "inbound";
  const receivedTime = new Date(lastReceivedTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCallClick = () => {
    // Navigate to CallDetails component with the call ID
    // navigate(`/call/${callData.id}`);
  };

  const handleArchiveClick = async () => {
    try {
      const response = await fetch(`${baseAPIURL}/activities/${callData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_archived: !callData.is_archived,
        }),
      });

      if (response.ok) {
        console.log("query successful");
      } else {
        // Handle error response
        console.error("Failed to update archive status for the call.");
      }
    } catch (error) {
      console.error("Error during the archive/unarchive request:", error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        marginBottom: "10px",
        display: "flex",
      }}
    >
      <div
        onClick={handleCallClick}
        style={{ width: "5%", padding: "10px", cursor: "pointer" }}
      >
        {isIncomingCall ? <FaPhone /> : <FaPhoneAlt />}
      </div>
      <div style={{ width: "80%", padding: "10px" }}>
        <div>
          <strong>{callData.from}</strong>{" "}
          <div
            style={{
              display: "inline-block",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "5px",
              marginLeft: "5px",
            }}
          >
            {callCount}
          </div>
        </div>
        <div>tried calling on: {callData.to}</div>
      </div>
      <div style={{ width: "10%", padding: "10px", textAlign: "right" }}>
        {receivedTime}
      </div>
      <div
        style={{
          width: "5%",
          padding: "10px",
          textAlign: "right",
          cursor: "pointer",
        }}
        onClick={handleArchiveClick}
      >
        {callData.is_archived ? (
          <FaUndo title="Unarchive" />
        ) : (
          <FaArchive title="Archive" />
        )}
      </div>
    </div>
  );
};

export default Call;
