import {
    AUTHORS_LIST_REQUEST,
    AUTHORS_LIST_SUCCESS,
    AUTHORS_LIST_FAIL,
    AUTHOR_DETAIL_REQUEST,
    AUTHOR_DETAIL_SUCCESS,
    AUTHOR_DETAIL_FAIL,
    AUTHOR_CREATE_REQUEST,
    AUTHOR_CREATE_SUCCESS,
    AUTHOR_CREATE_FAIL,
    AUTHOR_CREATE_RESET,
    AUTHOR_UPDATE_REQUEST,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL,
    AUTHOR_UPDATE_RESET,
    AUTHOR_DELETE_REQUEST,
    AUTHOR_DELETE_SUCCESS,
    AUTHOR_DELETE_FAIL,
    AUTHOR_BY_ALPHABET_LIST_REQUEST,
    AUTHOR_BY_ALPHABET_LIST_SUCCESS,
    AUTHOR_BY_ALPHABET_LIST_FAIL,
    AUTHOR_BY_NAME_LIST_REQUEST,
    AUTHOR_BY_NAME_LIST_SUCCESS,
    AUTHOR_BY_NAME_LIST_FAIL,
} from '../actions/types'

export const authorsListReducer = (state = { authors: [] }, action) => {
    switch (action.type) {
        case AUTHORS_LIST_REQUEST:
            return { loading: true, authors: [] }
        case AUTHORS_LIST_SUCCESS:
            return { loading: false, authors: action.payload.authors }    
        case AUTHORS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const authorDetailReducer = (state = { author: [] }, action) => {
    switch (action.type) {
        case AUTHOR_DETAIL_REQUEST:
            return { ...state, loading: true}
        case AUTHOR_DETAIL_SUCCESS:
            return { loading: false, author: action.payload.author }    
        case AUTHOR_DETAIL_FAIL:
            return { loading: false, error: action.payload }    
        default:
            return state;
    }
}

export const authorDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHOR_DELETE_REQUEST:
            return { loading: true }
        case AUTHOR_DELETE_SUCCESS:
            return { loading: false, success: true }    
        case AUTHOR_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const authorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHOR_CREATE_REQUEST:
          return { loading: true }
        case AUTHOR_CREATE_SUCCESS:
          return { loading: false, success: true, author: action.payload }
        case AUTHOR_CREATE_FAIL:
          return { loading: false, error: action.payload }
        case AUTHOR_CREATE_RESET:
          return {}
        default:
          return state
    }
}

export const authorUpdateReducer = (state = { author: {} }, action) => {
    switch (action.type) {
        case AUTHOR_UPDATE_REQUEST:
          return { loading: true }
        case AUTHOR_UPDATE_SUCCESS:
          return { loading: false, success: true, author: action.payload }
        case AUTHOR_UPDATE_FAIL:
          return { loading: false, error: action.payload }
        case AUTHOR_UPDATE_RESET:
          return { product: {} }
        default:
          return state
      }
}

export const authorByAlphabetReducer = (state = { authors: []}, action) => {
    switch (action.type) {
        case AUTHOR_BY_ALPHABET_LIST_REQUEST:
          return { loading: true, authors: [] }
        case AUTHOR_BY_ALPHABET_LIST_SUCCESS:
          return { loading: false, authors: action.payload.authors }
        case AUTHOR_BY_ALPHABET_LIST_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
    }
}

export const authorByNameReducer = (state = { author: []}, action) => {
    switch (action.type) {
        case AUTHOR_BY_NAME_LIST_REQUEST:
          return { loading: true, author: [] }
        case AUTHOR_BY_NAME_LIST_SUCCESS:
          return { loading: false, author: action.payload.author }
        case AUTHOR_BY_NAME_LIST_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
    }
}

