import React, { Component } from "react";

class Chip extends Component {
  render() {
    let rest = this.props.restaurant;

    return (
      <div>
        <h2>Restaurant</h2>
        <h2>Name : {rest.name}</h2>

        <button onClick={() => this.props.vote(true)}>Yes</button>
        <button onClick={() => this.props.vote(false)}>No</button>
      </div>
    );
  }
}

export default Chip;
