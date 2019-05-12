Template.viewBill.onCreated(function() {
  Session.set('studentFees', false)
  Session.set('wx_res', false)

  var code = FlowRouter.getQueryParam("code");

  if (code) {
    PromiseMeteorCall('oauth_token', code)
      .then(res => {

        Session.set('wx_res', res)
        
        if (res && res.openid) {
          // sub to student info
          let self = this;
          self.autorun(function() {
            self.subscribe('studentPub', res.openid)
          })

          // start sub after update
          PromiseMeteorCall('queryFees', res.openid)
            .then(res => {
              Session.set('studentFees', res)
            })
            .catch(err => {
              alert(err.message)
            })
        } else {
          alert(JSON.stringify(res))
        }

      })
      .catch(err => {
        alert(err)
        console.log(err)
      })
  }

});


Template.viewBill.helpers({
  studentBill: function() {
    return Session.get('studentFees')
  },
  formatDate: function(date) {
    return moment(date).format('YYYY-DD-MM HH:mm:ss')
  },
  studentAccount: function() {
    return Students.findOne()
  },
  wx_res: function() {
     return Session.get('wx_res')
  }
});
