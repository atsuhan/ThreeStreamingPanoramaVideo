/**
 * Component : add script tag
 */

import React from 'react';

type AttrProps = {
  src: string;
  name: string;
  isAsync: boolean;
};

export default class ScriptTag extends React.Component<AttrProps> {
  static defaultProps: AttrProps = {
    src: `//scripturl`,
    name: Math.random().toString(),
    isAsync: false,
  };

  componentDidMount = () => {
    const script = document.createElement(`script`);

    script.async = this.props.isAsync || false;
    script.src = this.props.src;

    const el = document.getElementById(this.props.name);
    if (el) el.replaceWith(script);
  };

  render() {
    return <div id={this.props.name} />;
  }
}
