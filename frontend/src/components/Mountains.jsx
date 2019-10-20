import React from 'react';
import * as PIXI from 'pixi.js';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability } from '../core';
import { mountainConfig } from '../landScapePositionConfig';
import iceMountain from '../assets/2DLandScapes/iceberg.png';
import normalMountain from '../assets/2DLandScapes/normal.png';
import rockMountain from '../assets/2DLandScapes/rock_mountain.png';
import fireMountain from '../assets/2DLandScapes/volcano.png';

const iceMountainTexture = PIXI.Texture.from(iceMountain);
const rockMountainTexture = PIXI.Texture.from(rockMountain);
const fireMountainTexture = PIXI.Texture.from(fireMountain);
const normalMountainTexture = PIXI.Texture.from(normalMountain);


const Mountain = ( { water, temperature, oxygen } ) => {

    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    habitabilityScore = Math.floor(habitabilityScore);
    let mountainTexture;
    switch (habitabilityScore) {
        case 0:
            mountainTexture = iceMountainTexture;
            break;
        case 1:
            mountainTexture = rockMountainTexture;
            break;
        case 2:
            mountainTexture = normalMountainTexture;
            break;
        case 3:
        case 4:
            mountainTexture = fireMountainTexture;
            break;
        default:
            mountainTexture = normalMountainTexture;
    }

    const textures = [mountainTexture];

    mountainConfig.sort((a, b) => a.position.y - b.position.y);
    const mountainComponents = mountainConfig.map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}_mountain`}
            x={x}
            y={y}
            textures={textures}
            animationSpeed={0.1}
            randomResize={false}
        />
    )

    return mountainComponents;
}

export default Mountain;