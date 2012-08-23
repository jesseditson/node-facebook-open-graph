[![build status](https://secure.travis-ci.org/jesseditson/node-facebook-open-graph.png)](http://travis-ci.org/jesseditson/node-facebook-open-graph)
node-facebook-open-graph
========================

Ridiculously simple facebook open graph caller.


## Usage:

First:

    npm install facebook-open-graph

Then:

    var OpenGraph = require('facebook-open-graph'),
        openGraph = new OpenGraph('fb_app_namespace')

After that:

**show actions:**

    openGraph.show('some-user-id','some-access-token','action',function(err,response){
      // do stuff
    })

**publish action:**

    openGraph.publish('some-user-id','some-access-token','action','object','some-object-url',function(err,response){
      // do stuff
    })

**delete action:**

    openGraph.delete('some-access-token','some-action-id',function(err,response){
      // do stuff
    })

In all of the above, `err` is a native javascript error or `null`, and response is a native javascript `object` (parsed response from FB). 

You can use 'me' instead of a user, and provide their access token to publish to their own feed. Otherwise, provide an id, and either the users' access token or an app access token with the correct permissions.

## Bonus:

don't like using the word "publish" or whatever? Do what you want, homie:

    openGraph.alias('publish','BIRTH')
    openGraph.alias('delete','MURDER')

Now you can:

    openGraph.BIRTH('some-users-access-token','action','object','some-object-url',function(err,response){
      // whatever
    })
    openGraph.MURDER('some-users-access-token','some-action-id',function(err,response){
      // yeah, killed the fucker
    })