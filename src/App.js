import React from 'react';
import './App.css';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import Earth from './components/Earth';

function App() {
  return (
    <div className="main">
      <Canvas>
        <Earth />
      </Canvas>
    </div>
  );
}

export default App;
