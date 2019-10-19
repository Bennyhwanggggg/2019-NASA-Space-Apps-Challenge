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
        setOxgen,
    } = props;

    const funcMapper = {
        water: setWater,
        temperatrue: setTemperature,
        oxygen: setOxgen,
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
                <label for="water">water: </label>
                <input
                    id="water"
                    type="text"
                    name="water"
                    onChange={handleChange}
                    value={water}
                />
            </div>
            <div>
                <label for="temperatrue">temperatrue: </label>
                <input
                    id="temperatrue"
                    type="text"
                    name="temperatrue"
                    onChange={handleChange}
                    value={temperature}
                />
            </div>
            <div>
                <label for="oxygen">oxygen: </label>
                <input
                    id="oxygen"
                    type="text"
                    name="oxygen"
                    onChange={handleChange}
                    value={oxygen}
                />
            </div>
            <AIButton
                {...props}
            />
        </div>
    );
};

export default UserControls;