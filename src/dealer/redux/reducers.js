import { combineReducers } from 'redux';

import ui from './modules/ui/reducer'
import fb from './modules/fb/reducer'
import data from './modules/data/reducer'

const reducers = combineReducers({
  ui,
  fb,
  data
});

export default reducers;