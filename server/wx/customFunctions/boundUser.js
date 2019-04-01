Meteor.methods({
  boundUser:function(certno, name, openid){
     // need bounding methods below
     targetStudent = oracleStudentLookup(certno)

     // check if student been bound already
     if ( Students.find({'baseInfo.CERTIFICATENO': certno}).count() == 0) {
       // check student password
       if ( targetStudent && name == targetStudent.REALNAME ) {

         result = Students.upsert({studentCode:targetStudent.STUDENTCODE},
           {$set:{
             openid: openid,
             name: targetStudent.REALNAME,
             createdAt: new Date,
             baseInfo: targetStudent,
             certno: certno
           }}
         )

         console.log(`[Upsert Student] ${JSON.stringify(result)}`)

         bondLog(certno, name, openid, 'bound')

         return `绑定成功`
       } else {
         return `绑定失败`
       }
     } else {
       return `学生已被绑定，请先在原微信账号解绑再绑定`
     }



  },
  unbondWX: function(openid) {
    targetStudent = Students.findOne({openid:openid})
    result = Students.remove({openid:openid})
    if (result == 1) {

      bondLog(targetStudent.certno, targetStudent.name, targetStudent.openid, 'unbound')

      return `解绑成功`
    } else {
      return `解绑错误`
    }


  }
});
