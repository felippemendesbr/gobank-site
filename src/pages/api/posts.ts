export default async function handler(req: any, res: any) {
  const { page = 1, per_page = 8 } = req.query;

  try {
    const response = await fetch(
      `https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed=true&per_page=${per_page}&page=${page}`,
    );

    const contentType = response.headers.get('content-type') || '';

    if (!response.ok || !contentType.includes('application/json')) {
      return res.status(response.status || 502).json({ error: 'Erro ao buscar posts do WordPress' });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Erro no proxy:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
