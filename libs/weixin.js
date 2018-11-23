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
