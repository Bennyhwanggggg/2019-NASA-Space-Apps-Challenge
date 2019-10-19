import React from 'react';
import ThreeDView from './ThreeDView';
import TwoDView from './TwoDView';
import usePlanetState from './hooks/usePlanetState';
import UserControls from './components/UserControls';

function App() {
    const planetState = usePlanetState();

    return (
        <div className="main">
            {/* <ThreeDView
                water={planetState.water}
                temperature={planetState.temperature}
                oxygen={planetState.oxygen}
            />
            <UserControls
                {...planetState}
            /> */}
            { 
                true && 
                <TwoDView
                    water={planetState.water}
                    temperature={planetState.temperature}
                    oxygen={planetState.oxygen}
                /> }
        </div>
    );
};

export default App;
