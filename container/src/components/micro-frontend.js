import React from 'react';
const url = require('url');

class MicroFrontend extends React.Component {
  name = null;
  host = null;
  hostHash = null;

  componentDidMount() {
    const { host } = this.props;
    const scriptTag = document.getElementById(this.getScriptId());

    if (scriptTag) {
      this.name = scriptTag.dataset.microFrontendName;
      this.renderMicroFrontend();
      return;
    }

    fetch(`${host}/microfrontend-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        this.name = manifest['microfrontendname'];

        const script = document.createElement('script');
        script.dataset.microFrontendName = manifest['microfrontendname'];
        script.id = this.getScriptId();
        script.crossOrigin = '';
        script.src = url.resolve(host, manifest['main.js']); // Default name in a create-react-app application
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);

        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = url.resolve(this.props.host, manifest['main.css']); // Default name in a create-react-app application
        document.head.appendChild(style);
      });
  }

  componentDidUpdate() {
    this.renderMicroFrontend();
  }

  getScriptId() {
    return `micro-frontend-script-${this.getHostHash()}`;
  }

  getHostHash() {
    if (!this.hostHash) {

      var h = 0, l = this.host.length, i = 0;
      if (l > 0)
        while (i < l)
          h = (h << 5) - h + this.host.charCodeAt(i++) | 0;

      this.hostHash = h;
    }

    return this.hostHash
  }

  componentWillUnmount() {
    const unmount = window[`unmount${this.name}`];

    if (unmount) unmount(`${this.getHostHash()}`);
  }

  renderMicroFrontend = () => {
    const render = window[`render${this.name}`];

    if (render) {
      const { history, path, host, containerContext } = this.props;
  
      render(`${this.getHostHash()}`, history, path, host, containerContext);
    }
  };

  render() {
    const { host } = this.props;
    this.host = host;

    return <main id={`${this.getHostHash()}`} />;
  }
}

export default MicroFrontend;
