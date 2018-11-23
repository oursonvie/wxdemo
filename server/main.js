// route for wx validation
Picker.route('/callback', function(params, req, res, next) {
  var body = params.query;

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
