function setCorsHeaders(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      // Stop preflight requests here
      return res.status(204).send('');
    }
  
    next();
  }
  
  module.exports = setCorsHeaders;
  