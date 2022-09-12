import React from "react";
import ReactDOM from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//comment
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // containerStyle: {
  //   backgroundColor: "pink",
  // },
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div
    style={{
      // width: "30%",
      // height: "50px",
      marginTop: "50px",
      // backgroundColor: "pink"
    }}
  >
    {/* {options.type === "info" && "!"}
    {options.type === "success" && ":)"}
    {options.type === "error" && ":("} */}
    <div
      style={{
        width: "200px",
        height: "50px",
        backgroundColor: "#f44336",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: "10px",
        color: "white",
        paddingTop: "5%",
        //paddingBottom: "5%",
        alignItems: "center",
      }}
    >
      {message}
    </div>
    {/* <button onClick={close}>X</button> */}
  </div>
);

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
