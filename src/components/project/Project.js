import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import './Project.css';

// Allow drops in adjacent columns buckets only
const isDropAllowed = (currBucket, targetbucket) => Math.abs(currBucket - targetbucket) <= 1;

const projectSource = {
  beginDrag(props) {
    const {
      title,
      projectID,
      position,
      bucketID,
      dragStart
    } = props;

    dragStart({
      title,
      projectID,
      position,
      bucketID,
    });

    return {
      title,
      projectID,
      position,
      bucketID,
    }
  },

  endDrag(props) {
    props.dragEnd()
  },
};

const projectTarget = {
  // Handles drop over another project
  hover(props, monitor, component) {
    // Let Bucket component handle the drop
    if (!monitor.isOver({ shallow: true })) {
      return;
    }

    const { projectID, title } = props.dragged;
    const { bucketID } = props;

    if (!isDropAllowed(props.dragged.bucketID, bucketID)) {
      return;
    }

    const dragPosition = monitor.getItem().position;
    const hoverPosition = props.position;

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging down and mouse is in upper half of the lower project
    if (dragPosition < hoverPosition && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging up and mouse is in lower half of the upper project
    if (dragPosition > hoverPosition && hoverClientY > hoverMiddleY) {
      return;
    }

    props.sortProject({
      projectID,
      title,
      bucketID,
      position: hoverPosition,
    });
  },
}

const connectSource = connect => ({
  connectDragSource: connect.dragSource(),
});

const connectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
});

class Project extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    projectID: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    bucketID: PropTypes.number.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  }

  render() {
    const {
      title,
      projectID,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    const isBeingDragged = this.props.dragged.projectID === this.props.projectID
    return connectDragSource(connectDropTarget(
      <li className={`project ${isBeingDragged ? 'project--dragging' : ''}`} id={projectID}>{title}</li>
    ));
  }
}

const targetHOC = DropTarget('project', projectTarget, connectTarget)(Project);
export default DragSource('project', projectSource, connectSource)(targetHOC);
