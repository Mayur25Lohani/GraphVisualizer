import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import "./Home.css";

const Home = () => {
  const Typewriter = ({ text, delay }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
  };

  const Particles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const particles = [];
      const particleSize = 4;
      const maxParticles = 50;
      const threshold = 20;

      const line = (particle, particle2) => {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(particle2.x, particle2.y);
        context.stroke();
      };

      const animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < maxParticles; i++) {
          const particle = particles[i];
          context.fillRect(
            particle.x - particleSize / 2,
            particle.y - particleSize / 2,
            particleSize,
            particleSize
          );
          for (let j = 0; j < maxParticles; j++) {
            if (i !== j) {
              const particle2 = particles[j];
              const distanceX = Math.abs(particle.x - particle2.x);
              const distanceY = Math.abs(particle.y - particle2.y);
              if (distanceX < threshold && distanceY < threshold) {
                context.lineWidth =
                  (threshold * 2 - (distanceX + distanceY)) / 50;
                const color = 200 - Math.floor(distanceX + distanceY);
                context.strokeStyle = `rgb(${color},${color},${color})`;
                line(particle, particle2);
              }
            }
          }
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (
            particle.x > canvas.width - particleSize ||
            particle.x < particleSize
          )
            particle.vx = -particle.vx;
          if (
            particle.y > canvas.height - particleSize ||
            particle.y < particleSize
          )
            particle.vy = -particle.vy;
        }
        requestAnimationFrame(animate);
      };

      for (let i = 0; i < maxParticles; i++) {
        const particle = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random(),
          vy: Math.random(),
        };
        particles.push(particle);
      }
      context.fillStyle = "white";
      animate();
    }, []);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100vw",
          height: "calc(100vh - 80px)", // Adjust for navbar height if needed
        }}
      ></canvas>
    );
  };

  return (
    <>
      <Navbar />
      <Particles />
      <div className="content">
        <h1 className="titleHome">
          Welcome{" "}
          <Typewriter text="to the world of Visualization!" delay={100} />
        </h1>
      </div>
    </>
  );
};

export default Home;
