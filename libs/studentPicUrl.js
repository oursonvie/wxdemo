xueliStudentPic = (sid) => {

  let baseurl = 'http://mxueli.xjtudlc.com/Upload/StudentPicture/10698/'

  let batchid = sid.slice(8,12)
  let lcenter = sid.slice(5,8)

  if (batchid.length == 0 || lcenter.length == 0) {
    throw new Meteor.Error('invalid input', 'invalid studentID');
  } else {
    //convert sid into pic url
    let zpurl = baseurl + 'zp' + '/' + batchid + '/' + lcenter + '/' + 'zp' + sid + '.jpg'
    let sfpzurl = baseurl + 'sfzp' + '/' + batchid + '/' + lcenter + '/' + 'sfzp' + sid + '.jpg'

    return zpurl || sfpzurl
  }

}
