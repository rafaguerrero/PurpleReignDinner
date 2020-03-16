import React, { Component } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

class Plan extends Component {
  state = {
    data: [],
    intervalIsSet: false
  };

  getDataFromDb = () => {
    axios.post('http://localhost:3001/api/getData', {
      data: {
        id: 123,
      },
    });
  };

  render() {
    return <ID />;
  }
}

function ID() {
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export default Plan;
