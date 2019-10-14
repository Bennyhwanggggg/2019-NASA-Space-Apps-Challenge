import React, { useRef } from 'react';
import { useThree, useRender, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useRender(() => ref.current.update())
  return <orbitControls 
            ref={ref} 
            autoRotate
            // maxPolarAngle={Math.PI}
            // minPolarAngle={Math.PI}
            // maxAzimuthAngle={Math.PI / 3}
            target = {props.planetCenter}
            args={[camera, gl.domElement]} 
            {...props}
            rotateSpeed={1}
         />
};
