import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const entries = (state = null, action) => {
  if( action.type === ActionTypes.CONTENTFUL_SUCCESS ) {
    let items = action.response.items
    let entries = {}
    items.forEach( item => {
      const contentType = item.sys.contentType.sys.id
      if( !entries[ contentType ] ) {
        entries[ contentType ] = []
      }
      entries[ contentType ].push( item.fields )
    })
    return merge({}, state, entries)
  }
  return state
}

const rootReducer = combineReducers({
  entries,
  routing
})

export default rootReducer
