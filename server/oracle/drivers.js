let oracledb = require('oracledb');

// release connection after fetching all the data needed
let doRelease = function (connection)
{
  connection.close(
    function(err)
    {
      if (err) { console.error(err.message); }
    });
}

let doClose = function (connection, resultSet)
{
  resultSet.close(
    function(err)
    {
      if (err) { console.error(err.message); }
      doRelease(connection);
    });
}

// general oracle query
oracleQuery = (query) => {
  
  const connection = Promise.await(oracledb.getConnection({
        user: Meteor.settings.private.oracleDB.user,
        password: Meteor.settings.private.oracleDB.password,
        connectString: Meteor.settings.private.oracleDB.connectString
      }));

  // console.log(`[OracleQuery] ${query}`)

  // start timing
  let start_proc = Date.now()

  const result = Promise.await(connection.execute(`${query}`,
  [],
    {
      outFormat: oracledb.OBJECT,
      resultSet: true
     },
  ))

  const resultSet = result.resultSet
  let queryingPro = true
  let queryingResult = []
  // while loop breaks when there is no more data in resultset, however the while will run once more to break it, therefore the counter is init at -1
  let counter = -1

  while (queryingPro) {
    let singleRow = Promise.await(result.resultSet.getRow())
    if (singleRow) {
      // return query result
      queryingResult.push(singleRow)

    } else {
      queryingPro = false
    }
    counter += 1
  }

  let end_proc = Date.now()
  let proc_duration = end_proc - start_proc

  let message = `Students fetched: ${queryingResult.length}, process took ${proc_duration}ms`

  console.log(message)

  doClose(connection, resultSet);

  return queryingResult

}

// pull all file update
pullLastEditDate = (lcenterCode, batchNo) => {

  queryPara = `${lcenterCode}${batchNo}%`

  query = `SELECT * FROM JW_FILEUPLOAD a WHERE a.filetype='zp' AND studentcode LIKE '${queryPara}'`

  return oracleQuery(query)

}

// check single upload file
checkPictureLastDate = (studentId) => {
  query = `SELECT * FROM JW_FILEUPLOAD a WHERE a.filetype='zp' AND studentcode='${studentId}'`

  result = oracleQuery(query)

  if ( result.length == 1 ) {
    return result[0]
  } else {
    console.log(`[checkPictureLastDate] Result doesnt match`)
  }

}
