import { DRAG_START, DRAG_END } from '../constants/actionTypes';

const initialState = {};

const dragged = (state = initialState, { type, project }) => {
  switch (type) {
    case DRAG_START:
      return Object.assign({}, state, { ...project });
    case DRAG_END:
      return {};
    default:
      return state;
  }
}

export default dragged;
