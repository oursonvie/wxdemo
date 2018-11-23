let appid = Meteor.settings.private.appid
let secret = Meteor.settings.private.secret

getAccessToken = () => {
  PromiseHTTPCall('get',`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
  .then( res => {
    console.log(res)

    data = res.data
    data.createdAt = new Date

    AccessTokens.insert(data)


  })
  .catch( err => {
    console.log(err)
  })
}
