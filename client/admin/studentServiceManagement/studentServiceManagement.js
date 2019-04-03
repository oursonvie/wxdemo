Template.studentServiceManagement.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('studentPubAll')
    self.subscribe('CustomService')
  })

});

Template.studentServiceManagement.helpers({
  students: function() {
    return Students.find()
  },
  batchNumber: function() {
    return this.baseInfo.STUDENTCODE.slice(8,12)
  },
  kfListOption: function() {
    kfRawList = CustomService.find({},{fields:{'kf_info.kf_account':1, 'kf_info.kf_nick':1}}).fetch()

    selected = this.customService

    optionList = ''

    _.forEach(kfRawList, function(item) {
      if (item.kf_info.kf_account == selected) {
        optionList += `<option value="${item.kf_info.kf_account}" selected="true">${item.kf_info.kf_nick}</option>`
      } else {
        optionList += `<option value="${item.kf_info.kf_account}">${item.kf_info.kf_nick}</option>`
      }

    })

    return optionList
  }
})

Template.studentServiceManagement.events({
  'change #customServiceSelect': function(event) {
    option = event.target.value

    PromiseMeteorCall('changeCustomService', this._id, option)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
})
