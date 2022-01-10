import {
    ARTICLES_LIST_REQUEST,
    ARTICLES_LIST_SUCCESS,
    ARTICLES_LIST_FAIL,
    ARTICLE_BY_SLUG_LIST_REQUEST,
    ARTICLE_BY_SLUG_LIST_SUCCESS,
    ARTICLE_BY_SLUG_LIST_FAIL,
    ARTICLE_DETAIL_REQUEST,
    ARTICLE_DETAIL_SUCCESS,
    ARTICLE_DETAIL_FAIL,
    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
    ARTICLE_CREATE_FAIL,
    ARTICLE_CREATE_RESET,
    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,
    ARTICLE_UPDATE_RESET,
    ARTICLE_DELETE_REQUEST,
    ARTICLE_DELETE_SUCCESS,
    ARTICLE_DELETE_FAIL,
} from '../actions/types'

export const articlesListReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
        case ARTICLES_LIST_REQUEST:
            return { loading: true, articles: [] }
        case ARTICLES_LIST_SUCCESS:
            return { loading: false, articles: action.payload.articles }    
        case ARTICLES_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const articleDetailReducer = (state = { article: [] }, action) => {
    switch (action.type) {
        case ARTICLE_DETAIL_REQUEST:
            return { ...state, loading: true}
        case ARTICLE_DETAIL_SUCCESS:
            return { loading: false, article: action.payload.article }    
        case ARTICLE_DETAIL_FAIL:
            return { loading: false, error: action.payload }    
        default:
            return state;
    }
}

export const articleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_DELETE_REQUEST:
            return { loading: true }
        case ARTICLE_DELETE_SUCCESS:
            return { loading: false, success: true }    
        case ARTICLE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const articleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_CREATE_REQUEST:
          return { loading: true }
        case ARTICLE_CREATE_SUCCESS:
          return { loading: false, success: true, article: action.payload }
        case ARTICLE_CREATE_FAIL:
          return { loading: false, error: action.payload }
        case ARTICLE_CREATE_RESET:
          return {}
        default:
          return state
    }
}

export const articleUpdateReducer = (state = { article: {} }, action) => {
    switch (action.type) {
        case ARTICLE_UPDATE_REQUEST:
          return { loading: true }
        case ARTICLE_UPDATE_SUCCESS:
          return { loading: false, success: true, article: action.payload }
        case ARTICLE_UPDATE_FAIL:
          return { loading: false, error: action.payload }
        case ARTICLE_UPDATE_RESET:
          return { product: {} }
        default:
          return state
      }
}

export const articleBySlugReducer = (state = { article: []}, action) => {
    switch (action.type) {
        case ARTICLE_BY_SLUG_LIST_REQUEST:
          return { loading: true, article: [] }
        case ARTICLE_BY_SLUG_LIST_SUCCESS:
          return { loading: false, article: action.payload.article }
        case ARTICLE_BY_SLUG_LIST_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
    }
}

