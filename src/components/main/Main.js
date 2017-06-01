import React from 'react';
import PropTypes from 'prop-types';
import Bucket from '../bucket/Bucket';
import './Main.css';

const Main = (props) => {
  const { buckets, dragActions, dragged } = props;
 return <main className='main'>
    {buckets.map(bucket => <Bucket
      key={bucket.bucketID}
      dragged={dragged}
      {...bucket}
      {...dragActions} />)}
  </main>
};

Main.propTypes = {
  buckets: PropTypes.arrayOf(PropTypes.shape({
    bucketID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    projects: PropTypes.array.isRequired
  }))
}

export default Main;
