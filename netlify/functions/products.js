const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const GHL_API_KEY = process.env.GHL_API_KEY;

  try {
    const response = await fetch('https://services.leadconnectorhq.com/products', {
      method: 'GET',
      headers: {
        Authorization: GHL_API_KEY,                 // e.g., Bearer eyJhbGciOi...
        'Content-Type': 'application/json',
        Accept: 'application/json',                // ✅ Ensures the server returns JSON
        Version: '2021-07-28'                      // ✅ Required by GHL API
      }
    });

    // DEBUG: Try to parse raw body first
    const rawText = await response.text();

    // Log raw text back to browser so we can inspect it
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        rawBody: rawText
      })
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
