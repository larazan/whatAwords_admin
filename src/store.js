import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  authorsListReducer,
  authorDetailReducer,
  authorDeleteReducer,
  authorCreateReducer,
  authorUpdateReducer,
  authorByAlphabetReducer,
  authorByNameReducer,
} from './reducers/authors_reducer'
import {
  categoriesListReducer,
  categoryListReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
} from './reducers/category_reducer'
import {
  tagsListReducer,
  tagListReducer,
  tagDetailReducer,
  tagDeleteReducer,
  tagCreateReducer,
  tagUpdateReducer,
} from './reducers/tags_reducer'

import {
  wordsListReducer,
  wordListReducer,
  wordDeleteReducer,
  wordCreateReducer,
  wordUpdateReducer,
  wordsByCategoryReducer,
  wordsByTagReducer,
  wordsByAuthorReducer,
  wordDownloadReducer,
  wordViewReducer,
  wordsSearchReducer,
  wordLikeReducer,
  wordUnlikeReducer,
  wordCollectReducer,
  wordsByUserReducer,
} from './reducers/words_reducer'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userFollowReducer,
  userUnfollowReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  userDetailReducer,
  userFollowerReducer,
  userFollowingReducer,
  userCollectionReducer,
} from './reducers/user_reducer'

import {
  articlesListReducer,
  articleDetailReducer,
  articleDeleteReducer,
  articleCreateReducer,
  articleUpdateReducer,
  articleBySlugReducer,
} from './reducers/articles_reducer'

import {
  faqsListReducer,
  faqDetailReducer,
  faqDeleteReducer,
  faqCreateReducer,
  faqUpdateReducer,
} from './reducers/faq_reducer'

import { themeReducer } from './reducers/theme_reducer'

const reducer = combineReducers({
  authorsList: authorsListReducer,
  authorDetail: authorDetailReducer,
  authorDelete: authorDeleteReducer,
  authorCreate: authorCreateReducer,
  authorUpdate: authorUpdateReducer,
  authorByAlphabet: authorByAlphabetReducer,
  authorByName: authorByNameReducer,
  categoriesList: categoriesListReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  tagsList: tagsListReducer,
  tagList: tagListReducer,
  tagDetail: tagDetailReducer,
  tagDelete : tagDeleteReducer,
  tagCreate : tagCreateReducer,
  tagUpdate : tagUpdateReducer,
  wordsList: wordsListReducer,
  wordList: wordListReducer,
  wordsSearch: wordsSearchReducer,
  wordDelete: wordDeleteReducer,
  wordCreate: wordCreateReducer,
  wordUpdate: wordUpdateReducer,
  wordsByCategory: wordsByCategoryReducer,
  wordsByTag: wordsByTagReducer,
  wordsByAuthor: wordsByAuthorReducer,
  wordDownload: wordDownloadReducer,
  wordView: wordViewReducer,
  wordLike: wordLikeReducer,
  wordUnlike: wordUnlikeReducer,
  wordCollect: wordCollectReducer,
  wordsByUser: wordsByUserReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userFollow: userFollowReducer,
  userUnfollow: userUnfollowReducer,
  userDetail: userDetailReducer,
  userFollower: userFollowerReducer,
  userFollowing: userFollowingReducer,
  userCollection: userCollectionReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  articlesList: articlesListReducer,
  articleDetail: articleDetailReducer,
  articleDelete: articleDeleteReducer,
  articleCreate: articleCreateReducer,
  articleUpdate: articleUpdateReducer,
  articleBySlug: articleBySlugReducer,
  faqsList: faqsListReducer,
  faqDetail: faqDetailReducer,
  faqDelete: faqDeleteReducer,
  faqCreate: faqCreateReducer,
  faqUpdate: faqUpdateReducer,
  themeRed: themeReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
