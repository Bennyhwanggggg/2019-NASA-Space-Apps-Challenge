import React from 'react';
import AnimatableObjects from './components/AnimatableObjects';
import { calculateHabitability, isHabitable } from './core';
import { birdConfig } from '../animalPositionConfig';
import { birdATexture } from '../Texture2DLoader';
import { birdBTexture } from '../Texture2DLoader';
import { birdCTexture } from '../Texture2DLoader';


const Bird = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    const birdTextures = [birdATexture, birdBTexture, birdCTexture];

    const birdComponents = birdConfig.map((x, y) => 
        <AnimatableObjects 
            x={x}
            y={y}
            textures = {birdTextures[Math.floor(Math.random() * birdTextures.length) + 1]}
            animationSpeed = {0.7}
        />
    )

    return birdComponents;
}

export default Bird;