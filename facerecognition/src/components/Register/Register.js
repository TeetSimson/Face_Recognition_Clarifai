import React from 'react';
import '../ImageLinkForm/ImageLinkForm.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // states which we will update here
          email: '',
          password: '',
          name: ''
        }
    }
    
    onNameChange = (event) => {
        this.setState({name: event.target.value}) // Get user name input
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value}) // Get user email input 
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value}) // Get user password input
    }

    onSubmitSignIn = () => {
        fetch('https://serene-eyrie-91871.herokuapp.com/register', {  // Send inputs to database through server as json with POST
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // Converts JavaScript object to JSON string
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) { // "user.id" cannot be empty list but just "user" can and would always return true
                    this.props.loadUser(user) // If user registration was successful then load app with this user account
                    this.props.onRouteChange('home');
                }
            })
    }
    
    render() {
        return(
            <article className="br3 ba form white shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy pa2 f6" htmlFor="name">Full name</label>
                                <input className="pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange} // Passing input to function to get the value
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy pa2 f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy pa2 f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn} // When clicked sign in function will check with the server
                                className="b pointer ph3 pv2 input-reset white ba b--white bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign up"
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
                
    }
} 

export default Register;