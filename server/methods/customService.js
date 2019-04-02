Meteor.methods({
  updateCustomServiceList: function() {
    try {
      res = Promise.await(getCurrentCustomerServicesList())

      _.forEach(res.kf_list, function(customerSevice) {

        result = CustomService.upsert(
          {kf_id:customerSevice.kf_id},
          {$set:{kf_info:customerSevice}}
        )
        console.log(`[Upsert Custom Service]: kf_id:${customerSevice.kf_id} ${JSON.stringify(result)}`)

      })

      return `CustomService list updated`
    } catch(err) {
      console.log(err)
    }
  },
  changeCustomService: function(id, option) {
    return Students.update({_id:id},{$set:{customService:option}})
  }
})
