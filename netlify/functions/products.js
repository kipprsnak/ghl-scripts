const response = await fetch('https://rest.gohighlevel.com/v1/products', {
  method: 'GET',
  headers: {
    Authorization: GHL_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Version: '2021-07-28'
  }
});
