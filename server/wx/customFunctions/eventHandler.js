eventHandler = (bodyContent) => {

  if ( bodyContent.EventKey == 'REDIRECT_CHAT' ) {

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
