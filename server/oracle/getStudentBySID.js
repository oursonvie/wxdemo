oracleStudentLookup = (loginID) => {
  query = `SELECT * FROM OEMS.STUDENTBASEINFO WHERE LOGINNAME = '${loginID}'`
  if (oracleQuery(query)[0]) {
    return oracleQuery(query)[0]
  } else {
    console.log(`Cannot find student ${loginID}`)
  }
}
