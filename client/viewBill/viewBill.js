Template.viewBill.onCreated(function() {

  Session.set('studentFees',false)

  // start sub after update
  PromiseMeteorCall('queryFees', Session.get('wx_res').openid)
  .then( res => {
    Session.set('studentFees',res)

    // PromiseMeteorCall('displayToBackEnd', res)
  })
});


Template.viewBill.helpers({
  studentBill: function() {
    return Session.get('studentFees')
  },
  formatDate: function(date) {
    return moment(date).format('YYYY-DD-MM HH:mm:ss')
  }
});
