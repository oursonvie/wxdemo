ObjArrCoverter = (list, key, anotherkey) => {
  result = []

  _.forEach(list, function(item) {
    result.push(item[key][anotherkey])
  })

  return result
}
