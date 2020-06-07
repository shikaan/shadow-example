function is_equal(reply_one, reply_two) {
  return reply_one.status === reply_two.status && 
    JSON.stringify(reply_one.responseBody) === JSON.stringify(reply_two.responseBody)
}

Promise.all = function ( promises ) {
  return new Promise( function ( fulfil, reject ) {
    var result = [], pending, i, processPromise;

    if ( !promises.length ) {
      fulfil( result );
      return;
    }

    processPromise = function ( i ) {
      promises[i].then( function ( value ) {
        result[i] = value;

        if ( !--pending ) {
          fulfil( result );
        }
      }, reject );
    };

    pending = i = promises.length;
    while ( i-- ) {
      processPromise( i );
    }
  });
};

function handle(r) {
  var prod_service = '/live'
  var shadowed_service = '/shadowed'


  Promise.all([
    r.subrequest(prod_service),
    r.subrequest(shadowed_service)
  ]).then(function(result) {
    var prodReply = result[0]
    var shadowReply = result[1]

    if(!is_equal(prodReply, shadowReply)) {
      r.log('Unmatching reponse')
      r.log(JSON.stringify(shadowReply))
    }

    r.return(prodReply.status, prodReply.responseBody)
  })
}

export default {handle}