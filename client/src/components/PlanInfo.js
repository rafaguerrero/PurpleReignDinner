import React, { Component } from "react";

class PlanInfo extends Component {
  render() {
    const data = this.props.planData;

    return (
      <div>
        <h4>Plan {data.id}</h4>
        <ul>
            <li>Location : {data.location}</li>
            <li>Options : {data.options.length}</li>
            {(data.options.length > 0) &&
              data.options.map(dat => (
                <li class="sublist" 
                    style={{marginLeft : "30px"}}
                    key={data.name}>
                  {dat.name}
                </li>
              )
            )}
            <li>Votes : {data.votes.length}</li>
            {(data.votes.length > 0) &&
              data.votes.map(dat => (
                <li class="sublist" 
                    style={{marginLeft : "30px"}}
                    key={data.name}>
                  {dat.name}
                </li>
              )
            )}
        </ul>
      </div>
    );
  }
}

export default PlanInfo;
