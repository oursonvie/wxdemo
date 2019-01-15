// add body praser for xml
var bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);

Picker.middleware( bodyParser.xml() );


// route for wx validation
Picker.route('/callback', function(params, req, res, next) {
  let body = params.query;
  // console.log(body)

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

      // keyword replay handler
      if (bodyContent.MsgType == 'text') {
        console.log(`[Incoming text message] from ${bodyContent.FromUserName}: [${bodyContent.Content}]`)

        keywordReplay(bodyContent.FromUserName, bodyContent.Content)

      } else {
        console.log( `${bodyContent.MsgType} from ${bodyContent.FromUserName}` )
      }

    }

    // response to wx server
    res.end(body.echostr)
  } else {
    res.end('err')
  }
});
