// create menu
let creatMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=`

creatMenuUrlwithToken = () => {
  return `${creatMenuUrl}${accessTokens()}`
}

menu = {
  "button":[
    {
         "type":"click",
         "name":"今曲",
         "key":"V1001_TODAY_MUSIC"
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

creatMenu = () => {
  PromiseHTTPCall('POST', creatMenuUrlwithToken(), {data:menu})
  .then( res => {
    console.log(res)
  })
  .catch( err => {
    console.log(err)
  })
}
