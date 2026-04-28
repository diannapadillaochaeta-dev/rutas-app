const { getStore } = require('@netlify/blobs');

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
    const store = getStore('rutas');

    if (event.httpMethod === 'GET') {
      const data = await store.get('historial', { type: 'json' });
      return { statusCode: 200, headers, body: JSON.stringify(data || { historial: [] }) };
    }

    if (event.httpMethod === 'PUT') {
      const payload = JSON.parse(event.body);
      await store.setJSON('historial', payload);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 405, headers, body: '{"error":"Method not allowed"}' };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
