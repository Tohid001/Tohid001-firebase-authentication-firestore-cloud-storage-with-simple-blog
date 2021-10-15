import React from "react";
import { AuthProvider } from "../contexts/authContext";
import Signup from "./authentication/Signup";

function App() {
  return (
    <>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </>
  );
}

export default App;
