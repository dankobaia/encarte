import React from "react";
import PropTypes from "prop-types";
import "./selector.css";

import { Button } from "react-bootstrap";

export class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: props.top,
      left: props.left,
      width: props.width,
      height: props.height,
      color: props.color,
      id: props.id
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.top !== prevState.top) this.setState({ top: prevProps.top });
    if (prevProps.left !== prevState.left)
      this.setState({ left: prevProps.left });
    if (prevProps.width !== prevState.width)
      this.setState({ width: prevProps.width });
    if (prevProps.height !== prevState.height)
      this.setState({ height: prevProps.height });
  }

  render() {
    const { id, top, left, width, height, color } = this.state;
    return (
      <div
        id={id}
        className="selector"
        style={{
          top: top,
          left: left,
          width: width,
          height: height,
          backgroundColor: color
        }}
      >
        {this.props.remove && (
          <Button
            size="sm"
            variant="outline-danger"
            onClick={this.props.remove}
          >
            X
          </Button>
        )}
      </div>
    );
  }
}
Selector.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  remove: PropTypes.func
};
