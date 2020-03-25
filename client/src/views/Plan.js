import React, { Component } from "react";
import axios from 'axios';
import NotFound from "./NotFound";
import Vote from "../components/Vote";
import GroupVote from "../components/GroupVote";
import PlanInfo from "../components/PlanInfo";

class Plan extends Component {
  state = {
    id: 0,
    data: null,
    success: false,
    error: null
  };

  updateData = () => {
    const { match: { params } } = this.props;

    this.setState({ id: params.id });

    return axios.post('http://localhost:3001/api/getData', {
            id: params.id,
          })
          .then(res => { return !!res.json ? res.json() : res.data; })
          .then((res) => {
            this.setState({ 
              data: res.data,
              success: res.success,
              error: res.error
            });
          }).catch((error) => {
            this.setState({ 
              data: null,
              success: false,
              error: error
            }); 
          })
  }

  componentDidMount() {
      this.updateData();
  }

  getBack = () => {
    this.setState({ vote: false, info: false, group: false });
  }

  render() {
    if(this.state.success && this.state.data == null) {
      return (<NotFound/>);
    } else if(!!this.state.error) {
      return (<div>
                <h3>Sorry there was an error</h3>
                <p>{this.status.error.message}</p>
              </div>);
    } else if(!!this.state.vote) {
      return(<Vote planData={this.state.data} updateData={this.updateData} getBack={this.getBack} />);
    } else if(!!this.state.group) {
      return(<GroupVote planData={this.state.data} getBack={this.getBack} />);
    } else if(!!this.state.info) {
      return(<PlanInfo planData={this.state.data}  getBack={this.getBack}/>);
    } 

    return (
      <div>
        <ul>
          <li>
            <button onClick={() => this.setState({vote : true})}>Couples Vote</button>
          </li>
          <li>
            <button onClick={() => this.setState({group : true})}>Group Vote</button>
          </li> 
          <li>
            <button onClick={() => this.setState({info : true})}>Info</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Plan;
