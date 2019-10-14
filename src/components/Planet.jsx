import React, { useRef, useState } from 'react';
import { useSpring, a } from 'react-spring/three';
import { useRender, extend, useThree } from 'react-three-fiber';


const Planet = props => {

    const meshRef = useRef();

    const [active, setActive] = useState(false);
    const properties = useSpring({
        scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    });

    // To make object rotate by itself sample code
    // useRender(() => {
    //     meshRef.current.rotation.Y += 0.01;
    //     meshRef.current.rotation.X += 0.01;
    // });

    return (
        <a.mesh ref={meshRef}
            onClick={() => setActive(!active)}
            scale={properties.scale}
            recieveShadow>
            <ambientLight 
                intensity={0.3}
                color={0x404040}
            />
            <sphereBufferGeometry
                attach="geometry"
                args={[1, 25, 25]}
            />
            <meshPhongMaterial attach="material" color="grey" />
        </a.mesh>
    );
}

export default Planet;