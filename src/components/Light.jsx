import React from 'react'
import * as THREE from 'three'

export const Light = () => {
    //Create a PointLight and turn on shadows for the light
    const light = new THREE.DirectionalLight(0xffffff, 1, 100)
    light.position.set(100, 100, 100)
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