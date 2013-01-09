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

    // enable fb:explicitly_shared
    var options = true;

    // ... or pass your own custom headers
    options = {
      'fb:explicitly_shared': true
    };

    // the options parameter may be omitted if you have nothing to put in there
    openGraph.publish('some-user-id','some-access-token','action','object','some-object-url',options,function(err,response){
      // do stuff
    })

**delete action:**

    openGraph.delete('some-access-token','some-action-id',function(err,response){
      // do stuff
    })

In all of the above, `err` is a native javascript error or `null`, and response is a native javascript `object` (parsed response from FB). 

You can use 'me' instead of a user, and provide their access token to publish to their own feed. Otherwise, provide an id, and either the users' access token or an app access token with the correct permissions.

## Support for fb:explicitly_shared

Sending explicitly_shared indicates that a user has explicitly chosen to have their action posted to their Facebook wall, giving it a more prominent position.

For more on this, see [How-To: Explicit Sharing](https://developers.facebook.com/docs/technical-guides/opengraph/explicit-sharing/)

## Bonus:

Don't like using the word "publish" or whatever? Do what you want, homie:

    openGraph.alias('publish','BIRTH')
    openGraph.alias('delete','MURDER')

Now you can:

    openGraph.BIRTH('some-users-access-token','action','object','some-object-url',function(err,response){
      // whatever
    })
    openGraph.MURDER('some-users-access-token','some-action-id',function(err,response){
      // yeah, killed the fucker
    })
