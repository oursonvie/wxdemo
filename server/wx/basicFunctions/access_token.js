appid = Meteor.settings.private.appid
secret = Meteor.settings.private.secret

getAccessToken = () => {
  PromiseHTTPCall('get',`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
  .then( res => {

    data = res.data
    data.createdAt = new Date

    AccessTokens.insert(data)

    return res.data
  })
  .catch( err => {
    console.log(err)
  })
}

accessTokens = () => {
  token = AccessTokens.find({}, {sort:{createdAt:-1},limit:1}).fetch()
  return token[0].access_token
}
