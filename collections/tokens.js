AccessTokens = new Mongo.Collection('accesstokens');

AccessTokens.allow({
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

AccessTokens.deny({
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
