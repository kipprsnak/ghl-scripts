exports.handler = async function (event, context) {
  const GHL_API_KEY = process.env.GHL_API_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      GHL_API_KEY_PRESENT: !!GHL_API_KEY,
      GHL_API_KEY_START: GHL_API_KEY ? GHL_API_KEY.substring(0, 20) : 'undefined',
      GHL_API_KEY_LENGTH: GHL_API_KEY ? GHL_API_KEY.length : 0
    })
  };
};
