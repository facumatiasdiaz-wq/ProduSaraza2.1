exports.handler = async function(event) {
  const { tipo, fecha } = event.queryStringParameters || {};
  let url;
  if(tipo === 'live'){
    url = 'https://v3.football.api-sports.io/fixtures?league=1&season=2026&live=all';
  } else if(tipo === 'hoy' && fecha){
    url = `https://v3.football.api-sports.io/fixtures?league=1&season=2026&date=${fecha}`;
  } else {
    return { statusCode: 400, body: JSON.stringify({error:'Parámetro inválido'}) };
  }
  try {
    const res = await fetch(url, {
      headers: { 'x-apisports-key': 'd2beae3eb7a85a5ebfacdbc01cc85963' }
    });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};
