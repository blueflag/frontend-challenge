import React from 'react';
import DashBoard from './DashBoard'

export default function App(): React.ReactElement {
    const dashBoardTiles = {
        backgroundColor: '#01588f',
        cursor: 'pointer',
    }

    return <div>
        <header className="Header">
            <img src="https://blueflag.com.au/assets/logos/blueflag-logo.svg" width="130" alt="logo" />
        </header>
        <main className="Main">
            <DashBoard />
        </main>
    </div>;
}