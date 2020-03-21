import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import RestaurantsJson from "../_temp/RestaurantsAPI";


const LOCATION_API_SRC = "https://tripadvisor1.p.rapidapi.com/locations/search?limit=1&query=";
const RESTAURANT_API_SRC = "https://tripadvisor1.p.rapidapi.com/restaurants/list?limit=10&currency=USD&lang=en_US&location_id=";
const API_INFO = {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "910f707132msh1d9d300233d8274p1438f6jsnc705bea459db"
  }
};

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

  getRestaurants = () => {
    /*
    // -------- PRODUCTION API --------
    let loc = encodeURIComponent(this.state.location);
    return fetch(LOCATION_API_SRC + loc, API_INFO)
              .then(res => res.json())
              .then(response => response.data[0].result_object.location_id)
              .then(id => fetch(RESTAURANT_API_SRC + id, API_INFO))
              .then(res => res.json())
    */

    return Promise.resolve(RestaurantsJson)
  }

  cleanRestaurants = (restaurants) => {
    var clean = [];

    restaurants.data
        .filter(rest => rest.name != null)
        .forEach(rest => {
          clean.push({
            name : rest.name,
            rating : rest.rating,
            description : rest.description,
            url: rest.web_url,
            phone: rest.phone,
            address: rest.address,
            photo: rest.photo.images.medium
          })
    });

    return clean;
  }

  saveNewPlan = (restaurants) => {
    return axios.post("http://localhost:3001/api/putData", {
        id: this.state.id,
        location: this.state.location,
        restaurants: this.cleanRestaurants(restaurants),
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
  }

  error = (err) => {
    console.log("------- ERROR -------");
    console.log(err);
    console.log("---------------------")
  }

  createNewPlan = (location) => {
    this.setState({ 
      id: this.createId(),
      location: location,
      loading: true,
      success: false,
      error: false
    });

    this.getRestaurants()
        .then(this.saveNewPlan)
        .catch(this.error);
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
