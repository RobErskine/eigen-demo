import fetch from 'node-fetch';

let eigenAPI = process.env.EIGEN_API_URL
// let eigenAPI = 'https://staging.eigendev.com/WebAPI'

function makeid(length) {
    var result           = ''
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

let UUID = makeid(32)

let SREQObject = {
    "SCtrl": {
        "Platform": "MiraPayCapture",
        "Service": "Session",
        "ServiceVersion": "1.0.0",
        "UUID": UUID, // randomly generated 32 char string of numbers and lowerecase letters
        "EndUserContext": {
            "AppId": process.env.EIGEN_APP_ID // is this right?
        },
        "Procedure": "Create",
        "EpaKey": process.env.EIGEN_EPA_KEY // aBcU2Lwjso1QtOSkjXHAcdNu64OWOFVH1 // is this right?
    },
    "SDFields": {
        "OriginURL": process.env.EIGEN_ORIGIN_URL // localhost:8888 or https://adk-eigen-demo.netlify.app
    } 
}

exports.handler = async (event, context) => {
    let eigenResponse
    try {
        eigenResponse = 
            // eigenAPI = https://staging.eigendev.com/WebAPI
            await fetch(eigenAPI, {method: 'POST', ...SREQObject}) // body: SREQObject?
        eigenData = 
            await eigenResponse.json()
        console.log(eigenResponse)
    } catch (err) {
        console.log({err})
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
              error: err.message
            })
          }
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ ...eigenData })
    };
}