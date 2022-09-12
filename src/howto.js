import React from "react";
import { FaMapPin, FaMapMarkerAlt } from "react-icons/fa";

const HowTo = () => {
  return (
    <div style={{}}>
      <div style={{ lineHeight: "40px" }}>
        <h3>Legend</h3>
        <FaMapMarkerAlt size="20px" color="blue" />
        <span style={{ marginLeft: "7px" }}>Source</span>
        <br />
        <FaMapPin size="20px" color="red" />
        <span style={{ marginLeft: "7px" }}>Destination</span>
        <br />
        <div
          style={{
            height: "24px",
            width: "24px",
            backgroundColor: "#96baff",
            display: "inline-block",
            marginRight: "10px",
          }}
        ></div>
        Visited Node
        <br />
        <div
          style={{
            height: "24px",
            width: "24px",
            backgroundColor: "#C7FFD8",
            display: "inline-block",
            marginRight: "10px",
          }}
        ></div>
        Path Node
        <br />
        <div
          style={{
            height: "24px",
            width: "24px",
            backgroundColor: "#c8c6a7",
            display: "inline-block",
            marginRight: "10px",
          }}
        ></div>
        Wall
        <br />
      </div>
      <br />
      <h3>Steps for Path Finding</h3>
      <ul>
        <li>Place the Source and Destination Pointer</li>
        <li>Select a Path Finding Algorithm from the Drop Down Menu</li>
        <li>Click Find Path</li>
      </ul>
      <h3>Steps for Maze Generation and Path Finding</h3>
      <ul>
        <li>Select a Maze Generation Algorithm</li>
        <li>Click Generate Maze</li>
        <li>Place the Source and Destination Pointer</li>
        <li>Select a Path Finding Algorithm from the Drop Down Menu</li>
        <li>Click Find Path</li>
      </ul>
      <br />
      <h3>Tips</h3>
      <ul>
        <li>
          After a Path has been found and you change the position of the Source
          or Destination Pointer then the Path Finding Algorithm will Re-run.
        </li>
      </ul>
      <p style={{ marginTop: "10%", fontWeight: "bold" }}>
        Made By Prashant Pandey
      </p>
    </div>
  );
};

export default HowTo;
