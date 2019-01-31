Meteor.methods({
  oauth_token:function(code){
     url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`

     try {
       res = Promise.await(PromiseHTTPCall('get',url))

       // make sure res is valid
       if ( res.statusCode == 200 ) {

         // parse res content
         if ( res.content ) {
           response = JSON.parse(res.content)
           return response

         } else {
           console.log('no content')
           console.log(res)
         }

       } else {
         console.log('response code not equal 200')
         console.log(res)
       }

     } catch(err) {
       console.log(`http request error`)
       console.log(err)
     }

  }
});

// generate oauthUrl
oauthEnterPoint = () => {
  oauth_enter_point = encodeURIComponent(Meteor.settings.private.wechatServerAddress)
  oauth_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${oauth_enter_point}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  return `${oauth_url}`
}
