import axios from 'axios';
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
    AUTHOR_UPDATE_REQUEST,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL,
    AUTHOR_DELETE_REQUEST,
    AUTHOR_DELETE_SUCCESS,
    AUTHOR_DELETE_FAIL,
    AUTHOR_BY_ALPHABET_LIST_REQUEST,
    AUTHOR_BY_ALPHABET_LIST_SUCCESS,
    AUTHOR_BY_ALPHABET_LIST_FAIL,
    AUTHOR_BY_NAME_LIST_REQUEST,
    AUTHOR_BY_NAME_LIST_SUCCESS,
    AUTHOR_BY_NAME_LIST_FAIL,
} from './types';
import { logout } from './user_actions'

import { AUTHORS_SERVER } from '../components/utils/misc';

export const getAuthors = () => async (dispatch) => {
    try {
        dispatch({ type: AUTHORS_LIST_REQUEST });

        const { data } = await axios.get(`${AUTHORS_SERVER}`)

        dispatch ({
            type: AUTHORS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTHORS_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
    }
}

export const createAuthor = (author) => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTHOR_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`${AUTHORS_SERVER}`, author, config)

        dispatch({
            type: AUTHOR_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: AUTHOR_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getDetailAuthor = (id) => async (dispatch) => {
    try {
        dispatch({ type: AUTHOR_DETAIL_REQUEST })

        const { data } = await axios.get(`${AUTHORS_SERVER}/${id}`)

        dispatch({
            type: AUTHOR_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTHOR_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const deleteAuthor = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTHOR_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`${AUTHORS_SERVER}/${id}`, config)

        dispatch({
            type: AUTHOR_DELETE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: AUTHOR_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateAuthor = (author) => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTHOR_UPDATE_REQUEST })
      
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
      
        const { data } = await axios.put(`${AUTHORS_SERVER}/${author._id}`, author, config)
      
        dispatch({
            type: AUTHOR_UPDATE_SUCCESS,
            payload: data,
        })
        
        dispatch({ type: AUTHOR_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: AUTHOR_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const getAuthorByName = (name) => async (dispatch) => {
    try {
        dispatch({ type: AUTHOR_BY_NAME_LIST_REQUEST })

        const { data } = await axios.get(`${AUTHORS_SERVER}/tokoh/${name}`)

        dispatch({
            type: AUTHOR_BY_NAME_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: AUTHOR_BY_NAME_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}


export const getAuthorByAlphabet = (alphabet) => async (dispatch) => {
    
    try {
        let alpha = alphabet || 'a'
        dispatch({ type: AUTHOR_BY_ALPHABET_LIST_REQUEST })

        const { data } = await axios.get(`${AUTHORS_SERVER}/initial/${alpha}`)

        dispatch({
            type: AUTHOR_BY_ALPHABET_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: AUTHOR_BY_ALPHABET_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
    
}