// classes.js
const { debugMsg } = require( "../debug-funcs.js" );


module.exports = function(server, db)
{


  // registrera en ny klass
  server.post(
    '/data/classes',
    function postClass(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).map( entry => entry = entry[ 1 ] == '' ? [ entry[ 0 ], null ] : [ entry[ 0 ], entry[ 1 ] ] ) );
      // record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );
      let sql = "INSERT INTO classes";
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';
      // console.log( sql );
      // Convert the 'defaultInvoiceItem' prop from an empty string to a null (React-Admin -> DB)
      // if ( Object.keys( record ).includes( 'defaultInvoiceItem' ) ) record.defaultInvoiceItem = record.defaultInvoiceItem == '' ? null : record.defaultInvoiceItem;
      // Convert the 'school' prop from an empty string to a null (React-Admin -> DB)
      // if ( Object.keys( record ).includes( 'school' ) ) record.school = record.school == '' ? null : record.school;
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      // console.log( 'after:', record );
      let result;
      try
      {
        const stmt = db.prepare( sql );
        result = stmt.run( record );
      }
      catch(e)
      {
        console.error(e);
      }
      response.json(result)
    }
  )


  // komplettera uppgifter för klass
  server.put(
    '/data/classes/:id',
    function putClass(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).map( entry => entry = entry[ 1 ] == '' ? [ entry[ 0 ], null ] : [ entry[ 0 ], entry[ 1 ] ] ) );
      // record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );
      let sql = "UPDATE classes SET ";
      // Remove the id prop because we don't want to update it
      sql += Object.keys( record ).filter( key => key != 'id' ).map( key => `${key}=@${key}` );
      sql += " WHERE id=:id";
      // console.log( sql );
      // Convert the 'defaultInvoiceItem' prop from an empty string to a null (React-Admin -> DB)
      // if ( Object.keys( record ).includes( 'defaultInvoiceItem' ) ) record.defaultInvoiceItem = record.defaultInvoiceItem == '' ? null : record.defaultInvoiceItem;
      // Convert the 'school' prop from an empty string to a null (React-Admin -> DB)
      // if ( Object.keys( record ).includes( 'school' ) ) record.school = record.school == '' ? null : record.school;
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = record.hide ? 1 : 0;
      // console.log( 'after:', record );
      let result;
      try
      {
        const stmt = db.prepare( sql );
        result = stmt.run( record );
      }
      catch(e)
      {
        console.error(e);
      }
      response.json(result)

    }
  )


}
