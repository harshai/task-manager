import * as types from '../constants/actionTypes.js';

export const addProject = ({ title, projectID, bucketID = 0}) => ({
  type: types.ADD_PROJECT,
  project: {
    title,
    projectID,
    bucketID,
  }
});

export const sortProject = ({ title, projectID, bucketID, position }) => ({
  type: types.SORT_PROJECT,
  project: {
    projectID,
    title,
    bucketID,
    position,
  }
});

export const dragStart = ({ title, projectID, bucketID, position }) => ({
  type: types.DRAG_START,
  project: {
    projectID,
    title,
    bucketID,
    position,
  }
});

export const dragEnd = () => ({
  type: types.DRAG_END,
});
