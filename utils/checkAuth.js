const jwt = require('jsonwebtoken')

const checkAurh = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');//delete Bearer token

  console.log(token)
  console.log(req.headers.authorization)
  
if (token) {
try {
  console.log('111');
  const decoded = jwt.verify(token, 'secret123')
  console.log('222');
  console.log(decoded);
  req.userId = decoded._id;
  next();
} catch (e) {
//   res.status(403).json({
//     message: 'not access allowed too'
// });
res.status(403).json(e);
}
} else {
  res.status(403).json({
     message: 'not access allowed'
  })
}
}
module.exports=checkAurh;