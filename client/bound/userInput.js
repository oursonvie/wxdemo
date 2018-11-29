Template.userInput.events({
  "click .btn": function(event, template){

    try {
      username = document.getElementById('username').value
      password = document.getElementById('password').value
      openid = Session.get('wx_res').openid

      if (username && password) {

        PromiseMeteorCall('boundUser', username, password, openid)
        .then( res => {
          console.log(res)
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
