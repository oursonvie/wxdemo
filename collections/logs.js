BoundLogs = new Mongo.Collection('boundlogs');

BoundLogs.allow({
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

BoundLogs.deny({
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
