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
