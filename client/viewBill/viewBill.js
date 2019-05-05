Template.viewBill.onCreated(function() {
  Session.set('studentFees', false)

  var code = FlowRouter.getQueryParam("code");

  if (code) {
    PromiseMeteorCall('oauth_token', code)
      .then(res => {

        if (res && res.openid) {
          // start sub after update
          PromiseMeteorCall('queryFees', res.openid)
            .then(res => {
              Session.set('studentFees', res)
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
  }
});
