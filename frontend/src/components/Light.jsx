import React from 'react'
import * as THREE from 'three'

export const Light = (props) => {

    const { color, intensity, position } = props;
    const positionX = position != null && position.x != null ? position.x : 100;
    const positionY = position != null && position.y != null ? position.y : 100;
    const positionZ = position != null && position.z != null ? position.z : 100;

    const lightIntensity = intensity != null ? intensity : 1;
    const lightColor = color != null ? color : 0xffffff;

    //Create a PointLight and turn on shadows for the light
    const light = new THREE.DirectionalLight(lightColor, lightIntensity, 100)
    light.position.set(positionX, positionY, positionZ)
    light.castShadow = true // default false
    //Set up shadow properties for the light
    light.shadow.mapSize.width = 5120 // default
    light.shadow.mapSize.height = 5120 // default
    light.shadow.camera.near = 0.1 // default
    light.shadow.camera.far = 500 // default
    light.shadow.camera.top = -100 // default
    light.shadow.camera.right = 100 // default
    light.shadow.camera.left = -100 // default
    light.shadow.camera.bottom = 100 // default
    return <primitive object={light} />
}