import React from "react";

export default function CenteredContainer({ children }) {
  return (
    <div
      style={{
        border: "1px solid red",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "650px" }}>{children}</div>
    </div>
  );
}
