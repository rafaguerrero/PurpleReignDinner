import React, { Component } from "react";

class Match extends Component {
  render() {
    return (
      <div>
        You have a match!
        
        <button onClick={() => this.props.vote(true)}>Continue voting</button>
        <button onClick={() => this.props.vote(false)}>Check match</button>
      </div>
    );
  }
}

export default Match;
