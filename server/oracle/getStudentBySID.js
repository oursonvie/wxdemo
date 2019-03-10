oracleStudentLookup = (certno) => {
  query = `SELECT LOGINNAME, PASSWORD, STUDENTCODE, REALNAME, SEX, CERTIFICATENO, BIRTHDATE, LEVELID, LEVELNAME, CURRENTSPECIALITYID, CURRENTSPECIALITYNAME, STUDENTSTYLECODE, STUDENTSTYLE, LCENTERCODE, LCENTERNAME FROM STUDENT_V WHERE CERTIFICATENO = '${certno}'`

  result = oracleQuery(query)[0]
  if (result) {
    return result
  } else {
    console.log(`Cannot find student ${certno}`)
  }
}

oralceScoreQuery = (studentcode) => {
  query = `select a.STUDENTCODE, h.NAME COURSENAME, g.NAME COUSORTNAME, f.NAME COUATTRINAME, e.CREDITHOUR, c.NAME COURSESTATNAME, Nvl(b.ShowPeaceTimeGrade,a.PeaceTimeGrade) As ShowPeaceTimeGrade, b.ShowEXAMGRADE,a.ShowFINALGRADE from JW_STUDENT_COURSE a,JW_STUDENT_ALLEXAMGRADE b, dic_cousestatus c, JW_TPLAN_COURSEINFO e,DIC_COURSEATTRIBUTE f, DIC_COURSESORT g, JW_COURSE h where a.STUCOURSEID = b.STUCOURSEID(+) and a.ExamGradeID = b.ID(+) and a.COURSESTAT = c.COURSESTATUS and a.TEACHPLANID = e.TEACHPLANID and a.COURSEID = e.COURSEID and e.COUATTRICODE = f.COUATTRICODE and e.COUSORTCODE = g.COUSORTCODE and e.COURSEID = h.COURSEID and a.studentcode=${studentcode}`

  result = oracleQuery(query)

  if (result) {
    // result filter
    newResult = []
    _.forEach(result, function(course) {

      if (course.SHOWPEACETIMEGRADE != null || course.SHOWEXAMGRADE != null || course.SHOWFINALGRADE != null) {
        resultObj = {
          coursename: course.COURSENAME,
          peacetimegrade:course.SHOWPEACETIMEGRADE,
          examgrade:course.SHOWEXAMGRADE,
          finalgrade:course.SHOWFINALGRADE,
          coursestate:course.COURSESTATNAME
        }
        newResult.push(resultObj)
      }
    })

    return newResult
  } else {
    console.log(`No score for student ${studentcode}`)
  }
}

oralceScoreFees = (studentcode) => {
  query = `SELECT  a.STUDENTCODE,  b.NAME SUBJECTNAME, a.OPERATEDATE, a.PAY, a.WITHDRAW, a.SUBTRACT,a.REFUNDMENT, a.REMARK, x.projectname subtractname, y.projectname withdrawname,c.name refundmentreasonname
 FROM FY_STUACCOUNT_TUITION a, FY_SUBJECT b,dic_refundmentreason c,
 (SELECT a.accountid,b.projectid,b.projectname FROM FY_STUACCOUNT_TUITION a, FY_SUBTRACT_DETAIL b WHERE a.recordid=b.recordid and a.subtract IS NOT NULL and a.subjectid=1 and a.STUDENTCODE='${studentcode}') x, (SELECT a.accountid,b.projectid,b.projectname FROM FY_STUACCOUNT_TUITION a, FY_WITHDRAW_DETAIL b WHERE a.recordid=b.recordid and a.withdraw IS NOT NULL and a.subjectid=1 and a.STUDENTCODE='${studentcode}') y
 where a.SUBJECTID=b.SUBJECTID and a.refundmentreasonid=c.refundmentreasonid(+) and a.ACCOUNTID=x.ACCOUNTID(+) and a.ACCOUNTID=y.ACCOUNTID(+) and a.STUDENTCODE='${studentcode}'`

  result = oracleQuery(query)

  if (result) {
    // result filter
    newResult = []
    _.forEach(result, function(fees) {

      if (fees.PAY != null) {
        obj = {
          subjectname: fees.SUBJECTNAME,
          operatedate: fees.OPERATEDATE,
          action: '付款',
          amount: fees.PAY,
          remark: fees.REMARK
        }
        newResult.push(obj)
      } else if (fees.SUBTRACT != null) {
        obj = {
          subjectname: fees.SUBJECTNAME,
          operatedate: fees.OPERATEDATE,
          action: '扣款',
          amount: fees.SUBTRACT,
          remark: fees.SUBTRACTNAME
        }
        newResult.push(obj)
      } else {
        console.log(`[unkown obj]`)
        console.log(obj)
      }

    })

    return newResult
  }
}
