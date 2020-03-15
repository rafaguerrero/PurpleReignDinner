import React, { Component } from "react";
import { useParams } from "react-router-dom";


class Plan extends Component { 
    render() {
        return <ID/>
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