export default async function handler(req: any, res: any) {
  const { page = 1, per_page = 8 } = req.query;

  try {
    const response = await fetch(
      `https://admin.gobank.com.br/wp-json/wp/v2/posts?_embed&per_page=${per_page}&page=${page}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar posts do WordPress' });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
