import React, { useState, useEffect } from "react";

const CallList = () => {
  const baseAPIURL = "https://cerulean-marlin-wig.cyclic.app/";
  const calls = ["Inbox", "Archived", "All Calls"];
  const [selectedCallType, setSelectedCallType] = useState("Inbox");
  const [listItems, setListItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true); // New state variable
  const itemHeight = 50; // Set the height of each list item

  useEffect(() => {
    // Simulate fetching all data once
    getCallLogs();
  }, []);

  const getCallLogs = async () => {
    console.log("inside getdata");
    const data = await fetch(baseAPIURL + "activities");
    const json = await data.json();
    console.log("received data is");
    console.log(json);
    setListItems(json);
    setTotalItems(json?.length || 10);
    setHasMoreItems(false); // Set to false when all data is loaded
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const contentHeight = container.scrollHeight;

    // Check if the user has reached the bottom of the container and there are more items to fetch
    if (scrollTop + containerHeight >= contentHeight - 10 && hasMoreItems) {
      // Simulate fetching more data
      const newData = Array.from({ length: 10 }, (_, index) => {
        const newItemIndex = listItems.length + index + 1;
        return `List Item ${newItemIndex}`;
      });

      setListItems((prevItems) => [...prevItems, ...newData]);
    }
  };

  return (
    <div
      style={{
        height: "555px", // Set the height of your container
        overflowY: "scroll",
        border: "1px solid #ccc",
      }}
      onScroll={handleScroll}
    >
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {listItems.map((item, index) => (
          <li key={index} style={{ height: `${itemHeight}px` }}>
            {item?.from || "unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CallList;
