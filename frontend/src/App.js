import logo from "./logo.svg";
import "./styles/App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:8080");

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Gọi API từ backend
    fetch("http://localhost:8080/UM/hello")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Frontend - Backend Connection</h1>
      <p>{message}</p>
      <button>
        <Link to="/um_o_eregister">Go to UM_O_ERegister</Link>
      </button>
    </div>
  );
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
}

export default App;
