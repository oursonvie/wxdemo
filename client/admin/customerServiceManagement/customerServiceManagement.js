Template.customerServiceManagement.onCreated(function() {

  // update current custom service data in DB
  PromiseMeteorCall('updateCustomServiceList')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

  // subscribe to custom service data
  var self = this;
  self.autorun(function() {
    self.subscribe('CustomService')
  })

});
