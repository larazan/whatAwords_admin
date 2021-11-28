import axios from 'axios';
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
} from './types';

import { logout } from './user_actions'

import { TAGS_SERVER } from '../components/utils/misc';

export const getTags = () => async (dispatch) => {
    try {
        dispatch({ type: TAG_LIST_REQUEST })

        const { data } = await axios.get(`${TAGS_SERVER}`)

        dispatch({
            type: TAG_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TAG_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

export const getAllTags = () => async (dispatch) => {
    try {
        dispatch({ type: TAGS_LIST_REQUEST })

        const { data } = await axios.get(`${TAGS_SERVER}/t`)

        dispatch({
            type: TAGS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TAGS_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

export const createTag = () => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`${TAGS_SERVER}`, {}, config)

        dispatch({
            type: TAG_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TAG_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getTagById = (id) => async (dispatch) => {
    try {
        dispatch({ type: TAG_DETAIL_REQUEST })

        const { data } = await axios.get(`${TAGS_SERVER}/id/${id}`)

        dispatch({
            type: TAG_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TAG_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const deleteTag = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`${TAGS_SERVER}/id/${id}`, config)

        dispatch({
            type: TAG_DELETE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TAG_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateTag = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_UPDATE_REQUEST })
      
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
      
        const { data } = await axios.put(`${TAGS_SERVER}/id/${category._id}`, category, config)
      
        dispatch({
            type: TAG_UPDATE_SUCCESS,
            payload: data,
        })
        
        // dispatch({ type: TAG_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TAG_UPDATE_FAIL,
            payload: message,
        })
    }
}