import React from 'react';
import { STATE_BOUNDS } from '../hooks/usePlanetState';
import AIButton from './AIButton';

const UserControls = (props) => {
    const {
        water,
        temperature,
        oxygen,
        setWater,
        setTemperature,
        setOxygen,
    } = props;

    const funcMapper = {
        water: setWater,
        temperature: setTemperature,
        oxygen: setOxygen,
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        const setter = funcMapper[name];

        if (!value || !parseInt(value)) {
            setter(0);
            return;
        }

        const [min, max] = STATE_BOUNDS[name];

        if (value < min) {
            return setter(min);
        }

        if (value > max) {
            return setter(max);
        }

        setter(parseInt(value));
    };

    return (
        <div className="userControls">
            <div>
                <label htmlFor="water">water  </label>
                <input
                    type="range"
                    id="water"
                    min="0"
                    max="4"
                    step="1"
                    name="water"
                    value={water}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label for="temperature">temperatrue  </label>
                <input
                    type="range"
                    id="temperature"
                    min="0"
                    max="3"
                    step="1"
                    name="temperature"
                    value={temperature}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label for="oxygen">oxygen: </label>
                <input
                    type="range"
                    id="oxygen"
                    min="0"
                    max="3"
                    step="1"
                    name="oxygen"
                    value={oxygen}
                    onChange={handleChange}
                />
            </div>
            <AIButton
                {...props}
            />
        </div>
    );
};

export default UserControls;