import React, { Component } from "react";

class Scroll extends Component {
  render() {
    return (
      <div
        style={{
          overflow: "scroll",
          height: `${(window.innerHeight / 100) * 80}px`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
export default Scroll;
