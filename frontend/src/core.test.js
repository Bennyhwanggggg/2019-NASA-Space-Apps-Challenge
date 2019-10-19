import { calculateHabitability, isHabitable, manipulatePlanet } from './core';

test('1 water, 2 temperature, 1 oxygen = 1.2 habitability', () => {
    expect(calculateHabitability(1, 2, 1)).toBe(1.2);
});

test('1.5 habitability is habitable', () => {
    expect(isHabitable(1.5)).toBe(true);
});

test('1.4 habitability is not habitable', () => {
    expect(isHabitable(1.4)).toBe(false);
});

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