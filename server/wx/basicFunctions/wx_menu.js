// create menu
let creatMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=`

creatMenuUrlwithToken = () => {
  return `${creatMenuUrl}${accessTokens()}`
}

generateMenu = () => {
  return menu = {
      "button":[
        {
             "type":"view",
             "name":"学生中心",
             "url": "http://www.bbs-step.com/"
         }
       ]
    }
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

// query current menu API
currentMenu = () => {
  PromiseHTTPCall('GET', `https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessTokens()}`)
  .then( res => {
    console.log(res.content)
  })
  .catch(err => {
    console.log(err)
  })
}
