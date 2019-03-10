bondLog = (certno, name, openid, bound) => {
  newObj = {
    certno: certno,
    name: name,
    openid: openid,
    action: bound,
    createdAt: new Date
  }
  result = BoundLogs.insert(newObj)
  console.log(`[BondLog Insert] ${result}`)
}
