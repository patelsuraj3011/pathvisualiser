import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { EventEmitter } from "./events";

const useDragging = (gridRef) => {
  const [isDragging, setIsDragging] = useState(false);
  // const [pos, setPos] = useState({ x: gridRef.current.offsetLeft || 6, y: gridRef.current.offsetTop || 100 });
  const [pos, setPos] = useState({ x: 5, y: 150 });
  const ref = useRef(null);

  function onMouseMove(e) {
    if (!isDragging) return;
    const x = e.x - ref.current.offsetWidth / 2,
      y = e.y - ref.current.offsetHeight / 2;

    if (ref.current.offsetTop > gridRef.current.offsetTop) {
      setPos({
        x: x,
        y: y,
      });
    } else {
      setPos({
        x: x,
        y: y, //gridRef.current.offsetTop,
      });
    }
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e) {
    let x = Math.floor(
        (e.x - gridRef.current.offsetLeft) / (gridRef.current.clientWidth / 70)
      ),
      y = Math.floor(
        (e.y - gridRef.current.offsetTop) / (gridRef.current.clientHeight / 30)
      );

    // console.log(`${ref.current.offsetTop} ${gridRef.current.offsetTop + gridRef.current.offsetHeight}`);

    if (
      ref.current.offsetTop + 15 >
      gridRef.current.offsetTop + gridRef.current.offsetHeight
    ) {
      setPos({
        x:
          Math.floor((x * gridRef.current.clientWidth) / 70) +
          gridRef.current.offsetLeft,
        y: gridRef.current.offsetTop + gridRef.current.offsetHeight - 15,
      });
    } else {
      if (ref.current.offsetTop > gridRef.current.offsetTop) {
        setPos({
          x:
            Math.floor((x * gridRef.current.clientWidth) / 70) +
            gridRef.current.offsetLeft,
          y:
            Math.floor((y * gridRef.current.clientHeight) / 30) +
            gridRef.current.offsetTop -
            15,
        });
      } else {
        y = 0;
        setPos({
          x:
            Math.floor((x * gridRef.current.clientWidth) / 70) +
            gridRef.current.offsetLeft,
          y: gridRef.current.offsetTop - 15,
        });
      }
    }

    EventEmitter.dispatch("start", { x, y });
    setIsDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;
    setIsDragging(true);

    const x = e.x - ref.current.offsetWidth / 2,
      y = e.y - ref.current.offsetHeight / 2;

    setPos({
      x: x,
      y: y,
    });

    e.stopPropagation();
    e.preventDefault();
  }

  // When the element mounts, attach an mousedown listener
  useEffect(() => {
    setPos({
      x:
        gridRef.current.offsetLeft +
        Math.floor((gridRef.current.offsetWidth / 70) * 20),
      y: gridRef.current.offsetTop + 24 * 10 - 15,
    });
    ref.current.addEventListener("mousedown", onMouseDown);

    return () => {
      ref.current.removeEventListener("mousedown", onMouseDown);
    };
  }, [ref.current]);

  // Everytime the isDragging state changes, assign or remove
  // the corresponding mousemove and mouseup handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
    } else {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    }
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging]);

  return [ref, pos.x, pos.y, isDragging];
};

const StartDraggable = (props) => {
  //console.log(props.gridRef);
  const [ref, x, y, isDragging] = useDragging(props.gridRef);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        borderRadius: "50%",
        width: 20,
        height: 20,
        color: "gray",
        //background: isDragging ? "blue" : "gray",
        left: x,
        top: y,
      }}
    >
      <FaMapMarkerAlt size="30px" color="blue" />
    </div>
  );
};

export default StartDraggable;
