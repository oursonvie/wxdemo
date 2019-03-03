Meteor.methods({
  queryScore:function(openId) {
     if ( Students.find({openid:openId}).count() == 1 ) {
       // find bond student
       student = Students.findOne({openid:openId})
       // update student score into db
       console.log(`[Query Score] ${openId}`)
      return oralceScoreQuery(student.studentCode)
    } else {
      console.log(`[Query Score Error] ${openId}`)
    }
  }
});
