import React, { Component } from "react";

class Scroll extends Component {
  render() {
    return (
      <div
        style={{
          overflow: "scroll",
          height: "75vh",
          // boxShadow: "inset 0px 0px 10px black",
          // padding: "30px 0px",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
export default Scroll;
