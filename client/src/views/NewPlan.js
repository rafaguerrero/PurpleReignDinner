import React, { Component } from "react";
import axios from 'axios';
import RestaurantsJson from "../_temp/RestaurantsAPI";
import "../css/NewPlan.css"

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
      if(res.success) {
        window.location.href = `/plan/${this.state.id}`;
      } else {
        this.setState({ 
          loading: false,
          error: res.error && res.error.message 
        });
      }
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
      error: false
    });

    this.getRestaurants()
        .then(this.saveNewPlan)
        .catch(this.error);
  };

  render() {
    return (
      <div id="new_plan">
        <h2>Create New Plan</h2>

        <div class="form">
          <input type="text" className="input location"
              onChange={e => this.setState({ location: e.target.value })}
              placeholder="Put the zip code" />

          <div class="button">
            <button onClick={() => this.createNewPlan(this.state.location)}>CREATE DINNER PLAN</button>
          </div>
        </div>

        {(!!this.state.loading || !!this.state.error) && (
          <div class="message">
            {!!this.state.loading && (<p>Creating new plan</p>)}

            {(!!this.state.error) && (
              <span>
                <p>There was an error on creation please try again</p>
                <p>{this.state.error}</p>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default NewPlan;
