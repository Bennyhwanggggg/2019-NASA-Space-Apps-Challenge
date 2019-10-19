import {manipulatePlanet} from "./core"

test('Eating more sashimi will decrase the water in a planet', () => {
    const predictResult = {
        className: "Sashimi",
        probability: "1"
    }
    const result = manipulatePlanet(predictResult)
    expect(result.water).toBe(-0.2);
    expect(result.temperature).toBe(0);
    expect(result.oxygen).toBe(0);
});

test('Eating a unknown food will no change any parameter in a planet', () => {
    const predictResult = {
        className: "unknown",
        probability: "1"
    }
    const result = manipulatePlanet(predictResult)
    expect(result.water).toBe(0);
    expect(result.temperature).toBe(0);
    expect(result.oxygen).toBe(0);
});