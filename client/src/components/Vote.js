import React, { Component } from "react";

class Vote extends Component {
  state = {
    data: null,
    name: null,
  };

  start = () => {
    console.log("Start vote");
  }

  render() {
    return (
      <div>
        <h3>Vote</h3>
        <input
              type="text"
              style={{ width: "200px" }}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Put your name"
            /><br/>
          <button onClick={() => this.start(this.state.location)}>
            Start vote
          </button>
      </div>
    );
  }
}

export default Vote;
