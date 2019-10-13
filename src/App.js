import React from 'react';
import './App.css';
import { Canvas } from 'react-three-fiber';
// eslint-disable-next-line no-unused-vars
import Earth from './components/Earth';
import * as THREE from 'three';

function App() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  return (
    <div className="main">
      <Canvas camera={camera}>
        <Earth />
      </Canvas>
    </div>
  );
}

export default App;
