import { combineReducers } from 'redux';
import dragged from './dragged';
import buckets from './projects'

const taskManager = combineReducers({
  dragged,
  buckets
})

export default taskManager
