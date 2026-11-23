import React from 'react';

const context = {
    setGames: () => {},
    countGames: () => {},
    setClicksCount: () => {},
    countClicks: () => {},
}

export const TabContext = React.createContext(context);