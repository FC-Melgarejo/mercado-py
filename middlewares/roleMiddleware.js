const verifySeller = (req, res, next) => {
    if (req.user.role !== 'vendedor') {
      return res.status(403).json({ error: 'Acceso restringido a vendedores' });
    }
    next();
  };
  
  module.exports = verifySeller;
  