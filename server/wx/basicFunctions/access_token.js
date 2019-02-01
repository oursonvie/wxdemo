appid = Meteor.settings.private.appid
secret = Meteor.settings.private.secret

getAccessToken = () => {
  PromiseHTTPCall('get',`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
  .then( res => {

    data = res.data
    data.createdAt = new Date

    AccessTokens.insert(data)

    return data
  })
  .catch( err => {
    console.log(err)
  })
}

accessTokens = () => {
  token = AccessTokens.find({}, {sort:{createdAt:-1},limit:1}).fetch()
  if ( AccessTokens.find({}, {sort:{createdAt:-1},limit:1}).count() != 0 ) {
    return token[0].access_token
  } else {
    res = Promise.await(PromiseHTTPCall('get',`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`))

    data = res.data
    data.createdAt = new Date

    AccessTokens.insert(data)

    console.log(res.data)

    return res.data.access_token
  }

}
