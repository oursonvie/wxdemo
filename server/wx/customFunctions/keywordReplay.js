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

  } else if ( bodyContent.Content[0].includes('转接客服') ) {

    // need to check account before transfor customservice
    console.log(`转接${bodyContent.FromUserName}，专属客服`)

    replay = {
      "ToUserName": bodyContent.FromUserName,
      "FromUserName": bodyContent.ToUserName,
      "CreateTime": moment().unix(),
      "MsgType": "transfer_customer_service",
      "TransInfo": {
        KfAccount: "kf2001@xdrdedu"
      }
    }

    return replay

  } else {
    return false
  }
}
