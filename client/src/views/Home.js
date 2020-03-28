import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import AllPlans from "./AllPlans"
import axios from 'axios';

class Home extends Component {
  state = {
    check: false,
    loading: false
  };

  deleteAllPlans = () => {
    this.setState({loading : true})

    axios.delete("http://localhost:3001/api/deleteAllData", {})
        .then(res => {
          if(res.data.success) this.setState({ loading: false })
          else this.setState({ error: true })
        });
  }

  getBack = () => {
    this.setState({check : false})
  }

  render() {
    if(this.state.error) {
      return (<h1>There was an error while cleaning the databese</h1>)
    } else if(this.state.check) {
      return (<AllPlans getBack={this.getBack} />)
    }

    return (
      <div>
        <h2>Current Dinner Plans</h2>

        {this.state.loading && (
          <div>
            <h1>We are cleaning the database, give us a second</h1>
          </div> 
        )}

        <div>
          <Link to="/new_plan">Create new plan</Link>
        </div>
        <div>
          <button onClick={() => this.setState({check : true})}>Check all current plans</button>
        </div>
        <div>
          <button onClick={() => this.deleteAllPlans()}>Delete all current plans</button>
        </div>
      </div>
    );
  }
}

export default Home;
