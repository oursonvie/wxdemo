Meteor.methods({
  queryFees:function(openId){
    if ( Students.find({openid:openId}).count() == 1 ) {
      // find bond student
      student = Students.findOne({openid:openId})
      // update student score into db
      console.log(`[Query Fees] ${openId}`)
     return oralceScoreFees(student.studentCode)
   } else {
     console.log(`[Query Fees Error] ${openId}`)
     throw new Meteor.Error('001', "请先绑定账号");
   }
  }
});
