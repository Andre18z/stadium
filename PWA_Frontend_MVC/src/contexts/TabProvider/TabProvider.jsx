import React, { useMemo, useState } from 'react';
import { TabContext } from './TabContext';

export const TabProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [countClicks, setClicksCount] = useState(1);

    const value = useMemo(() => ({
        games,
        setGames,
        countGames: games.length,
        setClicksCount,
        countClicks: countClicks,
    }), [games, countClicks]);


    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    );
};