import {
    TAG_LIST_REQUEST,
    TAG_LIST_SUCCESS,
    TAG_LIST_FAIL,
    TAGS_LIST_REQUEST,
    TAGS_LIST_SUCCESS,
    TAGS_LIST_FAIL,
    TAG_DETAIL_REQUEST,
    TAG_DETAIL_SUCCESS,
    TAG_DETAIL_FAIL,
    TAG_CREATE_REQUEST,
    TAG_CREATE_SUCCESS,
    TAG_CREATE_FAIL,
    TAG_CREATE_RESET,
    TAG_UPDATE_REQUEST,
    TAG_UPDATE_SUCCESS,
    TAG_UPDATE_FAIL,
    TAG_UPDATE_RESET,
    TAG_DELETE_REQUEST,
    TAG_DELETE_SUCCESS,
    TAG_DELETE_FAIL,
} from '../actions/types'

export const tagsListReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAGS_LIST_REQUEST:
            return { loading: true, tags: [] }
        case TAGS_LIST_SUCCESS:
            return { loading: false, tags: action.payload.tags }    
        case TAGS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const tagListReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAG_LIST_REQUEST:
            return { loading: true, tags: [] }
        case TAG_LIST_SUCCESS:
            return { loading: false, tags: action.payload.tags }    
        case TAG_LIST_FAIL:
            return { loading: false, error: action.payload }    
        default:
            return state;
    }
}

export const tagDetailReducer = (state = { tag: [] }, action) => {
    switch (action.type) {
        case TAG_DETAIL_REQUEST:
            return { loading: true, tag: [] }
        case TAG_DETAIL_SUCCESS:
            return { loading: false, tag: action.payload.tag }    
        case TAG_DETAIL_FAIL:
            return { loading: false, error: action.payload }    
        default:
            return state;
    }
}

export const tagDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TAG_DELETE_REQUEST:
            return { loading: true }
        case TAG_DELETE_SUCCESS:
            return { loading: false, success: true }    
        case TAG_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const tagCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TAG_CREATE_REQUEST:
          return { loading: true }
        case TAG_CREATE_SUCCESS:
          return { loading: false, success: true, tag: action.payload }
        case TAG_CREATE_FAIL:
          return { loading: false, error: action.payload }
        case TAG_CREATE_RESET:
          return {}
        default:
          return state
    }
}

export const tagUpdateReducer = (state = { tag: {} }, action) => {
    switch (action.type) {
        case TAG_UPDATE_REQUEST:
          return { loading: true }
        case TAG_UPDATE_SUCCESS:
          return { loading: false, success: true, tag: action.payload }
        case TAG_UPDATE_FAIL:
          return { loading: false, error: action.payload }
        case TAG_UPDATE_RESET:
          return { tag: {} }
        default:
          return state
      }
}

// export default function(state = {}, action) {
//     switch (action.type) {
//         case GET_TAGS:
//             return { ...state, tags: action.payload }
//         case GET_ALL_TAGS:
//             return { ...state, tags: action.payload }
//         default:
//             return state;
//     }
// } 