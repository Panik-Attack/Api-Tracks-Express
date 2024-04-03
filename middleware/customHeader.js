const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === '123456') {
      next();
    } else {
      res.status(403);
      res.send({ error: 'API_KEY_NO_ES_CORRECTA' });
    }
  } catch (error) {
    res.status(403);
    res.send({ error: 'API_KEY_NO_ES_CORRECTA' });
  }
}