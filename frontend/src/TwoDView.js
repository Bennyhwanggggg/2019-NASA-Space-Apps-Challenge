import React from 'react';
import { Stage, } from '@inlet/react-pixi';
import Background from './components/Background';
import { calculateHabitability, isHabitable } from './core';
import Chicken from './components/Chicken';
import Bird from './components/Bird';
import Cow from './components/Cow';
import Tree from './components/Tree';
import Mountain from './components/Mountains';

const redSky = 0x524444;
const greySky = 0xfeffeb;
const normalSky = 0x9be3fb;
const waterSky = 0xe4eef9;
const iceSky = 0x81cbe4;

const TwoDView = ( { water, temperature, oxygen }) => {

    var habitabilityScore = calculateHabitability(water, temperature, oxygen);

    let skyColor;

    habitabilityScore = Math.floor(habitabilityScore);
    switch (habitabilityScore) {
        case 0:
            skyColor = redSky;
            break;
        case 1:
            skyColor = greySky;
            break;
        case 2:
            skyColor = normalSky;
            break;
        case 3:
            skyColor = waterSky;
            break;
        case 4:
            skyColor = iceSky;
            break;
        default:
            skyColor = normalSky;
    }

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
                    backgroundColor: skyColor
                    }}
                style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
            >
                <Mountain/>
                <Background
                    width={canvas.width}
                    height={canvas.height}
                />
                <Tree/>
                <Chicken/>
                <Cow/>
                <Bird/>
            </Stage>
        </div>
    );
}

export default TwoDView;
