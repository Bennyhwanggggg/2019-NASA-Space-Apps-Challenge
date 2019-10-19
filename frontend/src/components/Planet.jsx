import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { a } from 'react-spring/three';
import waterSrc from '../assets/water.jpg';
import earthSrc from '../assets/earth.png';
import iceSrc from '../assets/ice.jpg';

const getTexture = (water, temperature, oxygen) => {
    const sum = temperature + water + oxygen;
    const textureLoader = new THREE.TextureLoader();
    if (sum > 6) {
        return textureLoader.load(waterSrc);
    }
    if (sum === 6) {
        return textureLoader.load(earthSrc);
    }

    return textureLoader.load(iceSrc);
}

const Planet = ({ planetCenter, water, temperature, oxygen }) => {
    const [texture, setTexture] = useState(getTexture(2, 2, 2));

    useEffect(() => {
        setTexture(getTexture(water, temperature, oxygen));
    }, [water, temperature, oxygen]);

    return (
        <a.mesh
            position={planetCenter}
            recieveShadow
        >
            <ambientLight 
                intensity={0.3}
                color={0x404040}
            />
            <sphereBufferGeometry
                attach="geometry"
                args={[2, 25, 25]}
            />
            <meshBasicMaterial
                attach="material"
                map={texture}
            />
        </a.mesh>
    );
};

export default Planet;