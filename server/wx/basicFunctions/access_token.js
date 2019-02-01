appid = Meteor.settings.private.appid
secret = Meteor.settings.private.secret

getAccessToken = () => {
  try {
    res = Promise.await(PromiseHTTPCall('get',`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`))

    data = res.data
    data.createdAt = new Date

    // write token into DB
    AccessTokens.insert(data)

    return data.access_token
  } catch (err) {
    console.log(err)
  }

}

accessTokens = () => {
  // get least access token
  token = AccessTokens.find({}, {sort:{createdAt:-1},limit:1}).fetch()

  // if there is no token in the system, get new one
  if ( AccessTokens.find({}, {sort:{createdAt:-1},limit:1}).count() != 0 ) {

    // check if token expired
    if (tokenExpire(token[0])) {

      return Promise.await(getAccessToken())

    } else {
      return token[0].access_token
    }
  } else {
    return Promise.await(getAccessToken())
  }

}

tokenExpire = (token) => {
  return moment().unix() > moment(token.createdAt).unix() + token.expires_in - 50
}
