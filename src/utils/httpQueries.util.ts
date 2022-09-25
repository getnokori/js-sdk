
/**
 * {foo: null, bar: 'baz', baz: 'foo'} => bar=baz&baz=foo
 */
export const toQueryString = (args: object) => {
  const queryString = Object.keys(args).filter(key => args[key]).map(function(key) {
    return `${key }=${ args[key]}`
  }).join('&')

  if(!queryString) return null
  
  return queryString
}

export default {
  toQueryString,
}
