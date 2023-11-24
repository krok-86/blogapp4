const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');//delete Bearer token
if (token) {
try { 
  const decoded = jwt.verify(token, 'secret123')
  req.userId = decoded._id;
  next();
} catch (e) {
res.status(403).json(e);
}
} else {
  res.status(403).json({
     message: 'not access allowed'
  })
}
}
module.exports=checkAuth;