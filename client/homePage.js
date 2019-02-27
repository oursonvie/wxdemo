Template.homePage.onCreated(function() {

  // init session
  Session.set('wx_res', false)

  var code = FlowRouter.getQueryParam("code");

  if (code) {
    PromiseMeteorCall('oauth_token', code)
    .then( res => {

      Session.set('wx_res', res)

      // PromiseMeteorCall('displayToBackEnd', res)

      let self = this;
      self.autorun(function() {
        // sub to allTeachers
        self.subscribe('studentPub', res.openid)
      })


    })
    .catch( err => {
      alert(err)
      console.log(err)
    })
  }

});


Template.homePage.helpers({
  wx_res: function() {
     return Session.get('wx_res')
  },
  studentAccount: function() {
    return Students.findOne()
  }
});

Template.homePage.events({
  'click .btn-unbound': function() {
    PromiseMeteorCall('unbondWX', this.openid)
    .then(res => {
      alert(res)
    })
    .catch( err => {
      alert(err)
    })
  }
})
