import React, { Component } from "react";

class Chip extends Component {
  render() {
    let rest = this.props.restaurant;
    
    return (
      <div>

        <hr/>

        <img src={rest.photo.url}/>
        <h2>Name : {rest.name}</h2>
        <h2>Rating : {rest.rating}</h2>
        <h2>Description : {rest.description}</h2>
        <h2>Phone : {rest.phone}</h2>
        <h2>Address : {rest.address}</h2>

        <hr/>

        <button onClick={() => this.props.vote(true)}>Yes</button>
        <button onClick={() => this.props.vote(false)}>No</button>
      </div>
    );
  }
}

export default Chip;
