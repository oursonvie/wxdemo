bondLog = (username, openid, bound) => {
  newObj = {
    username: username,
    openid: openid,
    action: bound,
    createdAt: new Date
  }
  result = BoundLogs.insert(newObj)
  console.log(`[BondLog Insert] ${result}`)
}
