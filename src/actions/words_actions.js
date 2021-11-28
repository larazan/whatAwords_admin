import axios from 'axios';
import {
    WORDS_LIST_REQUEST,
    WORDS_LIST_SUCCESS,
    WORDS_LIST_FAIL,
    WORDS_BY_TAG_REQUEST,
    WORDS_BY_TAG_SUCCESS,
    WORDS_BY_TAG_FAIL,
    WORDS_BY_CATEGORY_REQUEST,
    WORDS_BY_CATEGORY_SUCCESS,
    WORDS_BY_CATEGORY_FAIL,
    WORDS_BY_AUTHOR_REQUEST,
    WORDS_BY_AUTHOR_SUCCESS,
    WORDS_BY_AUTHOR_FAIL,
    WORD_LIST_REQUEST,
    WORD_LIST_SUCCESS,
    WORD_LIST_FAIL,
    WORD_CREATE_REQUEST,
    WORD_CREATE_SUCCESS,
    WORD_CREATE_FAIL,
    WORD_UPDATE_REQUEST,
    WORD_UPDATE_SUCCESS,
    WORD_UPDATE_FAIL,
    WORD_DELETE_REQUEST,
    WORD_DELETE_SUCCESS,
    WORD_DELETE_FAIL,
    WORD_DOWNLOAD_REQUEST,
    WORD_DOWNLOAD_SUCCESS,
    WORD_DOWNLOAD_FAIL,
    WORD_VIEW_REQUEST,
    WORD_VIEW_SUCCESS,
    WORD_VIEW_FAIL,
    WORDS_BY_SEARCH_REQUEST,
    WORDS_BY_SEARCH_SUCCESS,
    WORDS_BY_SEARCH_FAIL,
    WORD_LIKE_REQUEST,
    WORD_LIKE_SUCCESS,
    WORD_LIKE_FAIL,
    WORD_UNLIKE_REQUEST,
    WORD_UNLIKE_SUCCESS,
    WORD_UNLIKE_FAIL,
    WORD_COLLECT_REQUEST,
    WORD_COLLECT_SUCCESS,
    WORD_COLLECT_FAIL,
    WORDS_BY_USER_REQUEST,
    WORDS_BY_USER_SUCCESS,
    WORDS_BY_USER_FAIL,
} from './types';
import { logout } from './user_actions'

import { WORDS_SERVER } from '../components/utils/misc';
import { USER_SERVER } from '../components/utils/misc';

export const getWordsInfinite = (page, previousState = []) => async (dispatch) => {
    try {
        const params = { page:page }
        dispatch({ type: WORDS_LIST_REQUEST });

        const { data } = await axios.get(`${WORDS_SERVER}`, {params: params})
        const newState = [
            ...previousState,
            ...data.words
        ]

        console.log(newState);

        dispatch ({
            type: WORDS_LIST_SUCCESS,
            payload: newState
        })
    } catch (error) {
        dispatch({
            type: WORDS_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
    }
}

export const getWords = (page) => async (dispatch) => {
    try {
        const params = { page:page }
        dispatch({ type: WORDS_LIST_REQUEST });

        const { data } = await axios.get(`${WORDS_SERVER}`, {params: params})

        dispatch ({
            type: WORDS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: WORDS_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
    }
}

export const getWord = (id) => async (dispatch) => {
    try {
        dispatch({ type: WORD_LIST_REQUEST })

        const { data } = await axios.get(`${WORDS_SERVER}/${id}`)

        dispatch({
            type: WORD_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: WORD_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const createWord = () => async (dispatch, getState) => {
    try {
        dispatch({ type: WORD_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`${WORDS_SERVER}`, {}, config)

        dispatch({
            type: WORD_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: WORD_CREATE_FAIL,
            payload: message,
        })
    }
}

export const deleteWord = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: WORD_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`${WORDS_SERVER}/${id}`, config)

        dispatch({
            type: WORD_DELETE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: WORD_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateWord = (word) => async (dispatch, getState) => {
    try {
        dispatch({ type: WORD_UPDATE_REQUEST })
      
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
      
        const { data } = await axios.put(`${WORDS_SERVER}/${word._id}`, word, config)
      
        dispatch({
            type: WORD_UPDATE_SUCCESS,
            payload: data,
        })
        
        dispatch({ type: WORD_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: WORD_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const getWordsByTag = (tag, pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: WORDS_BY_TAG_REQUEST })

        const { data } = await axios.get(`${WORDS_SERVER}/tag/${tag}?page=${pageNumber}`)

        dispatch({
            type: WORDS_BY_TAG_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORDS_BY_TAG_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const getWordsBySearch = (keyword, pageNumber) => async (dispatch) => {
    try {
        dispatch({ type: WORDS_BY_SEARCH_REQUEST })

        const { data } = await axios.get(`${WORDS_SERVER}/all?keyword=${keyword}&page=${pageNumber}`)

        dispatch({
            type: WORDS_BY_SEARCH_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORDS_BY_SEARCH_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const getWordsByAuthor = (author) => async (dispatch) => {
    try {
        dispatch({ type: WORDS_BY_AUTHOR_REQUEST })

        const { data } = await axios.get(`${WORDS_SERVER}/author/${author}`)

        dispatch({
            type: WORDS_BY_AUTHOR_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORDS_BY_AUTHOR_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const getWordsByUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: WORDS_BY_USER_REQUEST })

        const { data } = await axios.get(`${WORDS_SERVER}/user/${userId}`)

        dispatch({
            type: WORDS_BY_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORDS_BY_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const getWordsByCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: WORDS_BY_CATEGORY_REQUEST })

        const { data } = await axios.get(`${WORDS_SERVER}/cat/${category}`)

        dispatch({
            type: WORDS_BY_CATEGORY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORDS_BY_CATEGORY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }   
}

export const downloadWord = (id) => async (dispatch) => {
    try {
        dispatch({ type: WORD_DOWNLOAD_REQUEST })

        const { data } = await axios.get(`${WORDS_SERVER}/${id}/download`)

        dispatch({
            type: WORD_DOWNLOAD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORD_DOWNLOAD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const viewWord = (id) => async (dispatch) => {
    try {
        dispatch({ type: WORD_VIEW_REQUEST })

        const { data } = await axios.put(`${WORDS_SERVER}/${id}/view`)

        dispatch({
            type: WORD_VIEW_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORD_VIEW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const likeWord = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: WORD_LIKE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const userId = userInfo.user._id

        const { data } = await axios.put(`${WORDS_SERVER}/${id}/like`, {userId:userId}, config)

        dispatch({
            type: WORD_LIKE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORD_LIKE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const unlikeWord = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: WORD_UNLIKE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const userId = userInfo.user._id

        const { data } = await axios.put(`${WORDS_SERVER}/${id}/like`, {userId:userId}, config)

        dispatch({
            type: WORD_UNLIKE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORD_UNLIKE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const collectWord = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: WORD_COLLECT_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const userId = userInfo.user._id

        const { data } = await axios.put(`${USER_SERVER}/${id}/collect`, {userId: userId}, config)

        dispatch({
            type: WORD_COLLECT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: WORD_COLLECT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}