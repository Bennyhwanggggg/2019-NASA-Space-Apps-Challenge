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
    return 3 * water / 10 + 3 * temperature / 10 + 3 * oxygen / 10
}

export const isHabitable = (habitability) => {
    return habitability >= 1.5
}

export const manipulatePlanet = (predictResult) => {
    var water = 0;
    var temperature= 0 ;
    var oxygen = 0;

    const { className } = predictResult
    console.log(className);

    switch (className) {
        case "Sashimi":
            water = -0.2
        default:
            break;
    }

    return {
        water,
        temperature,
        oxygen
    }
}
