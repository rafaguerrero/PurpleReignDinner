import React, { Component } from "react";
import axios from 'axios';
import Match from "./Match";
import Chip from "./Chip";


const calculateNewVotes = (votes, like, name) => {  
  let newVotes = [],
      nameFound = false;

  for(var i = 0; i < votes.length; i++) {
    let current = votes[i];
    
    if(votes[i].name == name) {
      current.votes.push(like);
      nameFound = true;
    }

    newVotes.push(current);
  }

  if(!nameFound) {
    newVotes.push({
      name : name,
      votes : [like]
    }) 
  }

  return newVotes;
}

const updateVotes = (planData, like) => {
  let votes = planData.votes;

  if(votes.length == 0) {
    votes.push({
      name : this.state.name,
      votes : [like]
    })
  } else {
    votes = calculateNewVotes(votes, like, this.state.name);
  }

  return votes;
}

class Vote extends Component {
  state = {
    name: null,
    active: null,
    saving: false
  };

  start = () => {
    this.setState({ active: 0 });
  }

  checkMatches = (votes) => {
    let current = this.state.active;
    let matches = votes.filter(person => person.votes.length > current && 
                                          person.votes[current]).length
  
    if(matches > 1 && matches === votes.length) {
      this.setState({ match: this.props.planData.restaurants[current]})
    }
  }

  saveVote = (planData, votes) => {
    axios.post('http://localhost:3001/api/updateData', {
          id: planData._id,
          update: { votes : votes },
      }).then(() => {
        this.setState({ 
          saving: false,
          active: this.state.active + 1
        })
      })
  }

  vote = (like) => {
    this.setState({ 
      saving: true,
      match: null
    })

    this.props.updateData().then(() => {
      const planData = this.props.planData,
            votes = updateVotes(planData, like);
      
      this.checkMatches(votes);
      this.saveVote(planData, votes);
    })
  }

  render() {
    let restaurants = this.props.planData.restaurants,
        active = this.state.active;

    if(this.state.saving) {
      return (<div>
        <h3>Saving Data</h3>
        <p>Please wait a second</p>
      </div>)  
    }

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
        <div>
          {(this.state.match != null) && <Match restaurant={this.state.match}/>}
          <Chip restaurant={restaurants[active]} vote={this.vote}/>
        </div>
      );
    } else {
      return (<div>
        <h3>Congrats!</h3>
        <p>You have voted everything</p>
        <button onClick={() => this.props.getBack()}>Go Back</button>
      </div>)
    }
  }
}

export default Vote;
