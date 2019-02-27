oracleStudentLookup = (loginID) => {
  query = `SELECT LOGINNAME, PASSWORD, STUDENTCODE, REALNAME, SEX, BIRTHDATE, LEVELID, LEVELNAME, CURRENTSPECIALITYID, CURRENTSPECIALITYNAME, STUDENTSTYLECODE, STUDENTSTYLE, LCENTERCODE, LCENTERNAME FROM STUDENT_V WHERE LOGINNAME = '${loginID}'`
  if (oracleQuery(query)[0]) {
    return oracleQuery(query)[0]
  } else {
    console.log(`Cannot find student ${loginID}`)
  }
}
