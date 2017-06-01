import project from './projects';
describe('project', () => {

  it('should handle initial', () => {
    expect(project(void(0), 'test'))
      .toEqual([{
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
    }])
  });

  it('should handle addProject', () => {
    expect(project([{
        "title": "To Do",
        "bucketID": 0,
        "projects": [{
          "title": "Project Manhattan",
          "projectID": "project-1495906925134",
          "bucketID": 0,
          "position": 0
        }]
      }, {
        "title": "In Progress",
        "bucketID": 1,
        "projects": []
      }, {
        "title": "Done",
        "bucketID": 2,
        "projects": []
      }], {
        type: 'ADD_PROJECT',
        project: {
          title: 'Conquer the world',
          projectID: 'project-1495906925350',
          bucketID: 0
        }
      }))
      .toEqual([{
          "title": "To Do",
          "bucketID": 0,
          "projects": [
            {
              "title": "Project Manhattan",
              "projectID": "project-1495906925134",
              "bucketID": 0,
              "position": 0
            }, {
              title: "Conquer the world",
              projectID: "project-1495906925350",
              bucketID: 0,
              position: 1
            }

            ]
      }, {
          "title": "In Progress",
          "bucketID": 1,
          "projects": []
      }, {
          "title": "Done",
          "bucketID": 2,
          "projects": []
      }
      ])
  });

  it('should handle sortProject', () => {
    expect(project([{
        "title": "To Do",
        "bucketID": 0,
        "projects": [{
          "title": "Project Manhattan",
          "projectID": "project-1495983023557",
          "bucketID": 0,
          "position": 0
        }, {
          "title": "Project Manhattan",
          "projectID": "project-1495983430100",
          "bucketID": 0,
          "position": 1
        }, {
          "title": "Conquer the world",
          "projectID": "project-1495983440641",
          "bucketID": 0,
          "position": 2
        }]
      }, {
        "title": "In Progress",
        "bucketID": 1,
        "projects": []
      }, {
        "title": "Done",
        "bucketID": 2,
        "projects": []
      }], {
        type: 'SORT_PROJECT',
        project: {
          "projectID": "project-1495983451228",
          "title": "Drink Coffee",
          "bucketID": 0,
          "position": 1
        }
      }))
      .toEqual([{
        "title": "To Do",
        "bucketID": 0,
        "projects": [{
          "title": "Project Manhattan",
          "projectID": "project-1495983023557",
          "bucketID": 0,
          "position": 0
        }, {
          "projectID": "project-1495983451228",
          "title": "Drink Coffee",
          "bucketID": 0,
          "position": 1
        }, {
          "title": "Project Manhattan",
          "projectID": "project-1495983430100",
          "bucketID": 0,
          "position": 2
        }, {
          "title": "Conquer the world",
          "projectID": "project-1495983440641",
          "bucketID": 0,
          "position": 3
        }]
      }, {
        "title": "In Progress",
        "bucketID": 1,
        "projects": []
      }, {
        "title": "Done",
        "bucketID": 2,
        "projects": []
      }])
  });
});
