const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

function isPlanetHabitable(planet) {
    return planet['koi_disposition'] === "CONFIRMED"
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', (data) => {
                // console.log(data['koi_disposition'], data['koi_insol'], data['koi_prad']);
                if(isPlanetHabitable(data)) {
                    habitablePlanets.push(data);
                }
                // records.push(data)
            })
            .on('error', (err) => {
                console.log(err.message);
                reject(err);
            })
            .on('end', () => {
                habitablePlanets.map((item) => {
                    console.log([
                        item['kepler_name'],
                        item['koi_disposition'],
                        item['koi_insol'],
                        item['koi_prad'],
                    ]);
                })
                console.log(`${habitablePlanets.length} habitable planets found!`);
                console.log("Done Reading!");
                resolve();
            });
    }) 
}

function getAllPlanets() {
    return habitablePlanets;
}


module.exports = {
    loadPlanetsData,
    getAllPlanets,
};