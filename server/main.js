// add body praser
var bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);

Picker.middleware( bodyParser.xml() );



// route for wx validation
Picker.route('/callback', function(params, req, res, next) {
  let body = params.query;
  console.log(`[Request Methods] ${req.method}`)
  // console.log(req.headers)

  // xml body
  if (req.body && req.body.xml) {
    let bodyContent = req.body.xml
    console.log(bodyContent)
  }



  if ( valideWX(body.nonce, body.timestamp, body.signature) ) {
    res.end(body.echostr)
  } else {
    res.end('err')
  }
});

valideWX = (nonce, timestamp, signature) => {

  token = 'tonny'
  tmpArr = [token, nonce, timestamp].sort()
  tmpArr = tmpArr.toString().replace( /,/g, "" )

  result = CryptoJS.SHA1(tmpArr).toString()

  if (result == signature) {
    return true
  } else {
    return false
  }

}
