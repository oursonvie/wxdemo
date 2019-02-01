// get customer service ID

getCurrentCustomerServicesList = () => {
  try {
    res = Promise.await(PromiseHTTPCall('GET', `https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=${accessTokens()}`))
    return res.data
  } catch (err) {
    console.log(err)
  }
}
