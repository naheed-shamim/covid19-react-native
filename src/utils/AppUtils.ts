export const getTotalIndiaCasesArray = totalCases => {
    return [
        { type: 'confirmed', value: totalCases.confirmed, daily: totalCases.confirmed, color: 'red' },
        { type: 'active', value: totalCases.active, daily: totalCases.active, color: 'blue' },
        { type: 'deaths', value: totalCases.deaths, daily: totalCases.deaths, color: 'grey' },
        { type: 'recovered', value: totalCases.recovered, daily: totalCases.recovered, color: 'green' }
    ]
}

export const getTotalWorldCasesArray = totalCases => {
    if (!!totalCases) {
        // const active = totalCases.TotalConfirmed - tot   alCases.TotalDeaths - totalCases.TotalRecovered
        return [
            { type: 'confirmed', value: totalCases.TotalConfirmed, daily: totalCases.NewConfirmed, color: 'red' },
            // { type: 'active', value: active, daily: 0, color: 'blue' },
            { type: 'deaths', value: totalCases.TotalDeaths, daily: totalCases.NewDeaths, color: 'grey' },
            { type: 'recovered', value: totalCases.TotalRecovered, daily: totalCases.NewRecovered, color: 'green' }
        ]
    }
    return []
}

export const getPercentageStats = (confirmed = 0, deaths = 0, recovered = 0) => {

    let deathPercentage = 0, recoveryPercentage = 0;

    const confirmedValue = parseInt(confirmed);
    const deathsValue = parseFloat(deaths);
    const recoveredValue = parseFloat(recovered);
    deathPercentage = (deathsValue / confirmedValue) * 100;
    recoveryPercentage = (recoveredValue / confirmedValue) * 100;

    return {
        deathPercentage,
        recoveryPercentage,
    };
};