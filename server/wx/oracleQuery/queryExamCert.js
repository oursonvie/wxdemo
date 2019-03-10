Meteor.methods({
  queryExamCert:function(certno, name) {
    url = `https://mxueli.xjtudlc.com/Get_MATRICULATION_INFO.aspx?name=${name}&cid=${certno}`
    return url
  }
});
