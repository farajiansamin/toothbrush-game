// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Instructions from "./Instructions";
import Modal from "./Modal";
import * as THREE from "three";

function WebGLComponent() {
  const TIMER = 30 // seconds
  const [timer, setTimer] = useState(TIMER);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [row1Teeth, setRow1Teeth] = useState([]);
  const [row2Teeth, setRow2Teeth] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Function to generate a random brown color
  const getRandomBrownColor = () => {
    const r = Math.floor(Math.random() * 100) + 50; // Between 50 and 150
    const g = Math.floor(Math.random() * 50) + 25; // Between 25 and 75
    const b = Math.floor(Math.random() * 50) + 25; // Between 25 and 75
    return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
  };

  // Function to check if all teeth in the array are white
  const areAllTeethWhite = (teeth) => {
    return teeth.every(
      (tooth) => tooth.material && tooth.material.color.getHex() === 0xffffff
    );
  };

  const resetTeeth = () => {
    if (row1Teeth.length > 0 && row2Teeth.length > 0) {
      const newRow1Teeth = [...row1Teeth];
      const newRow2Teeth = [...row2Teeth];

      newRow1Teeth.forEach((tooth) => {
        if (tooth && tooth.material) {
          tooth.material.color.set(0xffffff);
        }
      });

      newRow2Teeth.forEach((tooth) => {
        if (tooth && tooth.material) {
          tooth.material.color.set(0xffffff);
        }
      });

      const numBrownTeeth = 3;
      for (let i = 0; i < numBrownTeeth; i++) {
        const randomIndex1 = Math.floor(Math.random() * newRow1Teeth.length);
        const randomIndex2 = Math.floor(Math.random() * newRow2Teeth.length);

        if (newRow1Teeth[randomIndex1] && newRow1Teeth[randomIndex1].material) {
          newRow1Teeth[randomIndex1].material.color.set(getRandomBrownColor());
        }
        if (newRow2Teeth[randomIndex2] && newRow2Teeth[randomIndex2].material) {
          newRow2Teeth[randomIndex2].material.color.set(getRandomBrownColor());
        }
      }

      setRow1Teeth(newRow1Teeth);
      setRow2Teeth(newRow2Teeth);
    }
  };

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    if (timer === 0) {
      checkGameResult();
    }
    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const createSemiCircleShape = (radius) => {
      const shape = new THREE.Shape();
      const startAngle = -Math.PI;
      const endAngle = 0;

      shape.moveTo(0, 0);
      shape.absarc(0, 0, radius, startAngle, endAngle, false);
      shape.lineTo(0, 0);

      return shape;
    };

    const createThickSemiCirclePlane = (yPosition, thickness) => {
      const radius = 3.2;
      const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: false,
      };

      const shape = createSemiCircleShape(radius);
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
      });

      const semiCircle = new THREE.Mesh(geometry, material);
      semiCircle.rotation.x = -Math.PI / 2;
      semiCircle.position.y = yPosition;
      semiCircle.position.z -= 0.12;

      return semiCircle;
    };

    const semiCirclePlane1 = createThickSemiCirclePlane(1.2, 0.5);
    scene.add(semiCirclePlane1);

    const semiCirclePlane2 = createThickSemiCirclePlane(-1.8, 0.5);
    scene.add(semiCirclePlane2);

    const createTeethRow = (yOffset) => {
      const numTeeth = 16;
      const radius = 3;
      const boxWidth = 0.4;
      const boxDepth = 0.4;

      const group = new THREE.Group();
      const teeth = [];

      for (let i = 0; i < numTeeth; i++) {
        const angle = (i / (numTeeth - 1)) * Math.PI;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = yOffset;

        const geometry = new THREE.BoxGeometry(boxWidth, 0.5, boxDepth);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const tooth = new THREE.Mesh(geometry, material);
        tooth.isTooth = true;

        tooth.position.set(x, y, z);
        tooth.rotation.y = -(angle + Math.PI);

        tooth.geometry.computeBoundingBox();
        tooth.geometry.boundingBox.expandByScalar(0.1);

        group.add(tooth);
        teeth.push(tooth);
      }

      const numBrownTeeth = 3;
      for (let i = 0; i < numBrownTeeth; i++) {
        const randomIndex = Math.floor(Math.random() * teeth.length);
        teeth[randomIndex].material.color.set(getRandomBrownColor());
      }

      return { group, teeth };
    };

    const { group: row1Group, teeth: row1Teeth } = createTeethRow(1);
    scene.add(row1Group);

    const { group: row2Group, teeth: row2Teeth } = createTeethRow(-1);
    scene.add(row2Group);

    setRow1Teeth(row1Teeth);
    setRow2Teeth(row2Teeth);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        // console.log("Intersection detected, changing cursor");
        document.body.style.cursor = 'url("/images/toothbrush-32.png"), auto';
      
      } else {
        // console.log("No intersection, resetting cursor");
        document.body.style.cursor = 'auto'; // Reset to default cursor if no intersection
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const onMouseClick = (event: MouseEvent) => {
      if (!gameStarted) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);
      intersects.forEach((intersect) => {
        const intersectedObject = intersect.object as THREE.Mesh;

        if (intersectedObject.isTooth) {
          makeWhite(intersectedObject)

          if (areAllTeethWhite(row1Teeth) && areAllTeethWhite(row2Teeth)) {
            setGameStarted(false);  
            setModalMessage("Congratulations, you won! Do you want to restart?");
            setShowModal(true); // Show the modal with the win message
          }
        }
      });
    };

    window.addEventListener("click", onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);

      if (gameStarted) {
        scene.rotation.y += 0.011;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onMouseClick);
    };
  }, [gameStarted]);

  const startGame = () => {
    setShowInstructions(false);
    setTimer(TIMER);
    setGameStarted(true);
  };

  const makeWhite = (tooth) => {
    tooth.material.color.set(0xffffff);
  }

  const restartGame = () => {
    setGameStarted(false);
    resetTeeth();
    setTimer(TIMER);
    setTimeout(() => setGameStarted(true), 100);
  };

  const handleConfirm = () => {
    setShowModal(false); // Hide the modal
    restartGame(); // Restart the game when confirmed
  };

  const handleCancel = () => {
    setShowModal(false); // Just hide the modal if cancelled
  };


  const checkGameResult = () => {
    if (areAllTeethWhite(row1Teeth) && areAllTeethWhite(row2Teeth)) {
      setModalMessage("Congratulations, you won! Do you want to restart?");
      setShowModal(true); // Show the modal with the win message
    } else if (timer === 0) {
      setModalMessage("Time's up! You lost. Do you want to restart?");
      setShowModal(true); // Show the modal with the loss message
      setGameStarted(false);
    }
    
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1,
          color: "white",
        }}
      >
        <button
          onClick={startGame}
          disabled={gameStarted}
          style={{
            color: "white",
            backgroundColor: gameStarted ? "#888" : "#007BFF",
            border: "none",
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "5px",
            cursor: gameStarted ? "not-allowed" : "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            transform: gameStarted ? "none" : "translateY(0)",
          }}
          onMouseDown={(e) => e.target.style.transform = gameStarted ? "none" : "translateY(2px)"}
          onMouseUp={(e) => e.target.style.transform = gameStarted ? "none" : "translateY(0)"}
        >
          Start Game
        </button>
        <button
          onClick={restartGame}
          style={{
            color: "white",
            backgroundColor: "#FF5733",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            transform: "translateY(0)",
          }}
          onMouseDown={(e) => e.target.style.transform = "translateY(2px)"}
          onMouseUp={(e) => e.target.style.transform = "translateY(0)"}
        >
          Restart Game
        </button>
        <p>Time Remaining: {timer} seconds</p>
        {showInstructions && <Instructions />}
        {showModal && (
          <Modal
            message={modalMessage}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
      <canvas id="webgl-canvas" />
    </>
  );
  
  
}

export default WebGLComponent;

