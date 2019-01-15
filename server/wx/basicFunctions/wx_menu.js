

// create menu
let creatMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=`

creatMenuUrlwithToken = () => {
  return `${creatMenuUrl}${accessTokens()}`
}

generateMenu = () => {
  return `
    {
      "button":[
        {
             "type":"view",
             "name":"绑定账号",
             "url": ${oauthEnterPoint()}
         },
         {
              "name":"菜单",
              "sub_button":[
              {
                  "type":"view",
                  "name":"学生中心",
                  "url":"http://www.bbs-step.com/"
               }
             ]
          }]
    }
  `
}

// function to create new menu on server
createMenu = () => {
  PromiseHTTPCall('POST', creatMenuUrlwithToken(), {data:generateMenu()})
  .then( res => {

    console.log(res)

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
