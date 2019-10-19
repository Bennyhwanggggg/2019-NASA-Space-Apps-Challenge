import React from 'react';

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
                <label for="oxgen">oxygen: </label>
                <input
                    id="oxgen"
                    type="text"
                    name="oxygen"
                    onChange={handleChange}
                    value={oxygen}
                />
            </div>
        </div>
    );
};

export default UserControls;