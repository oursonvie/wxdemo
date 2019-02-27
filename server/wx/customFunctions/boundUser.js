Meteor.methods({
  boundUser:function(username, password, openid){
     // need bounding methods below
     targetStudent = oracleStudentLookup(username)

     if ( targetStudent && password == targetStudent.PASSWORD ) {

       result = Students.upsert({LOGINNAME:targetStudent.LOGINNAME},
         {$set:{
           studentCode: targetStudent.STUDENTCODE,
           openid: openid,
           name: targetStudent.REALNAME,
           createdAt: new Date,
           baseInfo: targetStudent
         }}
       )

       console.log(`[Upsert Student] ${JSON.stringify(result)}`)

       bondLog(username, openid, 'bound')

       return `绑定成功`
     } else {
       return `绑定失败`
     }

  },
  unbondWX: function(openid) {
    targetStudent = Students.findOne({openid:openid})
    result = Students.remove({openid:openid})
    if (result == 1) {

      bondLog(targetStudent.username, targetStudent.openid, 'unbound')

      return `解绑成功`
    } else {
      return `解绑错误`
    }


  }
});
