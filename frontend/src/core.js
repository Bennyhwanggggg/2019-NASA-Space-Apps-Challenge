export const calculateHabitability = (water, temperature, oxygen) => {
    if (!(water >= 0 && water <= 4)) throw 'Water 0-4'
    if (!(temperature >= 0 && temperature <= 3)) throw 'Temperature 0-3'
    if (!(oxygen >= 0 && oxygen <= 3)) throw 'Oxygen 0-3'
    return 3 * water / 10 + 3 * temperature / 10 + 3 * oxygen / 10
}

export const isHabitable = (habitability) => {
    return habitability >= 1.5
}
