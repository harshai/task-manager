import * as actions from './index';

describe('projectManager actions', () => {
  it('should create addProject action', () => {
    expect(actions.addProject({
      title: "Conquer the world",
      projectID: "id1"
    })).toEqual({
      project: {
        bucketID: 0,
        projectID: "id1",
        title: "Conquer the world"
      },
      type: "ADD_PROJECT",
    });

    expect(actions.addProject({
      title: 'Conquer the world',
      projectID: 'id2',
      bucketID: 1
    })).toEqual({
      project: {
        bucketID: 1,
        projectID: 'id2',
        title: 'Conquer the world'
      },
      type: 'ADD_PROJECT'
    });
  });

  it('should create sortProject action', () => {
    expect(actions.dragStart({
      title: 'Conquer the world',
      projectID: 'id2',
      bucketID: 1,
    })).toEqual({
      project: {
        bucketID: 1,
        projectID: 'id2',
        title: 'Conquer the world'
      },
      type: 'DRAG_START'
    })
  });

  it('should create dragStart action', () => {
    expect(actions.dragStart({
      projectID: 'id2',
      title: 'Conquer the world',
      bucketID: 0,
      position: 0
    })).toEqual({
      project: {
        projectID: 'id2',
        title: 'Conquer the world',
        bucketID: 0,
        position: 0
      },
      type: 'DRAG_START'
    })
  });

  it('should create dragEnd action', () => {
    expect(actions.dragEnd()).toEqual({
      type: 'DRAG_END',
    });
  });
});
