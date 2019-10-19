import React, { useState } from 'react';
import ThreeDView from './ThreeDView';
import TwoDView from './TwoDView';
import usePlanetState from './hooks/usePlanetState';
import UserControls from './components/UserControls';

function App() {
    const planetState = usePlanetState();
    const [show2DView, setShow2DView] = useState(false);

    return (
        <div className="main">
            <ThreeDView
                water={planetState.water}
                temperature={planetState.temperature}
                oxygen={planetState.oxygen}
                setShow2DView={setShow2DView}
                show2DView={show2DView}
            />
            <UserControls
                {...planetState}
            />
            { show2DView && 
                <TwoDView
                    water={planetState.water}
                    temperature={planetState.temperature}
                    oxygen={planetState.oxygen}
                />
            }
        </div>
    );
};

export default App;
