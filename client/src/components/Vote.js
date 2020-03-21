import React, { Component } from "react";
import axios from 'axios';
import Chip from "./Chip";

class Vote extends Component {
  state = {
    name: null,
    active: null,
    dataSaved: false,
    current: []
  };

  start = () => {
    this.setState({ active: 0 });
  }

  vote = (like) => {
    this.state.current.push(like);
    this.setState({ active: this.state.active + 1 });

    if(this.state.active == this.props.planData.restaurants.length - 1) {
      this.finish();
    }
  }

  finish = () => {
    let planData = this.props.planData,
        votes = planData.votes;

    votes.push({
      name : this.state.name,
      votes : this.state.current
    })

    axios.post('http://localhost:3001/api/updateData', {
      id: planData._id,
      update: { votes : votes },
    })
    .then(() => this.setState({ dataSaved: true }))
  }

  render() {
    let restaurants = this.props.planData.restaurants,
        active = this.state.active;

    if(active == null) {
      return (
        <div>
          <h3>Vote</h3>
          <input
                type="text"
                style={{ width: "200px" }}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="Put your name"
              /><br/>
            <button onClick={() => this.start(this.state.location)}>Start vote</button>
            <button onClick={() => this.props.getBack()}>Go Back</button>
        </div>
      );
    } else if(active < restaurants.length) {
      return (
        <Chip restaurant={restaurants[active]} vote={this.vote}/>
      );
    } else {
      if(!this.state.dataSaved) {
        return (<div>
          <h3>Saving Data</h3>
          <p>Please wait a second</p>
        </div>)  
      }

      return (<div>
        <h3>Congrats!</h3>
        <p>You have voted everything</p>
        <button onClick={() => this.props.getBack()}>Go Back</button>
      </div>)
    }
  }
}

export default Vote;
