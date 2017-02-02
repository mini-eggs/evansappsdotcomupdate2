import { CALL_CONTENTFUL } from '../middleware/contentful'

export const CONTENTFUL_REQUEST = 'CONTENTFUL_REQUEST'
export const CONTENTFUL_SUCCESS = 'CONTENTFUL_SUCCESS'
export const CONTENTFUL_FAILURE = 'CONTENTFUL_FAILURE'

const fetchEntries = () => ({
  [CALL_CONTENTFUL]: {
    types: [ CONTENTFUL_REQUEST, CONTENTFUL_SUCCESS, CONTENTFUL_FAILURE ]
  }
})

export const loadEntries = () => dispatch => {
  return dispatch(fetchEntries())
}
