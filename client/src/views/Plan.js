import React, { Component } from "react";
import axios from 'axios';
import NotFound from "./NotFound";

class Plan extends Component {
  state = {
    id: 0,
    data: null,
    success: false,
    error: null,
    intervalIsSet: false
  };

  componentDidMount() {
    const { match: { params } } = this.props;

    this.setState({ id: params.id });

    axios.post('http://localhost:3001/api/getData', {
      id: params.id,
    })
    .then(res => { return !!res.json ? res.json() : res.data; })
    .then((res) => {
      this.setState({ 
        data: res.data,
        success: res.success,
        error: res.error
      });
    })
  }

  render() {
    const { data } = this.state;

    if(this.state.success && this.state.data == null) {
      return (<NotFound/>);
    }

    return (
      <div>
        <h3>ID: {this.state.id}</h3>

        {this.state.success && (
          <div>
            <h4>DATA</h4>
            <ul>
                <li>Location : {data.location}</li>
                <li>Options : {data.options.length}</li>
                {(data.options.length < 0) &&
                  data.options.map(dat => (
                    <li class="sublist" key={data.name}>{dat.name}</li>
                  )
                )}
                <li>Votes : {data.votes.length}</li>
                {(data.votes.length < 0) &&
                  data.votes.map(dat => (
                    <li class="sublist" key={data.name}>{dat.name}</li>
                  )
                )}
            </ul>
          </div>
        )}

        {(!!this.state.error) && (
            <p>{this.state.error.message}</p>
        )}
      </div>
    );
  }
}

export default Plan;
