Template.userInput.events({
  "click .weui-btn_primary": function(event, template){

    try {
      certno = document.getElementById('certno').value
      name = document.getElementById('name').value
      openid = Session.get('wx_res').openid

      if (certno && name && openid) {

        PromiseMeteorCall('boundUser', certno, name, openid)
        .then( res => {
          weui.alert(res)
        })
        .catch( err => {
          console.log(err)
        })

      } else {
        alert(`请认真填写用户名和密码`)
      }


    } catch (err) {
      alert(err)
    }

  }
});
