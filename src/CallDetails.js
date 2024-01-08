import React, { useEffect, useState } from "react";
import { baseAPIURL } from "./constants";

const CallDetails = ({ id }) => {
  const [callDetails, setCallDetails] = useState(null);

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        const response = await fetch(`${baseAPIURL}activities/${id}`);
        const data = await response.json();
        setCallDetails(data);
      } catch (error) {
        console.error("Error fetching call details:", error);
      }
    };

    fetchCallDetails();
  }, [id]);

  if (!callDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Call Details</h2>
      <pre>{JSON.stringify(callDetails, null, 2)}</pre>
    </div>
  );
};

export default CallDetails;
