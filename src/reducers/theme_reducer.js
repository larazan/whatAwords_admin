import { SET_MODE, SET_COLOR } from '../actions/types' 

export const themeReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_MODE:
            return {
                ...state,
                mode: action.payload
            }
        case SET_COLOR:
            return {
                ...state,
                color: action.payload
            }
        default:
            return state
    }
}