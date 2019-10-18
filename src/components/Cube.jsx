import React from "react";
import * as THREE from 'three';
import { a } from "react-spring/three";

const Cube = props => {
  
    return (
        <a.mesh
            castShadow
            position={props.position}
        >
            <boxBufferGeometry attach="geometry" args={[0.05, 0.05, 0.05]} />
            <a.meshBasicMaterial attach="material" color="red" />
        </a.mesh>
    )
}

export default Cube;