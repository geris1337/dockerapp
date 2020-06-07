const express = require('express');
const path = require('path');
const app = express();
const datastore = require('nedb');
const weather = require('./weather');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/day', function(req, res) {
    //Limit queries ~48 for 24 hours, sort by latest temperature data 
    database.find({}).sort({ time: -1 }).limit(48).exec(function (err, data) {
        if(err) {
            res.end;
            return;
        }

        let arr = [];

        for (const element of data) {
            arr.push([element.time, element.temp]);
        }
        
        res.json(arr);
    })
});

app.get('/week', function(req, res) {
    //Limit queries ~336 for 7 days, sort by latest temperature data 
    database.find({}).sort({ time: -1 }).limit(336).exec(function (err, data) {
        if(err) {
            res.end;
            return;
        }

        let arr = [];

        for (const element of data) {
            arr.push([element.time, element.temp]);
        }
        
        res.json(arr);
    })
});

app.get('/month', function(req, res) {
    //Limit queries ~1488 for 31 days, sort by latest temperature data 
    database.find({}).sort({ time: -1 }).limit(1488).exec(function (err, data) {
        if(err) {
            res.end;
            return;
        }

        let arr = [];

        for (const element of data) {
            arr.push([element.time, element.temp]);
        }
        
        res.json(arr);
    })
});

const database = new datastore('database.db');

function insertData() {
    database.remove({ }, { multi: true });
    database.loadDatabase();
    weather.getData().then(function(result) {
        Object.keys(result).forEach(key => {
            Object.entries(result[key]).forEach(entry => {
                let index = entry[1];
                database.insert({time: index.observation_time.value, temp: index.temp.value, created: Date.now()});
                database.persistence.compactDatafile();
            })
        })
        console.log("Data inserted.")
    })
}

insertData();
// Update database every hour
setInterval(insertData, 1 * 60 * 60 * 1000);

app.listen(process.env.PORT || 3000, function(){
    console.log('Server Started on Port 3000...');
    console.log('Waiting for data...')
})
