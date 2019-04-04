// function to create new menu on server
sendToOpenId = (openid, content) => {

  content = {
    "touser":openid,
    "msgtype":"text",
    "text":
    {
         "content": content
    }
}

  PromiseHTTPCall('POST', `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${getAccessToken()}`, {data:content})
  .then( res => {
    console.log(res)
  })
  .catch( err => {
    console.log(err)
  })
}
