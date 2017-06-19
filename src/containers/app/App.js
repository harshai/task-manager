import React from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TaskManagerActions from '../../actions';
import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import './App.css';

const App = ({ buckets, total, actions, dragged }) => {
  const { addProject, sortProject, dragStart, dragEnd } = actions;
  const dragActions = {
    sortProject,
    dragStart,
    dragEnd,
  }

  return <div>
    <Header addProject={addProject} total={total} />
    <Main
      dragActions={dragActions}
      buckets={buckets}
      dragged={dragged}
    />
    <footer>
      <a className="footer__link" href="https://github.com/harshai/task-manager">Source</a>
    </footer>
  </div>
};

const getTotalProjects = buckets => buckets.reduce((prev, curr) => {
  return prev + curr.projects.length;
}, 0);

const mapStateToProps = ({ buckets, dragged }) => {
  return {
    total: getTotalProjects(buckets),
    buckets: buckets,
    dragged
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(TaskManagerActions, dispatch)
  };
}

App.propTypes = {
  buckets: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
}

const DragDropApp = DragDropContext(HTML5Backend)(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DragDropApp);
