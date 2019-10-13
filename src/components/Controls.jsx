import React, { useRef } from 'react';
import { useThree, useRender, extend } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

extend({ TrackballControls });

export const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useRender(() => ref.current.update())
  return <trackballControls 
            ref={ref} 
            args={[camera, gl.domElement]} 
            {...props}
            rotateSpeed={5}
         />
};
