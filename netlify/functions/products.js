const fetch = require('node-fetch'); // needed if using Node < 18 (which Netlify does by default)

exports.handler = async function (event, context) {
  const GHL_API_KEY = process.env.GHL_API_KEY;

  try {
    const response = await fetch('https://services.leadconnectorhq.com/products', {
      method: 'GET',
      headers: {
        Authorization: GHL_API_KEY,               // <-- Must include 'Bearer' prefix
        'Content-Type': 'application/json',
        'Accept': 'application/json',             // <-- Tells server to return JSON
        'Version': '2021-07-28'                   // <-- Required by GHL API
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to fetch products',
        error: err.message
      })
    };
  }
};
