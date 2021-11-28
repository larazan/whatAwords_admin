import { combineReducers } from 'redux';
import user from './user_reducer';
import words from './words_reducer';
import tags from './tags_reducer';
import categories from './category_reducer';
import authors from './authors_reducer';

const rootReducer = combineReducers({
    user,
    words,
    tags,
    categories,
    authors,
});

export default rootReducer;