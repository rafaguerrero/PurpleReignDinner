import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/getAllData")
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <h2>Current Dinner Plans</h2>
        <ul>
          {data.length <= 0
            ? "NO DINNER PLANS YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={data.id}>
                  <Link to={`/plan/${dat.id}`}>
                    Plan -> {dat.id}
                  </Link>
                </li>
          ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <Link to="/new_plan">New Plan</Link>
        </div>
      </div>
    );
  }
}

export default Home;
