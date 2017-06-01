import { ADD_PROJECT, SORT_PROJECT } from '../constants/actionTypes';

const initialState = [{
    title: 'To Do',
    bucketID: 0,
    projects: [],
  }, {
    title: 'In Progress',
    bucketID: 1,
    projects: [],
  }, {
    title: 'Done',
    bucketID: 2,
    projects: []
  }
];

const projects = (state = initialState, { type, project }) => {
  switch (type) {
    case ADD_PROJECT:
      // Find the bucket to which the new project is being added
      const { title, bucketID, projects } = state.find(bucket => bucket.bucketID === project.bucketID);
      // Update that bucket by adding the project to the end.
      return [{
        title,
        bucketID,
        projects: [ ...projects, { ...project, position: projects.length } ]
      },
      // Add rest of the buckets back to the state
      ...state.filter(bucket => bucket.bucketID !== project.bucketID)
      // Sort buckets to ensure order of buckes is intact
      ].sort((bucket1, bucket2) => bucket1.bucketID - bucket2.bucketID)
      // Sorting can be avoided by adding the bucket it the correct position,
      // but for a small number of buckets this provides better readability with an insignificant performance hit.

    case SORT_PROJECT:
      return state.map(bucket => {
        // Delete project from it's current bucket.
        const updatedProjectsList = bucket.projects.filter(({ projectID }) => projectID !== project.projectID);
        if (bucket.bucketID === project.bucketID) {
          return Object.assign({}, bucket, {
            projects: [
              ...updatedProjectsList
                .slice(0, project.position)
                // Update the positions of all projects above
                .map((projectsAbove, idx) => ({ ...projectsAbove, position: idx})),
              // Add the project to it's new bucket, in it's new positions
              { ...project },
              ...updatedProjectsList
                .slice(project.position)
                // Update the positions of all projects below
                .map((projectsBelow, idx) => {
                  return {...projectsBelow, position: project.position + idx + 1 }
                })
            ]
          });
        }
        // Return a new buckets list with the updated projects list
        return Object.assign(
          {},
          bucket,
          { projects: updatedProjectsList }
        )
      })
    default:
      return state
  }
}

export default projects;
