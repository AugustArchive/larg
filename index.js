module.exports = ( args ) => {
  let p = {};
  let l = [];

  const rHyphens    = ( v ) => v.replace(/^\-+/g, '');
  const cApplicable = ( v ) => ( isNaN( v ) ? ( v.toString().toLowerCase() === 'true' ? true : ( v.toString().toLowerCase() === 'false' ? false : v ) ) : Number( v ) );

  for ( let i = 0; i < args.length; i++ ) {
    const e = args[ i ].indexOf( '=' );
    const r = args[ i ].charAt( 0 ) === '-' && args.length - 1 >= i + 1 && args[ i + 1 ].indexOf( '=' ) === -1 && args[ i + 1 ].charAt( 0 ) !== '-';
    const n = e === -1 ? rHyphens( args[ i ] ) : rHyphens( args[ i ].slice( 0, e ) );

    if ( e !== -1 ) p[ n ] = cApplicable( args[ i ].slice( e + 1 ) );
    else if ( r ) {
      p[ n ] = cApplicable( args[ i + 1 ] );
      i++;
    } else if ( args[ i ].charAt( 0 ) === '-' ) {
      if ( args[ i ].charAt( 1 ) === '-' ) p[ n ] = true;
      else for ( let b = 0; b < n.length; b++ ) p[ n.charAt( b ) ] = true;
    } else l.push( cApplicable( n ) );
  }

  return Object.assign( p, { '_': l } );
};