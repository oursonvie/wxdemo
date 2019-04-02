Template.cutomServiceOption.onCreated(function() {
  this.customOption = new ReactiveVar( false );
});

Template.cutomServiceOption.onRendered(function(){

  Template.instance().customOption.set(this.data.customService)

  console.log(Template.instance().customOption.get())

  document.querySelector('select#customServiceSelect').value = Template.instance().customOption.get()

  console.log(document.querySelector('select#customServiceSelect').value)


})

Template.cutomServiceOption.helpers({
  kfListOption: function() {
    kfRawList = CustomService.find({},{fields:{'kf_info.kf_account':1, 'kf_info.kf_nick':1}}).fetch()

    optionList = ''

    _.forEach(kfRawList, function(item) {
      optionList += `<option value="${item.kf_info.kf_account}">${item.kf_info.kf_nick}</option>`
    })

    return optionList
  }
});

Template.cutomServiceOption.events({
  'change #customServiceSelect': function() {
    option = document.querySelector('select#customServiceSelect').value

    PromiseMeteorCall('changeCustomService', this._id, option)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
});
