import React from 'react';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { birdConfig } from '../animalPositionConfig';
import { birdATextures } from '../Texture2DLoader';
import { birdBTextures } from '../Texture2DLoader';
import { birdCTextures } from '../Texture2DLoader';


const Bird = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const flip = Math.random() >= 0.5;
    const birdTexturesCollection = [birdATextures, birdBTextures, birdCTextures];

    const birdComponents = birdConfig.map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}`}
            x={x}
            y={y}
            flipHorizontal={flip}
            textures={birdTexturesCollection[Math.floor(Math.random() * birdTexturesCollection.length)]}
            animationSpeed={0.1}
        />
    )

    return birdComponents;
}

export default Bird;