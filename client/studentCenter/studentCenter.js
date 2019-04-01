import weui from 'weui.js';

Template.studentCenter.helpers({
  studentPic: function(sid) {
    return xueliStudentPic(sid)
  }
});

Template.studentCenter.events({
  'click .btn-unbound': function() {
    targetId = this.openid

    weui.confirm('确认解除微信绑定', function () {
      PromiseMeteorCall('unbondWX', targetId)
      .then(res => {
        weui.alert(res)
      })
      .catch( err => {
        alert(err)
      })
    }, function () {
        console.log('否')
    }, {
        title: '解除微信绑定'
    });


  }
})
