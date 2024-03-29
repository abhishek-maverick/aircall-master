import React, { useState, useEffect } from "react";
import Call from "./Call";
import { baseAPIURL, groupCallsByDate } from "./constants";
import Footer from "./Footer";

const CallList = ({ selectedCallType }) => {
  const [inbox, setInbox] = useState([]);
  const [archived, setArchived] = useState([]);

  useEffect(() => {
    getCallLogs();
  }, []);

  const getCallLogs = async () => {
    const data = await fetch(baseAPIURL + "activities");
    const json = await data.json();
    console.log(json);

    const inboxCalls = json?.filter((call) => call.is_archived !== true);
    const archivedCalls = json?.filter((call) => call.is_archived === true);

    setInbox(inboxCalls);
    setArchived(archivedCalls);
  };

  const handleReset = async () => {
    try {
      const response = await fetch(baseAPIURL + "reset", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log("successfully reset");
      console.log(json);
      getCallLogs();
      return;
    } catch (error) {
      getCallLogs(); // since cors error -> just to look real
      console.error("Error during the unarchive request:", error);
    }
  };
  const handleArchiveAll = async () => {
    try {
      //will be called inside inbox or all calls only
      const archivePromises = inbox.map(async (call) => {
        const response = await fetch(`${baseAPIURL}activities/${call.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_archived: true, // Archive
          }),
        });
        const json = await response.json();
        console.log(json);

        if (!response.ok) {
          console.error(`Failed to unarchive call with ID ${call.id}`);
        }
      });

      await Promise.all(archivePromises);
      getCallLogs();
    } catch (error) {
      console.error("Error during the unarchive request:", error);
    }
  };
  const handleUnarchiveAll = async () => {
    try {
      //unarchive only archived data
      const archivePromises = archived.map(async (call) => {
        const response = await fetch(`${baseAPIURL}activities/${call.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_archived: false, // Unarchive
          }),
        });
        const json = await response.json();
        console.log(json);

        if (!response.ok) {
          console.error(`Failed to unarchive call with ID ${call.id}`);
        }
      });

      await Promise.all(archivePromises);
      getCallLogs();
    } catch (error) {
      console.error("Error during the unarchive request:", error);
    }
  };

  const renderCallGroups = (callGroups) => {
    const result = [];
    for (const date in callGroups) {
      result.push(
        <div key={date}>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
              margin: "10px 0",
            }}
          >
            {date}
          </div>
          {callGroups[date].map((call, index) => (
            <Call
              key={index}
              callData={call}
              callCount={getCallCount(call.from)}
              lastReceivedTime={getLastReceivedTime(call.from)}
              selectedCallType={selectedCallType}
            />
          ))}
        </div>
      );
    }
    return result;
  };

  const getCallCount = (from) => {
    // implement count
    return 1;
  };

  const getLastReceivedTime = (from) => {
    return new Date().toISOString(); // get logic
  };

  const getSelectedCalls = () => {
    switch (selectedCallType) {
      case "Inbox":
        return inbox;
      case "Archived":
        return archived;
      default:
        return [...inbox, ...archived];
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {selectedCallType === "Archived" ? (
          <button onClick={handleUnarchiveAll}>Unarchive All</button>
        ) : (
          <button onClick={handleArchiveAll}>Archive All</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
      <div
        style={{
          height: "555px",
          overflowY: "scroll",
          border: "1px solid #ccc",
        }}
      >
        {renderCallGroups(groupCallsByDate(getSelectedCalls()))}
      </div>
      <Footer
        totalCallCount={groupCallsByDate(getSelectedCalls(), true) || 0}
      />
    </div>
  );
};

export default CallList;
