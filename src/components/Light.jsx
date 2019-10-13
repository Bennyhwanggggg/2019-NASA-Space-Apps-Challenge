import React, { useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useThree, useRender } from 'react-three-fiber'
import * as THREE from 'three'
import './styles.css'
import { observable } from 'mobx'

const Store = observable({
  xPos: 0,
  yPos: 0
})

const ShadowTest = () => {
  const { gl } = useThree()
  const group = useRef()
  useRender(() => {
    gl.shadowMap.type = THREE.PCFSoftShadowMap
    gl.shadowMap.enabled = true
    group.current.position.set(Store.xPos, Store.yPos, 0)
  })
  return (
    <group>
      <Light />
      <Plane />
      <group ref={group}>
        <Sphere />
      </group>
    </group>
  )
}

const Light = () => {
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

const Sphere = () => {
  //Create a sphere that cast shadows (but does not receive them)
  return (
    <mesh castShadow>
      <ambientLight color={0x404040} intensity={2} />
      <sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
      <meshStandardMaterial attach="material" color={0xff0000} />
    </mesh>
  )
}

const Plane = () => {
  //Create a plane that receives shadows (but does not cast them)
  return (
    <mesh receiveShadow>
      <planeBufferGeometry attach="geometry" args={[200, 200, 32, 32]} />
      <meshStandardMaterial attach="material" color={0xffffff} />
    </mesh>
  )
}

const App = () => {
  const handleScroll = useCallback(e => {
    Store.xPos += e.deltaX / 10
    Store.yPos -= e.deltaY / 10
  }, [])
  return (
    <Canvas camera={{ position: [0, 0, 50] }} onWheel={handleScroll}>
      <ShadowTest />
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


