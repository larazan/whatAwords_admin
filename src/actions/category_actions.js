import axios from 'axios';
import {
    CATEGORIES_LIST_REQUEST,
    CATEGORIES_LIST_SUCCESS,
    CATEGORIES_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
} from './types';
import { logout } from './user_actions'

import { CATEGORY_SERVER } from '../components/utils/misc';

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORIES_LIST_REQUEST })

        const { data } = await axios.get(`${CATEGORY_SERVER}`)

        dispatch({
            type: CATEGORIES_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORIES_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
        })
    }
}

export const createCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`${CATEGORY_SERVER}`, category, config)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getCategoryById = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })

        const { data } = await axios.get(`${CATEGORY_SERVER}/${id}`)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`${CATEGORY_SERVER}/${id}`, config)

        dispatch({
            type: CATEGORY_DELETE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_UPDATE_REQUEST })
      
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
      
        const { data } = await axios.put(`${CATEGORY_SERVER}/${category._id}`, category, config)
      
        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        })
        
        // dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: message,
        })
    }
}