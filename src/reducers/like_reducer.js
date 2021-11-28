import {
    LIKE_LIST_REQUEST,
    LIKE_LIST_SUCCESS,
    LIKE_LIST_FAIL,
    LIKE_CREATE_REQUEST,
    LIKE_CREATE_SUCCESS,
    LIKE_CREATE_FAIL,
    LIKE_CREATE_RESET,
    DISLIKE_LIST_REQUEST,
    DISLIKE_LIST_SUCCESS,
    DISLIKE_LIST_FAIL,
} from './types';

export const likesListReducer = (state = {like: []}, action) => {
    switch (action.type) {
        case LIKE_LIST_REQUEST:
            return { loading: true, like: [] }
        case LIKE_LIST_SUCCESS:
            return { 
              loading: false, 
              like: action.payload.like,
            }    
        case LIKE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const likeReducer = (state = {like: []}, action) => {
    switch (action.type) {
        case LIKE_CREATE_REQUEST:
            return { loading: true, like: [] }
        case LIKE_CREATE_SUCCESS:
            return { 
              loading: false, 
              like: action.payload,
            }    
        case LIKE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const dislikeReducer = (state = {like: []}, action) => {
    switch (action.type) {
        case DISLIKE_LIST_REQUEST:
            return { loading: true, like: [] }
        case DISLIKE_LIST_SUCCESS:
            return { 
              loading: false, 
              like: action.payload,
            }    
        case DISLIKE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}