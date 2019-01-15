keywordReplay = (bodyContent) => {

  console.log(bodyContent.Content)
  console.log(bodyContent.Content.includes('绑定'))

  if ( bodyContent.Content.includes('绑定') ) {

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
