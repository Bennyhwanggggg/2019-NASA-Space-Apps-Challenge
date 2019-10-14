import React, { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const modelURL = './assets/chicken.gltf';

export const Chicken = props => {

    const [model, setModel] = useState();

    useEffect(() => {
        new GLTFLoader().load(modelURL, setModel);
    }, [])

    return model ? <primitive object={model.scene}/> : null
};