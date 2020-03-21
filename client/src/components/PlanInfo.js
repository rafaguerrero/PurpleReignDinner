import React, { Component } from "react";

class PlanInfo extends Component {
  countLikes = (index) => {
    return this.props.planData.votes.filter(vote => vote.votes[index]).length;
  }

  render() {
    const data = this.props.planData;
    let index = -1;

    return (
      <div>
        <h4>Plan {data.id}</h4>
        <ul>
            <li>Location : {data.location}</li>
            <li>Restaurants : {data.restaurants.length}</li>
            {(data.restaurants.length > 0) &&
              data.restaurants.map(dat => {
                index++;

                return (<li className="sublist" 
                            style={{marginLeft : "30px"}}
                            key={data.name}>
                          {this.countLikes(index)} / {data.votes.length} - {dat.name}
                        </li>
              )}
            )}
            <li>Votes : {data.votes.length}</li>
            {(data.votes.length > 0) &&
              data.votes.map(dat => (
                <li className="sublist" 
                    style={{marginLeft : "30px"}}
                    key={data.name}>
                  {dat.name}
                </li>
              )
            )}
        </ul>

        <button onClick={() => this.props.getBack()}>Go Back</button>
      </div>
    );
  }
}

export default PlanInfo;
