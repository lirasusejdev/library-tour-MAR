import React from 'react';
import { MicrofrontendContext } from "../microfrontend-context";

class ImageWithHost extends React.Component {
  render() {
    const { className, src, alt } = this.props;
    const { host } = this.context;

    return (
      <img
        className={className}
        src={`${host}/${src}`}
        alt={alt}
      />
    );
  }
};
ImageWithHost.contextType = MicrofrontendContext;

export default ImageWithHost;
