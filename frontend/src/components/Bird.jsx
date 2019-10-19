import React from 'react';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { birdConfig } from '../animalPositionConfig';
import { birdATextures } from '../Texture2DLoader';
import { birdBTextures } from '../Texture2DLoader';
import { birdCTextures } from '../Texture2DLoader';


const Bird = ( { amount } ) => {
    const flip = Math.random() >= 0.5;
    const birdTexturesCollection = [birdATextures, birdBTextures, birdCTextures];

    birdConfig.sort((a, b) => a.position.y - b.position.y);
    const birdComponents = birdConfig.slice(0, amount).map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}`}
            x={x}
            y={y}
            flipHorizontal={flip}
            randomResize={true}
            textures={birdTexturesCollection[Math.floor(Math.random() * birdTexturesCollection.length)]}
            animationSpeed={0.1}
        />
    )
    return birdComponents;
}

export default Bird;