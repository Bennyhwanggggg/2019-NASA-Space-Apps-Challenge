import { calculateHabitability, isHabitable } from './core';

test('1 water, 2 temperature, 1 oxygen = 1.2 habitability', () => {
    expect(calculateHabitability(1, 2, 1)).toBe(1.2);
});

test('1.5 habitability is habitable', () => {
    expect(isHabitable(1.5)).toBe(true);
});

test('1.4 habitability is not habitable', () => {
    expect(isHabitable(1.4)).toBe(false);
});