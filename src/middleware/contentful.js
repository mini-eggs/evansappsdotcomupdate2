import * as contentful from 'contentful'
import credentials from '../keys/contentful'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const getContentful = async () => {
  try {
    return await contentful.createClient( credentials ).getEntries()
  }
  catch( err ) {
    throw new Error( 'check getEntries' )
  }
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_CONTENTFUL = Symbol('Call Contentful')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callContentful = action[CALL_CONTENTFUL]
  if (typeof callContentful === 'undefined') {
    return next(action)
  }

  const { types } = callContentful

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_CONTENTFUL]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return getContentful().then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
