export default function handler(req, res) {
  const { id, action } = req.query;
  
  if (!id) return res.status(400).json({error: 'need id'});

  if (action === 'register' || req.url.includes('register')) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return res.status(200).json({ok: true, id, ip});
  }

  if (action === 'find' || req.url.includes('find')) {
    return res.status(200).json({msg: 'find endpoint'});
  }

  res.status(200).json({ok: true, msg: 'signal server running'});
}
