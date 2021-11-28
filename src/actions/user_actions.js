import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    // USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    // USER_UPDATE_RESET,
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
} from './types';

import { USER_SERVER } from '../components/utils/misc';

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        `${USER_SERVER}/login`,
        { email, password },
        config
      )
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')   
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/login'
  }
  
  export const register = (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      console.log(name, email, password, passwordConfirm);
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        `${USER_SERVER}/signup`,
        { name, email, password, passwordConfirm },
        config
      )
  
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`${USER_SERVER}/${id}`, config)
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`${USER_SERVER}/${user._id}`, user, config)
  
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      })
    }
  }
  
  export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`${USER_SERVER}`, config)
  
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      })
    }
  }
  
  export const deleteUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`${USER_SERVER}/${id}`, config)
  
      dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateUser = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`${USER_SERVER}/${user._id}`, user, config)
  
      dispatch({ type: USER_UPDATE_SUCCESS })
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  
      dispatch({ type: USER_DETAILS_RESET })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      })
    }
  }

export const followUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FOLLOW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const userId = userInfo.user._id;

    const { data } = await axios.put(
      `${USER_SERVER}/${id}/follow`,
      {userId:userId},
      config
    );

    dispatch({
      type: USER_FOLLOW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FOLLOW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unfollowUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UNFOLLOW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const userId = userInfo.user._id;

    const { data } = await axios.put(
      `${USER_SERVER}/${id}/follow`,
      {userId:userId},
      config
    );

    dispatch({
      type: USER_UNFOLLOW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UNFOLLOW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

  // forgot password
  // reset password
  // update password
  
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
      })
  
      const { data } = await axios.post(
        `${USER_SERVER}/forgotPassword`,
        { email }
      )
  
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const resetPassword = (token, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      })
  
      const { data } = await axios.post(
        `${USER_SERVER}/resetPassword/${token}`,
        { password, passwordConfirm }
      )
  
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getUserInfo = (slug) => async (dispatch) => {
    try {
      dispatch({
        type: USER_INFO_REQUEST,
      })
  
      const { data } = await axios.get(`${USER_SERVER}/slug/${slug}`)
  
      dispatch({
        type: USER_INFO_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: USER_INFO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getUserFollower = (slug) => async (dispatch) => {
    try {
      dispatch({
        type: USER_FOLLOWERS_REQUEST,
      })
  
      const { data } = await axios.get(`${USER_SERVER}/followers/${slug}`)
  
      dispatch({
        type: USER_FOLLOWERS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_FOLLOWERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getUserFollowing = (slug) => async (dispatch) => {
    try {
      dispatch({
        type: USER_FOLLOWING_REQUEST,
      })
  
      const { data } = await axios.get(`${USER_SERVER}/following/${slug}`)
  
      dispatch({
        type: USER_FOLLOWING_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_FOLLOWING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getUserCollection = (slug) => async (dispatch) => {
    try {
      dispatch({
        type: USER_COLLECTION_REQUEST,
      })
  
      const { data } = await axios.get(`${USER_SERVER}/collection/${slug}`)
  
      dispatch({
        type: USER_COLLECTION_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }