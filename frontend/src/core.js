import { Junks, LifeStocks, Plantations } from './foodClasses';

export const calculateHabitability = (water, temperature, oxygen) => {
    if (water < 0){
        water = 0
    } else if (water > 4) {
        water = 4
    }
    if (temperature < 0){
        temperature = 0
    } else if (temperature > 4) {
        temperature = 4
    }
    if (oxygen < 0){
        oxygen = 0
    } else if (oxygen > 4) {
        oxygen = 4
    }
    if (water <= 0.5) {
        temperature *= 0.5;
    }
    return (water + temperature + oxygen) / 3
}

export const getAnimalHabitation = (water, temperature, oxygen) => {
    const habitability = calculateHabitability(water, temperature, oxygen)
    const totalAnimal = 15

    const chicken = Math.round(8/ totalAnimal * totalAnimal * habitability / 3);
    const cow = Math.round(4 / totalAnimal * totalAnimal * habitability / 3);
    const bird = Math.round(3 / totalAnimal * totalAnimal * habitability / 3);

    return {
        chicken,
        cow,
        bird
    }
}

export const manipulatePlanet = (predictResult) => {
    var water = 0;
    var temperature = 0 ;
    var oxygen = 0;

    const { className } = predictResult

    if (Junks.includes(className)) {
        water -= 1;
        oxygen -= 1;
        temperature += 1;
    } else if (LifeStocks.includes(className)) {
        water -= 1;
        oxygen += 1;
        temperature -= 1
    } else if (Plantations.includes(className)) {
        water += 1;
        oxygen += 1;
        temperature -= 1;
    } else {
        water += 1;
        oxygen -= 1;
        temperature += 1;
    }

    return {
        water,
        temperature,
        oxygen
    }
};
