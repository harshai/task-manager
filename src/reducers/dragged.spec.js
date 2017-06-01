import dragged from './dragged';

describe('dragged', () => {
  it('should handle initial state', () => {
    expect(dragged(void(0), {})).toEqual({});
  });

  it('should handle dragStart', () => {
    expect(dragged({}, {
      type: 'DRAG_START',
      project: {
        title: 'Conquer the world',
        projectID: 'id1',
        bucketID: 0
      }
    })).toEqual({
      title: 'Conquer the world',
      projectID: 'id1',
      bucketID: 0
    })
  });

  it('should handle dragEnd', () => {
    expect(dragged({
      project: {
        title: 'Conquer the world',
        projectID: 'id1',
        bucketID: 0
      }
    }, {
      type: 'DRAG_END'
    })).toEqual({});
  });
});
