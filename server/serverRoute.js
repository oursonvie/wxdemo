// add body praser for xml
var bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);

Picker.middleware( bodyParser.xml() );


// route for wx validation
Picker.route('/callback', function(params, req, res, next) {
  let body = params.query;
  console.log(`[Request Methods] ${req.method}`)
  // console.log(req.headers)

  // validate if message is coming from wx
  if ( valideWX(body.nonce, body.timestamp, body.signature) ) {

    // xml body
    // write message into db
    if (req.body && req.body.xml) {
      let bodyContent = req.body.xml


      // write into DB
      Messages.insert(bodyContent)

      console.log(bodyContent)
    }

    // response to wx server
    res.end(body.echostr)
  } else {
    res.end('err')
  }
});
