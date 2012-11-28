// Facebook Open Graph
// -----
// Wrapper for facebook open graph calls

// Dependencies
// -----
var request = require('request'),
    querystring = require('querystring')

// Local Variables
// ---
var graphUrl = 'https://graph.facebook.com',
    fb_access_token

// Helpers
// ---

// get a facebook url using some opengraph options
var getOpenGraphUrl = function(user_id,namespace,access_token,action,objectName,object,callback){
  var query = {access_token : access_token}
  if(objectName && object){
    query[objectName] = object
  } else {
    // object is optional, but our callback has moved
    callback = object
  }
  var uri = graphUrl + '/'+user_id+'/' + namespace + ':' + action + "?" + querystring.stringify(query)
  if(typeof callback === 'function'){
    callback(uri)
  } else {
    return uri
  }
}

// parse a facebook response
// (callback first, as it's curried in)
var parseResponse = function(callback,err,response){
  if(err || !response){
    callback(err || "No response.")
  } else {
    try {
      var body = JSON.parse(response.body)
    } catch(e){
      err = new Error("Non-JSON response returned.")
      var body = response.body
    }
    callback(null,body)
  }
}

// Open Graph Class
// ---
var OpenGraph = module.exports = function(namespace){
  this.namespace = namespace
}

// **Show**
OpenGraph.prototype.show = function(user_id,access_token,action,callback){
  var uri = getOpenGraphUrl(user_id,this.namespace,access_token,action)
  request.get({
    uri : uri
  },parseResponse.bind(this,callback))
}

// **Publish**
OpenGraph.prototype.publish = function(user_id,access_token,action,objectName,object,options,callback){
  var uri = getOpenGraphUrl(user_id,this.namespace,access_token,action),
      form = {},
      callbackFn = callback || options

  if (callback && options === true) {
    // https://developers.facebook.com/docs/technical-guides/opengraph/explicit-sharing/
    form['fb:explicitly_shared'] = true
  } else {
    // use passed options as form for more customization
    form = options
  }

  form[objectName] = object
  request.post({
    uri : uri,
    form : form
  },parseResponse.bind(this,callbackFn))
}

// **Delete**
OpenGraph.prototype.delete = function(access_token,action_id){
  var uri = graphUrl + '/{' + action_id + '}?access_token=' + access_token
  request.delete({
    uri : uri
  },parseResponse.bind(this,callback))
}

// **Alias**
// just for fun, allow aliasing of commands (in case show, publish, delete doesn't work for you)
OpenGraph.prototype.alias = function(command,action){
  if(typeof this[action] == 'function'){
    this[command] = this[action]
  }
}
