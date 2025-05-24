const fetch = require('node-fetch'); // only needed if Node < 18

exports.handler = async function (event, context) {
  const GHL_API_KEY = process.env.GHL_API_KEY;

  try {
    const response = await fetch('https://services.leadconnectorhq.com/products', {
      headers: {
        Authorization: GHL_API_KEY,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch products', error: err.message }),
    };
  }
};
