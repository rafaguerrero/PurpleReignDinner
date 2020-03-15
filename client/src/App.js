// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Plan from './Plan';

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  createId = () => {
    return Math.round(1 + Math.random() * (1000 - 1));
  }

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = () => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;

    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: `plan_${this.createId()}`,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <Router>
        <Switch>
            <Route exact path="/">
              <div>
                <h2>Current Dinner Plans</h2>
                <ul>
                  {data.length <= 0
                    ? 'NO DINNER PLANS YET'
                    : data.map((dat) => (
                        <li style={{ padding: '10px' }} key={data.message}>
                          <Link to={`/${dat.message}`}>ID: {dat.id} - {dat.message}</Link>
                        </li>
                      ))}
                </ul>
                <div style={{ padding: '10px' }}>
                  <button onClick={() => this.putDataToDB()}>
                    CREATE DINNER PLAN
                  </button>
                </div>
                <div style={{ padding: '10px' }}>
                  <input
                    type="text"
                    style={{ width: '200px' }}
                    onChange={(e) => this.setState({ idToDelete: e.target.value })}
                    placeholder="put id of item to delete here"
                  />
                  <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                    DELETE
                  </button>
                </div>
              </div>
            </Route>
            <Route path="/:id" children={<Plan />} />
        </Switch>
    </Router>
    );
  }
}

export default App;