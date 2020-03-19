import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import RestaurantsJson from "../_temp/Restaurants";

class NewPlan extends Component {
  state = {
    location: null,
    success: false,
    error: null,
    id: 0,
    loading: false
  };

  createId = () => {
    return Math.round(1 + Math.random() * (10000 - 1));
  };

  createNewPlan = (location) => {
    let id = this.createId();

    this.setState({ 
      id: id,
      loading: true,
      success: false,
      error: false
    });

    axios.post("http://localhost:3001/api/putData", {
      id: id,
      location: location,
      restaurants: RestaurantsJson,
      votes: [],
    })
    .then(res => { return !!res.json ? res.json() : res.data; })
    .then((res) => {
      this.setState({ 
        loading: false,
        success: res.success, 
        error: res.error && res.error.message 
      });
    })
  };

  render() {
    return (
      <div>
        <h2>Create New Plan</h2>

        <div style={{ padding: "10px" }}>
          <input
              type="text"
              style={{ width: "200px" }}
              onChange={e => this.setState({ location: e.target.value })}
              placeholder="Put the zip code"
            />
          <button onClick={() => this.createNewPlan(this.state.location)}>CREATE DINNER PLAN</button>
        </div>

        {this.state.loading && (
            <p>Creating new plan</p>
        )}

        {this.state.success && (
            <Link to={`/plan/${this.state.id}`}> 
              Create new plan successfull - {this.state.id} 
            </Link>
        )}

        {(!!this.state.error) && (
          <div>
            <p>There was an error on creation please try again</p>
            <p>{this.state.error}</p>
          </div>
        )}
      </div>
    );
  }
}

export default NewPlan;
