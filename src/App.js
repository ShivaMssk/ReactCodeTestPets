import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import cat from './assets/cat.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      male: [],
      female: []
    }
  };

  componentDidMount() {
    axios.get(`http://5c92dbfae7b1a00014078e61.mockapi.io/owners`)
      .then(res => {
        const pet_male = [],
        pet_female = [];
        res.data.map(function (owner) {
          if(owner.pets !== null){
            owner.pets.map(function(pet){
                if(pet.type === 'Cat'){
                  (owner.gender === "Male") ? pet_male.push(pet.name) : pet_female.push(pet.name);
                }
            });
          }
        });
        this.setState({ male:pet_male.sort(),female:pet_female.sort() });
        
    },
    error => {
          alert("unexpected error");
          console.log(error);
        });
  }
  
  
  render() {

    return (
      <div className="container">
          <h3 className='text-center margin-10'>
          Cats grouped by owner's gender
          </h3>
          <div className="row">
              <div className="offset-md-2 col-md-8">
                  <div className="card margin-10">
                      <div className="card-header">Male</div>
                      <div className="card-body">
                          <ul className="list-group list-group-flush">
                          {this.state.male.map((male) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" >
                                { male }
                                <img src={cat} className="img-circle" alt="cat" width="30" height="30" /> 
                          </li>
                          ))}
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="offset-md-2 col-md-8">
                  <div className="card margin-10">
                      <div className="card-header">Female</div>
                      <div className="card-body">
                          <ul className="list-group list-group-flush">
                          
                          {this.state.female.map((female) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" >
                                { female }
                                <img src={cat} className="img-circle" alt="cat" width="30" height="30" /> 
                          </li>
                          ))}
                          
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }

  
}

export default App;
