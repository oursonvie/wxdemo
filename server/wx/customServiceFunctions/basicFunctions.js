// get customer service ID

getCurrentCustomerServicesList = () => {
  PromiseHTTPCall('GET', `https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=${accessTokens()}`)
  .then( res => {
    console.log(res.content)
  })
  .catch(err => {
    console.log(err)
  })
  return
}
