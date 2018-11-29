// create menu
let creatMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=`

creatMenuUrlwithToken = () => {
  return `${creatMenuUrl}${accessTokens()}`
}

oauth_enter_point = encodeURIComponent('http://1060bf9a.ngrok.io')

oauth_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${oauth_enter_point}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`

menu = {
  "button":[
    {
         "type":"view",
         "name":"绑定账号",
         "url":`${oauth_url}`
     },
     {
          "name":"菜单",
          "sub_button":[
          {
              "type":"view",
              "name":"搜索",
              "url":"http://www.soso.com/"
           },
           {
              "type":"click",
              "name":"赞你妹",
              "key":"V1001_GOOD"
           }]
      }]
}

createMenu = () => {
  PromiseHTTPCall('POST', creatMenuUrlwithToken(), {data:menu})
  .then( res => {
    if ( res.data.errcode == 42001 ) {
      token = getAccessToken().access_token
      PromiseHTTPCall('POST', token, {data:menu})
    }
    console.log(res)
  })
  .catch( err => {
    console.log(err)
  })
}
