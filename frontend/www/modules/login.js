$('#login').on('submit', login)

async function login(e){
  e.preventDefault()
  fetch
  (
    '/data/login',
    {
      method: 'POST',
      redirect: 'manual',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { email: $( '#email' ).val(), password: $( '#password' ).val() } )
    }
  )
  .then( lResponse =>
    {
      if ( lResponse.status === 200 )
      {
        console.log( location.search );
        const lParams = new Proxy(
          new URLSearchParams( location.search ),
          {
            get: ( searchParams, prop ) => searchParams.get( prop )
          }
        );
        return lParams;
      }
      return null;
    }
  )
  .then( lParams =>
    {
      console.log( lParams );
      let lRedirectTo = lParams?.redir ? lParams.redir : '/';
      console.log( lRedirectTo );
      location.assign( lRedirectTo );
    }
  );
}

