import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring/three';
import { useRender, extend, useThree } from 'react-three-fiber';

import water from '../assets/Water1.jpg';


const Planet = props => {

    const meshRef = useRef();

    const textureLoader = new THREE.TextureLoader();
    const tet = textureLoader.load(water, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        var material = new THREE.MeshBasicMaterial( {
			map: texture
		});
    });

    // const tet = textureLoader.load(water, (texture) => {
    //     const mat = new THREE.MeshLambertMaterial({
    //         // transparent: true,
    //         opacity: .5,
    //         map: texture
    //     });
    // })
    // const [active, setActive] = useState(false);
    // const properties = useSpring({
    //     scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    // });

    // To make object rotate by itself sample code
    // useRender(() => {
    //     meshRef.current.rotation.Y += 0.01;
    //     meshRef.current.rotation.X += 0.01;
    // });

    return (
        <a.mesh ref={meshRef}
            // onClick={() => setActive(!active)}
            position={props.planetCenter}
            // scale={properties.scale}
            recieveShadow>
            <ambientLight 
                intensity={0.3}
                color={0x404040}
            />
            <sphereBufferGeometry
                attach="geometry"
                args={[2, 25, 25]}
            />
            <meshBasicMaterial attach="material">
                {console.log(tet.material)}
                <texture attach="map" image={THREE.TextureLoader().load(water)} />
            </meshBasicMaterial>
        </a.mesh>
    );
};

export default Planet;