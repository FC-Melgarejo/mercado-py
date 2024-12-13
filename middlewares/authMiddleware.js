const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token requerido' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
