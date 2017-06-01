import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from 'react-dnd';
import Project from "../project/Project";
import "./Bucket.css";

// Allow drops in adjacent columns buckets only
const isDropAllowed = (currBucket, targetbucket) => Math.abs(currBucket - targetbucket) <= 1;

const Bucket = (props) => {
  const {
    title,
    bucketID,
    projects,
    isOver,
    dragStart,
    dragEnd,
    sortProject,
    connect,
    dragged
  } = props;

  const canDrop = isOver && isDropAllowed(dragged.bucketID, bucketID);
  const cannotDrop = isOver && !isDropAllowed(dragged.bucketID, bucketID);

  let classNames = 'bucket ';
  if (canDrop) {
    classNames+='bucket--droppable';
  }
  if (cannotDrop) {
    // Info message is shown using CSS psuedo element in bucket.css
    classNames+='bucket--not-droppable';
  }

  return connect(
    <div id={`bucket-${bucketID}`} className={classNames}>
      <h2 className="bucket__title">{title}
        <span className="bucket__total">
          <em>{projects.length} </em>project{`${projects.length === 1 ? '' : 's'}`}
        </span>
      </h2>
      <ul className="bucket__content">
        {projects.map(project => <Project
          key={project.projectID}
          dragStart={dragStart}
          dragEnd={dragEnd}
          sortProject={sortProject}
          isOver={isOver}
          dragged={dragged}
          {...project}
        />)}
      </ul>
    </div>
  );
};

const handleHover = {
  // Handles drop over bucket
  hover(props, monitor) {
    const { projectID, title, bucketID } = props.dragged;
    const newBucketID = props.bucketID;

    if (!isDropAllowed(bucketID, newBucketID)) {
      return;
    }

    if (!monitor.isOver({ shallow: true })) return;
    // Handle drop in a bucket.
    // Drops over other prjectes are handled by the Project component itself
      props.sortProject({
        projectID,
        title,
        position: props.projects.length,
        bucketID: newBucketID,
      })
  }
};

const collect = (connect, monitor) => ({
  connect: connect.dropTarget(),
  isOver: monitor.isOver(),
});

Bucket.propTypes = {
  title: PropTypes.string.isRequired,
  bucketID: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
  isOver: PropTypes.bool.isRequired,
  connect: PropTypes.func.isRequired,
}

export default DropTarget('project', handleHover, collect)(Bucket);
