import React from 'react';
import { Stage, } from '@inlet/react-pixi';
import Background from './components/Background';
import AnimatableObjects from './components/AnimatableObjects';
import ImageUploadButton from './components/ImageUploadButton';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import chicken1 from './assets/chicken1.jpeg';
import chicken2 from './assets/chicken2.jpeg';
import chicken3 from './assets/chicken3.png';
import dog from './assets/dog.jpg';


const temp = PIXI.Texture.from(chicken1);
const temp2 = PIXI.Texture.from(chicken2);
const temp3 = PIXI.Texture.from(chicken3);
const dogggy = PIXI.Texture.from(dog);

const texturesArray = [];
texturesArray.push(temp);
texturesArray.push(temp2);
texturesArray.push(temp3);
texturesArray.push(dogggy);

function TwoDView() {
    // const viewPort = new Viewport({
    //     screenWidth: window.innerWidth,
    //     screenHeight: window.innerHeight,
    //     worldWidth: 1000,
    //     worldHeight: 1000// the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    // });

    const canvas = {
        width: 2560,
        height: 1440
    }

    return (
        <div>
            <Stage 
                width={canvas.width} 
                height={canvas.height} 
                options={{
                    autoStart: true,
                    backgroundColor: 0xeef1f5
                    }}
                style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                // viewPort={viewPort}
            >
                <Background
                    width={canvas.width}
                    height={canvas.height}
                />
                <AnimatableObjects
                    textures={texturesArray}
                    x={320}
                    y={680}
                />
            </Stage>
            <ImageUploadButton/>
        </div>
    );
}

export default TwoDView;
