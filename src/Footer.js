import React from "react";
import { FaPhone, FaAddressBook, FaKeyboard, FaCog } from "react-icons/fa";

const Footer = ({ totalCallCount }) => {
  const iconStyle = {
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
  };

  const badgeStyle = {
    marginLeft: "5px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div style={iconStyle}>
        <FaPhone />
        <div style={badgeStyle}>{totalCallCount}</div>
      </div>
      <FaAddressBook style={iconStyle} />
      <FaKeyboard style={iconStyle} />
      <FaCog style={iconStyle} />
    </div>
  );
};

export default Footer;
