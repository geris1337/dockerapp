const fetch = require('node-fetch');

const getData = async () => {
    let days = 32;
    let dateNow = new Date();
    let url = new URL('https://api.climacell.co/v3/weather/historical/station');
    let dataArray = [];

    //Generate date extraction intervals for each 24 hours
    for (i = 0; i < days; days--) {
        let subCounter1 = 24 * days;
        let subCounter2;

        let dateStart = new Date(dateNow.getTime() - (subCounter1 * 60 * 60 * 1000));
        let dateEnd;

        if (subCounter1 != 24) {
            subCounter2 = subCounter1 - 24;
            dateEnd = new Date(dateNow.getTime() - (subCounter2 * 60 * 60 * 1000));
        } else {
            dateEnd = dateNow;
        }

        let params = {
            'lat' : 54.6872,
            'lon' : 25.2797,
            'start_time' : dateStart.toISOString(),
            'end_time' : dateEnd.toISOString(),
            'unit_system' : 'si',
            'fields' : 'temp'
        }
        
        url.search = new URLSearchParams(params).toString();
        
        let response = await fetch(url, {
            method: 'get',
            headers: {
            'content-type': 'application/json',
            'apikey': 'vFx06OIbaJgH5AEpPlxOZu8tzjTO7ozl',
            }})

        let data = await response.json();

        dataArray.push(data);
    }
    return dataArray;
};

exports.getData = getData;  