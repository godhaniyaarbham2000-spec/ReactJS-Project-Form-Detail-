import React from "react";
import RegisterForm from "./components/RegisterForm";

export default function App() {
  return (
    <div className="app">
      <div className="card">
        <h1 className="heading">Official Registration</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
