import React from 'react';

const CONTAINER_HOST = 'http://localhost:3000';

class ImageWithHost extends React.Component {
  render() {
    const { className, src, alt } = this.props;

    return (
      <img
        className={className}
        src={`${CONTAINER_HOST}/${src}`}
        alt={alt}
      />
    );
  }
};

export default ImageWithHost;
