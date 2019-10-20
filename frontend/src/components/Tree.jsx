import React from 'react';
import * as PIXI from 'pixi.js';
import AnimatableObjects from './AnimatableObjects';
import { calculateHabitability, isHabitable } from '../core';
import { treeConfig } from '../landScapePositionConfig';
import oneTree from '../assets/2DLandScapes/1-tree.png';
import threeTree from '../assets/2DLandScapes/3-tree.png';
import fiveTree from '../assets/2DLandScapes/5-tree.png';

const oneTreeTexture = PIXI.Texture.from(oneTree);
const threeTreeTexture = PIXI.Texture.from(threeTree);
const fiveTreeTexture = PIXI.Texture.from(fiveTree);


const Tree = ( { water, temperature, oxygen } ) => {
    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    let treeTexture;
    habitabilityScore = Math.floor(habitabilityScore);
    switch (habitabilityScore) {
        case 0:
            treeTexture = oneTreeTexture;
            break;
        case 1:
        case 2:
            treeTexture = threeTreeTexture;
            break;
        case 3:
        case 4:
            treeTexture = fiveTreeTexture;
            break;
        default:
            treeTexture = threeTreeTexture;
    }


    const textures = [treeTexture];

    treeConfig.sort((a, b) => a.position.y - b.position.y);
    const treeComponents = treeConfig.map(({ position: {x, y} }) => 
        <AnimatableObjects 
            key={`${x}__${y}_tree`}
            x={x}
            y={y}
            textures={textures}
            animationSpeed={0.1}
            randomResize={false}
        />
    )

    return treeComponents;
}

export default Tree;