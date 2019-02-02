CustomService = new Mongo.Collection('customservice');

CustomService.allow({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 }
});

CustomService.deny({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 }
});
