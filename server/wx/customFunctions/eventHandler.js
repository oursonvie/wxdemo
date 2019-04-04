eventHandler = (bodyContent) => {

  if (bodyContent.EventKey == 'REDIRECT_CHAT') {

    // check student customservice if exist rediect to him/her
    openId = bodyContent.FromUserName[0]

    student = Students.findOne({
      openid: openId
    })

    // get kflist array
    kfList = CustomService.find({}, {
      fields: {
        'kf_info.kf_account': 1
      }
    }).fetch()

    kfListArr = ObjArrCoverter(kfList, 'kf_info', 'kf_account')

    // need to check account before transfor customservice
    console.log(`转接: ${bodyContent.FromUserName}，专属客服至: ${student.customService}`)

    if (student.customService && kfListArr.includes(student.customService)) {
      replay = {
        "ToUserName": bodyContent.FromUserName,
        "FromUserName": bodyContent.ToUserName,
        "CreateTime": moment().unix(),
        "MsgType": "transfer_customer_service",
        "TransInfo": {
          KfAccount: student.customService
        }
      }
      return replay
    } else {
      replay = {
        "touser": openId,
        "msgtype": "text",
        "text": {
          "content": "尚未绑定客服，请联系班主任"
        }
      }
    }


  } else {
    return false
  }
}
