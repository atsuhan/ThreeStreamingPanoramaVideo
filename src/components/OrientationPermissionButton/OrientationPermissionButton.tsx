import React from 'react';

interface Props {
  onClick: Function;
}

interface State {
  isView: boolean;
}

const buttonStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 50,
};

class OrientationPermissionButton extends React.Component<Props, State> {
  isIOS13 =
    typeof DeviceMotionEvent !== 'undefined' &&
    typeof DeviceMotionEvent.requestPermission === 'function';

  constructor(props: Props) {
    super(props);
    this.state = { isView: this.isIOS13 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(): void {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          this.props.onClick();
          this.setState((state) => ({
            isView: !state.isView,
          }));
        }
      })
      .catch(console.error);
  }

  render(): React.ReactElement {
    if (this.state.isView)
      return (
        <button type='button' onClick={this.handleClick} style={buttonStyle}>
          Please permit orientation
        </button>
      );
    return <></>;
  }
}
export default OrientationPermissionButton;
