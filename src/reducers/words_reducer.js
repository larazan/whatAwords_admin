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
    WORD_CREATE_RESET,
    WORD_UPDATE_REQUEST,
    WORD_UPDATE_SUCCESS,
    WORD_UPDATE_FAIL,
    WORD_UPDATE_RESET,
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
} from '../actions/types'

export const wordsSearchReducer = (state = { words: [] }, action) => {
    switch (action.type) {
        case WORDS_BY_SEARCH_REQUEST:
            return { loading: true, words: [] }
        case WORDS_BY_SEARCH_SUCCESS:
            return { 
              loading: false, 
              words: action.payload.words,
              page: action.payload.page, 
              results: action.payload.results, 
              count: action.payload.count
            }    
        case WORDS_BY_SEARCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const wordsListReducer = (state = { words: [] }, action) => {
    switch (action.type) {
      case WORDS_LIST_REQUEST:
          return { loading: true, words: [] }
      case WORDS_LIST_SUCCESS:
          return { 
            loading: false, 
            words: action.payload.words,
            page: action.payload.page, 
            results: action.payload.results, 
            count: action.payload.count
          }    
      case WORDS_LIST_FAIL:
          return { loading: false, error: action.payload }
      default:
          return state;
    }
}



export const wordListReducer = (state = { word: [] }, action) => {
    switch (action.type) {
        case WORD_LIST_REQUEST:
            return { ...state, loading: true }
        case WORD_LIST_SUCCESS:
            return { 
              loading: false, 
              word: action.payload.word, 
              authorName: action.payload.authorName, 
              createdBy: action.payload.createdBy, 
              tagsList: action.payload.tags, 
              bgColor: action.payload.bgColor, 
              fontFamily: action.payload.fontFamily,
              creatorId: action.payload.creatorId, 
              likeTot: action.payload.likeTot, 
              likes: action.payload.likes, 
              followersTot: action.payload.followersTot,
              followers: action.payload.followers,
              collects: action.payload.collects, 
            }    
        case WORD_LIST_FAIL:
            return { loading: false, error: action.payload }    
        default:
            return state;
    }
}

export const wordDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case WORD_DELETE_REQUEST:
            return { loading: true }
        case WORD_DELETE_SUCCESS:
            return { loading: false, success: true }    
        case WORD_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const wordCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case WORD_CREATE_REQUEST:
          return { loading: true }
        case WORD_CREATE_SUCCESS:
          return { loading: false, success: true, word: action.payload }
        case WORD_CREATE_FAIL:
          return { loading: false, error: action.payload }
        case WORD_CREATE_RESET:
          return {}
        default:
          return state
    }
}

export const wordUpdateReducer = (state = { word: {} }, action) => {
    switch (action.type) {
        case WORD_UPDATE_REQUEST:
          return { loading: true }
        case WORD_UPDATE_SUCCESS:
          return { loading: false, success: true, word: action.payload }
        case WORD_UPDATE_FAIL:
          return { loading: false, error: action.payload }
        case WORD_UPDATE_RESET:
          return { product: {} }
        default:
          return state
      }
}

export const wordsByCategoryReducer = (state = { words: []}, action) => {
    switch (action.type) {
        case WORDS_BY_CATEGORY_REQUEST:
          return { loading: true, words: [] }
        case WORDS_BY_CATEGORY_SUCCESS:
          return { loading: false, words: action.payload.words }
        case WORDS_BY_CATEGORY_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
    }
}

export const wordsByTagReducer = (state = { words: []}, action) => {
    switch (action.type) {
        case WORDS_BY_TAG_REQUEST:
          return { loading: true, words: [] }
        case WORDS_BY_TAG_SUCCESS:
          return { 
            loading: false, 
            words: action.payload.words, 
            page: action.payload.page, 
            results: action.payload.results, 
            count: action.payload.count 
          }
        case WORDS_BY_TAG_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
    }
}

export const wordsByAuthorReducer = (state = { words: []}, action) => {
    switch (action.type) {
        case WORDS_BY_AUTHOR_REQUEST:
          return { loading: true, words: [] }
        case WORDS_BY_AUTHOR_SUCCESS:
          return { 
            loading: false, 
            words: action.payload.words,
            page: action.payload.page, 
            results: action.payload.results, 
            count: action.payload.count
          }
        case WORDS_BY_AUTHOR_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
    }
}

export const wordsByUserReducer = (state = { words: []}, action) => {
    switch (action.type) {
      case WORDS_BY_USER_REQUEST:
        return { loading: true, words: [] }
      case WORDS_BY_USER_SUCCESS:
        return { 
          loading: false, 
          words: action.payload.words,
          page: action.payload.page, 
          results: action.payload.results, 
          count: action.payload.count
        }
      case WORDS_BY_USER_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}

export const wordDownloadReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_DOWNLOAD_REQUEST:
      return { loading: true, download: [] }
    case WORD_DOWNLOAD_SUCCESS:
      return { loading: false, download: action.payload }
    case WORD_DOWNLOAD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const wordViewReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_VIEW_REQUEST:
      return { loading: true }
    case WORD_VIEW_SUCCESS:
      return { loading: false, success: true }
    case WORD_VIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const wordLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_LIKE_REQUEST:
      return { loading: true }
    case WORD_LIKE_SUCCESS:
      return { loading: false, success: true }
    case WORD_LIKE_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return state
  }
}

export const wordUnlikeReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_UNLIKE_REQUEST:
      return { loading: true }
    case WORD_UNLIKE_SUCCESS:
      return { loading: false, success: true }
    case WORD_UNLIKE_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return state
  }
}

export const wordCollectReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_COLLECT_REQUEST:
      return { loading: true }
    case WORD_COLLECT_SUCCESS:
      return { loading: false, success: true }
    case WORD_COLLECT_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return state
  }
}

// const initialState = {
//     words: [
//         {
//             id: 1,
//             title: "Dipesh",
//             category: "programmer"
//         }
//     ]
// }

// export default function(state = { words: [] }, action){
//     switch (action.type) {
//         case GET_WORDS:
//             return { ...state, words: action.payload }
//         case ADD_WORD:
//             return { ...state, addWord: action.payload.success, words: action.payload.words }
//         case DELETE_WORD:
//             return { ...state, addWord: action.payload }
//         default:
//             return state;
//     }
// }