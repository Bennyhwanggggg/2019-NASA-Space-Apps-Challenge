import React, { useRef, useEffect } from 'react';
import { useThree, useRender, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export const Controls = (props) => {
  const { setShow2DView, planetCenter, show2DView } = props;
  const { gl, camera } = useThree();
  const controlRef = useRef();

  useRender(() => controlRef.current.update());

  const handleChange = () => {
    const control = controlRef.current;
    const distance = control.target.distanceTo(control.object.position)

    const shouldShow2DView = distance < 2;

    if (shouldShow2DView !== show2DView) {
      requestAnimationFrame(() => setShow2DView(shouldShow2DView));
      
    }
  };

  useEffect(() => {
    const control = controlRef.current;
    control.addEventListener('change', handleChange);
  }, []);
  
  return <orbitControls 
            ref={controlRef} 
            autoRotate
            enableKeys={false}
            target = {planetCenter}
            args={[camera, gl.domElement]} 
            {...props}
            rotateSpeed={1}
         />
};
