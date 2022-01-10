import axios from 'axios';
import {
    ARTICLES_LIST_REQUEST,
    ARTICLES_LIST_SUCCESS,
    ARTICLES_LIST_FAIL,
    ARTICLE_BY_SLUG_LIST_REQUEST,
    ARTICLE_BY_SLUG_LIST_SUCCESS,
    ARTICLE_BY_SLUG_LIST_FAIL,
    ARTICLE_DETAIL_REQUEST,
    ARTICLE_DETAIL_SUCCESS,
    ARTICLE_DETAIL_FAIL,
    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
    ARTICLE_CREATE_FAIL,
    ARTICLE_CREATE_RESET,
    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,
    ARTICLE_UPDATE_RESET,
    ARTICLE_DELETE_REQUEST,
    ARTICLE_DELETE_SUCCESS,
    ARTICLE_DELETE_FAIL,
} from './types';
import { logout } from './user_actions'

import { ARTICLES_SERVER } from '../components/utils/misc';

export const getArticles = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLES_LIST_REQUEST });

        const { data } = await axios.get(`${ARTICLES_SERVER}`)

        dispatch ({
            type: ARTICLES_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ARTICLES_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
    }
}

export const createArticle = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ARTICLE_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`${ARTICLES_SERVER}`, {}, config)

        dispatch({
            type: ARTICLE_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ARTICLE_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getDetailArticle = (id) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_DETAIL_REQUEST })

        const { data } = await axios.get(`${ARTICLES_SERVER}/${id}`)

        dispatch({
            type: ARTICLE_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ARTICLE_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const deleteArticle = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ARTICLE_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`${ARTICLES_SERVER}/${id}`, config)

        dispatch({
            type: ARTICLE_DELETE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ARTICLE_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateArticle = (article) => async (dispatch, getState) => {
    try {
        dispatch({ type: ARTICLE_UPDATE_REQUEST })
      
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
      
        const { data } = await axios.put(`${ARTICLES_SERVER}/${article._id}`, article, config)
      
        dispatch({
            type: ARTICLE_UPDATE_SUCCESS,
            payload: data,
        })
        
        dispatch({ type: ARTICLE_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ARTICLE_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const getArticleByName = (slug) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_BY_SLUG_LIST_REQUEST })

        const { data } = await axios.get(`${ARTICLES_SERVER}/s/${slug}`)

        dispatch({
            type: ARTICLE_BY_SLUG_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ARTICLE_BY_SLUG_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

