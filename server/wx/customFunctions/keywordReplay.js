keywordReplay = (bodyContent) => {

  if ( bodyContent.Content[0].includes('绑定') ) {

    replay = {
      "ToUserName": bodyContent.FromUserName,
      "FromUserName": bodyContent.ToUserName,
      "CreateTime": moment().unix(),
      "MsgType": "text",
      "Content": oauthEnterPoint()
    }

    return replay

  } else {
    return false
  }
}
