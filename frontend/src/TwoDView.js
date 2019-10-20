import React from 'react';
import { Stage, } from '@inlet/react-pixi';
import Background from './components/Background';
import { getAnimalHabitation, calculateHabitability } from './core';
import Chicken from './components/Chicken';
import Bird from './components/Bird';
import Cow from './components/Cow';
import Tree from './components/Tree';
import Mountain from './components/Mountains';

const redSky = 0x524444;
const normalSky = 0x9be3fb;
const waterSky = 0xe4eef9;
const iceSky = 0x81cbe4;

const TwoDView = ( { water, temperature, oxygen, setShow2DView }) => {

    var habitabilityScore = calculateHabitability(water, temperature, oxygen);
    var { chicken, cow, bird } = getAnimalHabitation(water, temperature, oxygen);

    let skyColor;

    habitabilityScore = Math.floor(habitabilityScore);
    switch (habitabilityScore) {
        case 0:
            skyColor = iceSky;
            break;
        case 1:
            skyColor = waterSky;
            break;
        case 2:
            skyColor = normalSky;
            break;
        case 3:
        case 4:
            skyColor = redSky;
            break;
        default:
            skyColor = normalSky;
    }

    const canvas = {
        width: 2560,
        height: 1440
    }

    const handleScroll = (event) => {
        const delta = Math.sign(event.deltaY);
        if (delta > 0) {
            setShow2DView(false);
        }
        return;
    }

    return (
        <div onWheel={handleScroll}>
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
                <Mountain
                    water={water}
                    temperature={temperature}
                    oxygen={oxygen}
                />
                <Background
                    water={water}
                    temperature={temperature}
                    oxygen={oxygen}
                    width={canvas.width}
                    height={canvas.height}
                />
                <Tree
                    water={water}
                    temperature={temperature}
                    oxygen={oxygen}
                />
                <Chicken
                    amount={chicken}
                />
                <Cow
                    amount={cow}
                />
                <Bird
                    amount={bird}
                />
            </Stage>
        </div>
    );
}

export default TwoDView;
