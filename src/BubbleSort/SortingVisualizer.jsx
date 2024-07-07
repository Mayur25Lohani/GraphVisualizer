import React, { useState, useEffect, useRef } from "react";
import "./SortingVisualizer.css";
import Navbar from "../Components/Navbar/Navbar";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [moves, setMoves] = useState([]);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      array.push(Math.random());
    }
    showBar();
  }, []);

  const initialise = () => {
    for (let i = 0; i < 10; i++) {
      array[i] = Math.random();
    }
    setArray(array);
    showBar()
  };

  const play = () => {
    const newArray = [...array];
    const newMoves = sortingAlgo(newArray);
    setMoves(newMoves);
    animate(newMoves);
  };

  const playNote = (freq) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (!isFinite(freq)) {
      console.error("Invalid frequency:", freq);
      return;
    }

    const dur = 0.1;
    const osc = audioCtxRef.current.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + dur);
    osc.connect(audioCtxRef.current.destination);
  };

  const animate = (remainingMoves) => {
    if (remainingMoves.length === 0) {
      showBar(); // Ensure showBar is called properly
      return;
    }

    const move = remainingMoves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
      [array[i], array[j]] = [array[j], array[i]];
    }

    playNote(200 + array[i] * 500);
    playNote(200 + array[j] * 500);

    showBar(move); // Pass move to showBar if needed

    setTimeout(() => animate(remainingMoves), 50);
  };

  const sortingAlgo = (array) => {
    const newMoves = [];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        newMoves.push({ indices: [j, j + 1], type: "comp" });
        if (array[j] > array[j + 1]) {
          newMoves.push({ indices: [j, j + 1], type: "swap" });
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return newMoves;
  };

  const showBar = (move) => {
    containerRef.current.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement("div");
      bar.style.height = array[i] * 100 + "%";
      bar.classList.add("bar");

      if (move && move.indices.includes(i)) {
        bar.style.backgroundColor = move.type === "swap" ? "yellow" : "red";
      }
      containerRef.current.appendChild(bar);
    }
  };

  return (
    <>
      <Navbar />
      <div className="SortingVisualizer">
        <h1 className="sortTitle">Sorting Visualiser</h1>
        <div id="containerSort" ref={containerRef} />
        <hr />
        <div className="buttons">
          <button onClick={initialise}>Initialise</button>
          <button onClick={play}>Sort</button>
        </div>
      </div>
    </>
  );
};

export default SortingVisualizer;
