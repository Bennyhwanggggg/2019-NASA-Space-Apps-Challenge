import { getIndex } from './image_classes'

export const calculateHabitability = (water, temperature, oxygen) => {
    if (!(water >= 0 && water <= 4)) throw 'Water 0-4'
    if (!(temperature >= 0 && temperature <= 3)) throw 'Temperature 0-3'
    if (!(oxygen >= 0 && oxygen <= 3)) throw 'Oxygen 0-3'
    return 3 * water / 10 + 3 * temperature / 10 + 3 * oxygen / 10
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
    var temperature= 0 ;
    var oxygen = 0;

    const { className } = predictResult

    const index = getIndex(className)

    const category = Math.round(index/20)

    switch (category) {
        case 0:
            water = -1
            oxygen = 1
            temperature = 1
        case 1:
            oxygen = -1
            temperature = -2
        case 2:
            temperature = -1
        case 3:
            oxygen = 1
            temperature = -1
        case 4:
            water = -1
            temperature = 3
        default:
            break;
    }

    return {
        water,
        temperature,
        oxygen
    }
};
