Template.studentServiceManagement.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('studentPubAll')
  })

});

Template.studentServiceManagement.helpers({
  students: function() {
    return Students.find()
  },
  batchNumber: function() {
    return this.baseInfo.STUDENTCODE.slice(8,12)
  }
})
