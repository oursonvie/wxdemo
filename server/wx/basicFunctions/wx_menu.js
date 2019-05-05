// create menu
let creatMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=`

creatMenuUrlwithToken = () => {
  return `${creatMenuUrl}${accessTokens()}`
}

generateMenu = () => {
  return menu = {
    "button": [{
        "type": "view",
        "name": "学生中心",
        "url": "http://www.bbs-step.com/"
      },
      {
        "type": "click",
        "name": "人工客服",
        "key": "REDIRECT_CHAT"
      },
      {
        "name": "个人中心",
        "sub_button": [
          {
            "type": "view",
            "name": "绑定信息",
            "url": oauthEnterPoint()
          },
          {
            "type": "view",
            "name": "缴费信息",
            "url": oauthRedirectTo(`${Meteor.settings.public.wechatServerAddress}/student/viewbill`)
          },
          {
            "type": "view",
            "name": "考试成绩",
            "url": oauthRedirectTo(`${Meteor.settings.public.wechatServerAddress}/student/viewscore`)
          }
        ]
      }
    ]
  }
}

backupMenu = () => {
  return menu = {
    "button": [{
      "type": "view",
      "name": "学生中心",
      "url": "http://www.bbs-step.com/"
    }]
  }
}


// function to create new menu on server
createMenu = () => {
  PromiseHTTPCall('POST', creatMenuUrlwithToken(), {
      data: generateMenu()
    })
    .then(res => {
      if (res.data.errcode == 42001) {
        token = getAccessToken().access_token
        PromiseHTTPCall('POST', token, {
          data: menu
        })
      }
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

// query current menu API
currentMenu = () => {
  PromiseHTTPCall('GET', `https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessTokens()}`)
    .then(res => {
      console.log(res.content)
    })
    .catch(err => {
      console.log(err)
    })
}
