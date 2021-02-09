import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

// Particles background effects
const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 580
        }
      }
    }
}

// All the states which can change
const initialState = {
    input: '',
    imageURL: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

// APP STARTS HERE
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box); // API gives only box corners
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFaces.map(face => {
      return { // Calculations for blue boxes around the faces
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
    })
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }
  
  onButtonSubmit = () => {
      this.setState({
        imageURL: this.state.input,
        boxes: [] // Clean previous boxes when button is clicked again
      })
        fetch('https://serene-eyrie-91871.herokuapp.com/imageurl', { // This sends the image to API
          method: 'post',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://serene-eyrie-91871.herokuapp.com/image', { // This updates the entries count
              method: 'put',
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json()) 
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count })) // Change how many photos user has submitted
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response) // Display blue box (calculate where box should be placed)
        )})
        .catch(err => console.log(err));
    }  

  onInputChange = (event) => {
    this.setState({input: event.target.value}); // Whats written into the box is assigned to input
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState) // If user is not signed in clear state
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { isSignedIn, imageURL, route, boxes } = this.state; // so we don´t have to do this.state.isSignedIN
    return (
      <div className="App">
        <Particles className="particles" // Background effect particles form npm package
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo />
        { route === 'home' // If we are on "home" page
            ? <div> 
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition boxes={boxes} imageURL={imageURL}/>
              </div>
            : ( // Else if we are on "signin" page
                route === 'signin' 
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> // If on "signin" page
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> // If on "register" page
              )

        }
      </div>
    );
  }
}

export default App;
