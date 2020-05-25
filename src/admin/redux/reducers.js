import { combineReducers } from 'redux';

import ui from './modules/ui/reducer'
import fb from './modules/fb/reducer'
import wp from './modules/wp/reducer'

const reducers = combineReducers({
  ui,
  fb,
  wp
});

export default reducers;