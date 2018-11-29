// create menu
let creatMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=`

creatMenuUrlwithToken = () => {
  return `${creatMenuUrl}${accessTokens()}`
}

menu = {
  "button":[
    {
         "type":"view",
         "name":"绑定账号",
         "url":`https://1060bf9a.ngrok.io/`
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
