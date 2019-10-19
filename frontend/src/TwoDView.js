import React from 'react';
import { Stage, } from '@inlet/react-pixi';
import Background from './components/Background';
import AnimatableObjects from './components/AnimatableObjects';
import ImageUploadButton from './components/ImageUploadButton';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { calculateHabitability, isHabitable } from './core';
import birdATexture from './Texture2DLoader';
import birdBTexture from './Texture2DLoader';
import birdCTexture from './Texture2DLoader';
import chickenTexture from './Texture2DLoader';
import cowTexture from './Texture2DLoader';


const TwoDView = ( { water, temperature, oxygen }) => {
    // const viewPort = new Viewport({
    //     screenWidth: window.innerWidth,
    //     screenHeight: window.innerHeight,
    //     worldWidth: 1000,
    //     worldHeight: 1000// the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    // });

    const habitabilityScore = calculateHabitability(water, temperature, oxygen);

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
