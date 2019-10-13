import { useState, useEffect } from 'react';

const usePlanetState = () => {
    const [water, setWater] = useState(2);
    const [temperature, setTemperature] = useState(2);
    const [oxygen, setOxgen] = useState(2);

    const [habitability, sethabitability] = useState(6);

    useEffect(() => {
        // compute logic here
        const computed = 'xxx';
        sethabitability(computed)
    }, [water, temperature, oxygen]);


    return {
        water,
        temperature,
        oxygen,
        setWater,
        setTemperature,
        setOxgen,
        habitability,
    };
};

export default usePlanetState;