// add body praser for xml
var bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);

// parser turn json into xml
var js2xmlparser = require("js2xmlparser");

Picker.middleware( bodyParser.xml() );


// route for wx validation
Picker.route('/callback', function(params, req, res, next) {
  let body = params.query;
  // console.log(body)

  // console.log(`[Request Methods] ${req.method}`)
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
        console.log(`[Incoming Text Message] from ${bodyContent.FromUserName}: [${bodyContent.Content}]`)

        replay = keywordReplay(bodyContent)

        // only replay when server has response
        if (replay) {
          xmlRes = js2xmlparser.parse("xml", replay)
          // console.log(xmlRes)
          // replay to post request
          res.end(xmlRes)
        }
      } else if (bodyContent.MsgType == 'event') {
        console.log(`[Incoming Event] from ${bodyContent.FromUserName}: [${bodyContent.EventKey}]`)

        reponse = eventHandler(bodyContent)

        if (reponse) {
          xmlRes = js2xmlparser.parse("xml", reponse)
          // console.log(xmlRes)
          // replay to post request
          res.end(xmlRes)
        }


      } else {
        console.log( `${bodyContent.MsgType} from ${bodyContent.FromUserName}` )
      }

    }

    // response to wx server
    // console.log(body.echostr)
    res.end(body.echostr)
  } else {
    res.end('err')
  }
});
