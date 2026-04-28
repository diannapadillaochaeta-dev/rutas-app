const BIN_ID  = '69f10b0faaba8821974b4628';
const API_KEY = '$2a$10$qEQT0m2ABbL2j6J8QNfRzO4tNUHAuGAgCAVDdbM2VHyzXNbWRdz2K';
const BIN_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      const res = await fetch(BIN_URL + '/latest', {
        headers: { 'X-Master-Key': API_KEY, 'X-Bin-Meta': 'false' }
      });
      const text = await res.text();
      return { statusCode: 200, headers, body: text };
    }

    if (event.httpMethod === 'PUT') {
      const res = await fetch(BIN_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
        body: event.body
      });
      const text = await res.text();
      return { statusCode: res.status, headers, body: text };
    }

    return { statusCode: 405, headers, body: '{"error":"Method not allowed"}' };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
