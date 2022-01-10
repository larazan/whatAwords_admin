import axios from 'axios';
import {
    FAQS_LIST_REQUEST,
    FAQS_LIST_SUCCESS,
    FAQS_LIST_FAIL,
    FAQ_DETAIL_REQUEST,
    FAQ_DETAIL_SUCCESS,
    FAQ_DETAIL_FAIL,
    FAQ_CREATE_REQUEST,
    FAQ_CREATE_SUCCESS,
    FAQ_CREATE_FAIL,
    FAQ_CREATE_RESET,
    FAQ_UPDATE_REQUEST,
    FAQ_UPDATE_SUCCESS,
    FAQ_UPDATE_FAIL,
    FAQ_UPDATE_RESET,
    FAQ_DELETE_REQUEST,
    FAQ_DELETE_SUCCESS,
    FAQ_DELETE_FAIL,
} from './types';
import { logout } from './user_actions'

import { FAQS_SERVER } from '../components/utils/misc';

export const getFaqs = () => async (dispatch) => {
    try {
        dispatch({ type: FAQS_LIST_REQUEST });

        const { data } = await axios.get(`${FAQS_SERVER}`)

        dispatch ({
            type: FAQS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FAQS_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
    }
}

export const createFaq = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FAQ_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`${FAQS_SERVER}`, {}, config)

        dispatch({
            type: FAQ_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: FAQ_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getDetailFaq = (id) => async (dispatch) => {
    try {
        dispatch({ type: FAQ_DETAIL_REQUEST })

        const { data } = await axios.get(`${FAQS_SERVER}/${id}`)

        dispatch({
            type: FAQ_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FAQ_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message,
          })
    }
}

export const deleteFaq = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: FAQ_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`${FAQS_SERVER}/${id}`, config)

        dispatch({
            type: FAQ_DELETE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: FAQ_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateFaq = (faq) => async (dispatch, getState) => {
    try {
        dispatch({ type: FAQ_UPDATE_REQUEST })
      
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
      
        const { data } = await axios.put(`${FAQS_SERVER}/${faq._id}`, faq, config)
      
        dispatch({
            type: FAQ_UPDATE_SUCCESS,
            payload: data,
        })
        
        dispatch({ type: FAQ_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: FAQ_UPDATE_FAIL,
            payload: message,
        })
    }
}
