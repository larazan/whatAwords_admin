import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_FOLLOW_REQUEST,
    USER_FOLLOW_SUCCESS,
    USER_FOLLOW_FAIL,
    USER_UNFOLLOW_REQUEST,
    USER_UNFOLLOW_SUCCESS,
    USER_UNFOLLOW_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL,
    USER_FOLLOWERS_REQUEST,
    USER_FOLLOWERS_SUCCESS,
    USER_FOLLOWERS_FAIL,
    USER_FOLLOWING_REQUEST,
    USER_FOLLOWING_SUCCESS,
    USER_FOLLOWING_FAIL,
    USER_COLLECTION_REQUEST,
    USER_COLLECTION_SUCCESS,
    USER_COLLECTION_FAIL,
  } from '../actions/types'
  
  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload.user }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }
  
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload.user }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }
  
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { ...state, loading: true }
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload }
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case USER_DETAILS_RESET:
        return { user: {} }
      default:
        return state
    }
  }
  
  export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true }
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload }
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload }
      case USER_UPDATE_PROFILE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true }
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload }
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload }
      case USER_LIST_RESET:
        return { users: [] }
      default:
        return state
    }
  }
  
  export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { loading: true }
      case USER_DELETE_SUCCESS:
        return { loading: false, success: true }
      case USER_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true }
      case USER_UPDATE_SUCCESS:
        return { loading: false, success: true }
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case USER_UPDATE_RESET:
        return {
          user: {},
        }
      default:
        return state
    }
  }

  export const userDetailReducer = (state = { user: []}, action) => {
    switch (action.type) {
      case USER_INFO_REQUEST:
        return { loading: true, user: [] }
      case USER_INFO_SUCCESS:
        return { 
          loading: false, 
          user: action.payload.user,
          userId: action.payload.userId, 
          quoteTot: action.payload.quoteTot, 
          followingTot: action.payload.followingTot,
          followerTot: action.payload.followerTot,
          collectTot: action.payload.collectTot,
        }
      case USER_INFO_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}

export const userFollowerReducer = (state = { user: []}, action) => {
  switch (action.type) {
    case USER_FOLLOWERS_REQUEST:
      return { loading: true, user: [] }
    case USER_FOLLOWERS_SUCCESS:
      return { 
        loading: false, 
        user: action.payload.user,
        followers: action.payload.followers,
      }
    case USER_FOLLOWERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userFollowingReducer = (state = { user: []}, action) => {
  switch (action.type) {
    case USER_FOLLOWING_REQUEST:
      return { loading: true, user: [] }
    case USER_FOLLOWING_SUCCESS:
      return { 
        loading: false, 
        user: action.payload.user,
        following: action.payload.following,
      }
    case USER_FOLLOWING_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userCollectionReducer = (state = { user: []}, action) => {
  switch (action.type) {
    case USER_COLLECTION_REQUEST:
      return { loading: true, user: [] }
    case USER_COLLECTION_SUCCESS:
      return { 
        loading: false, 
        user: action.payload.user,
        words: action.payload.words,
        collections: action.payload.collections,
      }
    case USER_COLLECTION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
  
  export const userFollowReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_FOLLOW_REQUEST:
        return { loading: true }
      case USER_FOLLOW_SUCCESS:
        return { loading: false, success: true }
      case USER_FOLLOW_FAIL:
        return { loading: false, error: action.payload }  
      default:
        return state;
    }
  }

  export const userUnfollowReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UNFOLLOW_REQUEST:
        return { loading: true }
      case USER_UNFOLLOW_SUCCESS:
        return { loading: false, success: true }
      case USER_UNFOLLOW_FAIL:
        return { loading: false, error: action.payload }  
      default:
        return state;
    }
  }

  export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
        return { loading: true }
      case FORGOT_PASSWORD_SUCCESS:
        return { loading: false, success: true }
      case FORGOT_PASSWORD_FAIL:
        return { loading: false, error: action.payload }   
      default:
        return state;
    }
  }

  export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case RESET_PASSWORD_REQUEST:
        return { loading: true }
      case RESET_PASSWORD_SUCCESS:
        return { loading: false, success: true }
      case RESET_PASSWORD_FAIL:
        return { loading: false, error: action.payload }   
      default:
        return state;
    }
  }