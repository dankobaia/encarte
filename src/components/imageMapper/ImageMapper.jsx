import React from "react";
import PropTypes from "prop-types";

import { Selector } from "./selector";

const inital = {
  pressing: false,
  startPosition: null,
  selectorId: null,
  width: 30,
  height: 30,
  endPosition: null,
  squares: []
};

export class ImageMapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = inital;

    this.imageBox = React.createRef();
  }

  onMouseDown = e => {
    let { x, y } = this.imageBox.current.getBoundingClientRect();
    this.setState({
      pressing: true,
      selectorId:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      startPosition: {
        x: e.nativeEvent.offsetX + x + window.pageXOffset - inital.width / 2,
        y: e.nativeEvent.offsetY + y + window.pageYOffset - inital.height / 2
      }
    });
  };
  onMouseUp = e => {
    e.preventDefault();
    let { squares } = this.state;

    if (!this.state.startPosition) return;

    let square = {
      id: this.state.selectorId,
      top: this.state.startPosition.y,
      left: this.state.startPosition.x,
      width: this.state.width,
      height: this.state.height
    };
    squares.push(square);
    this.setState({
      ...inital,
      squares: squares
    });
  };
  onMouseMove = e => {
    e.preventDefault();
    if (this.state.pressing && e.target.id === this.state.selectorId) {
      this.setState({
        width: e.nativeEvent.offsetX + inital.width,
        height: e.nativeEvent.offsetY + inital.height
      });
    }
  };

  removeSquare = id => {
    const squares = this.state.squares.filter(i => i.id !== id);
    this.setState({
      squares: squares
    });
  };
  render() {
    return (
      <div onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}>
        {this.state.pressing && (
          <Selector
            id={this.state.selectorId}
            key={this.state.selectorId}
            top={this.state.startPosition.y}
            left={this.state.startPosition.x}
            width={this.state.width}
            height={this.state.height}
            color="#9799e08c"
          />
        )}
        {this.state.squares.map(square => {
          return (
            <Selector
              key={square.id}
              id={square.id}
              top={square.top}
              left={square.left}
              width={square.width}
              height={square.height}
              color="#9fe097a3"
              remove={() => this.removeSquare(square.id)}
            />
          );
        })}
        <div onMouseDown={this.onMouseDown} ref={this.imageBox}>
          <img id="img" src={this.props.image} className="App" alt="logo" />
        </div>
      </div>
    );
  }
}

ImageMapper.propTypes = {
  image: PropTypes.string.isRequired
};
