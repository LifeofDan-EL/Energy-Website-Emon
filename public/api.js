require('dotenv').config();
const axios = require('axios');
const { response } = require('express');


const apiUrl = process.env.API_URL;

async function fetchdata(){
    try {
        const response = await axios({
            method: 'GET',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        });
         
          console.log(response)

         const data = transformResponse(response);
        for (const [key, value] of Object.entries(data)) {
            data[key] = getValueOrZero(value);
        }

          return data
        } catch (error) {
            console.error('Axios error:', error);
            return null;
        }
    }

    function transformResponse(response) {
        const data = response.data;
        const solarPV = data[1].value + data[4].value;
        const solarWidth = Math.trunc((solarPV / 7500) * 100);
        const loadWidth = Math.trunc((data[2].value / 5000) * 100);
        const batteryWidth = Math.trunc((data[14].value / 14000) * 100);
    
        return {
            solarPV,
            inverterLoad: data[0].value,
            batteryPower: Math.trunc(data[14].value),
            batterySOC: data[2].value,
            solarWidth,
            loadWidth,
            batteryWidth,
            solarGeneration: data[11].value,
            totalSolarGeneration: Math.trunc(data[43].value),
            peakSolar: data[10].value,
            peakLoad: data[29].value,
            batteryCurrent: data[13].value,
            batteryVolts: data[16].value,
            batteryEnergy: data[20].value,
            batteryDischarge: roundToTwoDecimalPlaces(data[45].value),
            batteryCharge: roundToTwoDecimalPlaces(data[46].value),
            inverterLoadPercentage: data[9].value
        };
    }
    
    function getValueOrZero(value) {
        return !isNaN(value) ? value : 0;
    }

    function roundToTwoDecimalPlaces(value) {
        return Math.round(value * 100) / 100;
    }
    
    
    module.exports = {
        fetchdata
    };
