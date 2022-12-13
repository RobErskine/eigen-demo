import fetch from 'node-fetch';

exports.handler = async (event, context) => {

    const params = event.queryStringParameters
    const UUID = params.id

    let eigenAPI = 'https://staging.eigendev.com/WebAPI'

    let SREQObject = {
        "SCtrl": {
            "Platform": "MiraPayCapture",
            "Service": "Session",
            "ServiceVersion": "1.0.0",
            "UUID": UUID, // randomly generated 32 char string of numbers and lowerecase letters
            "EndUserContext": {
                "AppId": process.env.EIGEN_APP_ID
            },
            "Procedure": "Create",
            "EpaKey": process.env.EIGEN_EPA_KEY
        },
        "SDFields": {
            "OriginURL": process.env.EIGEN_ORIGIN_URL
        } 
    }

    let settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SREQObject)
    }

    let eigenResponse
    try {
        eigenResponse = await fetch(eigenAPI, settings)
        eigenData = await eigenResponse.json()
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