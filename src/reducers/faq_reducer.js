import {
    FAQS_LIST_REQUEST,
    FAQS_LIST_SUCCESS,
    FAQS_LIST_FAIL,
    FAQ_DETAIL_REQUEST,
    FAQ_DETAIL_SUCCESS,
    FAQ_DETAIL_FAIL,
    FAQ_CREATE_REQUEST,
    FAQ_CREATE_SUCCESS,
    FAQ_CREATE_FAIL,
    FAQ_CREATE_RESET,
    FAQ_UPDATE_REQUEST,
    FAQ_UPDATE_SUCCESS,
    FAQ_UPDATE_FAIL,
    FAQ_UPDATE_RESET,
    FAQ_DELETE_REQUEST,
    FAQ_DELETE_SUCCESS,
    FAQ_DELETE_FAIL,
} from '../actions/types'

export const faqsListReducer = (state = { faqs: [] }, action) => {
    switch (action.type) {
        case FAQS_LIST_REQUEST:
            return { loading: true, faqs: [] }
        case FAQS_LIST_SUCCESS:
            return { loading: false, faqs: action.payload.faqs }    
        case FAQS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const faqDetailReducer = (state = { faq: [] }, action) => {
    switch (action.type) {
        case FAQ_DETAIL_REQUEST:
            return { ...state, loading: true}
        case FAQ_DETAIL_SUCCESS:
            return { loading: false, faq: action.payload.faq }    
        case FAQ_DETAIL_FAIL:
            return { loading: false, error: action.payload }    
        default:
            return state;
    }
}

export const faqDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case FAQ_DELETE_REQUEST:
            return { loading: true }
        case FAQ_DELETE_SUCCESS:
            return { loading: false, success: true }    
        case FAQ_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const faqCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case FAQ_CREATE_REQUEST:
          return { loading: true }
        case FAQ_CREATE_SUCCESS:
          return { loading: false, success: true, faq: action.payload }
        case FAQ_CREATE_FAIL:
          return { loading: false, error: action.payload }
        case FAQ_CREATE_RESET:
          return {}
        default:
          return state
    }
}

export const faqUpdateReducer = (state = { faq: {} }, action) => {
    switch (action.type) {
        case FAQ_UPDATE_REQUEST:
          return { loading: true }
        case FAQ_UPDATE_SUCCESS:
          return { loading: false, success: true, faq: action.payload }
        case FAQ_UPDATE_FAIL:
          return { loading: false, error: action.payload }
        case FAQ_UPDATE_RESET:
          return { product: {} }
        default:
          return state
      }
}

