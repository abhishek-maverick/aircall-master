import React, { useState, useEffect } from "react";
import Call from "./Call";

const CallList = ({ selectedCallType }) => {
  const baseAPIURL = "https://cerulean-marlin-wig.cyclic.app/";
  const [inbox, setInbox] = useState([]);
  const [archived, setArchived] = useState([]);

  useEffect(() => {
    getCallLogs();
  }, []);

  const getCallLogs = async () => {
    const data = await fetch(baseAPIURL + "activities");
    const json = await data.json();

    const inboxCalls = json?.filter((call) => call.is_archived !== true);
    const archivedCalls = json?.filter((call) => call.is_archived === true);

    setInbox(inboxCalls);
    setArchived(archivedCalls);
  };

  const handleReset = async () => {
    try {
      const archivePromises = archived.map(async (call) => {
        const response = await fetch(`${baseAPIURL}/reset`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   is_archived: false, // Unarchive
          // }),
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
  const handleArchiveAll = async () => {
    try {
      const archivePromises = archived.map(async (call) => {
        const response = await fetch(`${baseAPIURL}/reset`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   is_archived: false, // Unarchive
          // }),
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
      const archivePromises = archived.map(async (call) => {
        const response = await fetch(`${baseAPIURL}/reset`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   is_archived: false, // Unarchive
          // }),
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

  const groupCallsByDate = (calls) => {
    const sortedCalls = calls.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const groupedCalls = {};
    sortedCalls.forEach((call) => {
      if (call.from && call.to) {
        const options = { month: "long", day: "numeric", year: "numeric" };
        const callDate = new Date(call.created_at).toLocaleString(
          "en-US",
          options
        );
        if (!groupedCalls[callDate]) {
          groupedCalls[callDate] = [];
        }
        groupedCalls[callDate].push(call);
      }
    });
    return groupedCalls;
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
        {selectedCallType === "Archived" && (
          <button onClick={handleUnarchiveAll}>Unarchive All</button>
        )}
        {selectedCallType === "Inbox" && (
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
    </div>
  );
};

export default CallList;
