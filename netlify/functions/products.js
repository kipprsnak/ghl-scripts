const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const GHL_API_KEY = process.env.GHL_API_KEY;

  try {
    const response = await fetch('https://rest.gohighlevel.com/v1/products', {
      method: 'GET',
      headers: {
        Authorization: GHL_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Version: '2021-07-28'
      }
    });

    // Check for bad status code
    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: 'Non-200 response from GHL',
          status: response.status,
          body: errorText
        })
      };
    }

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
