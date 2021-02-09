import React from 'react';
import '../ImageLinkForm/ImageLinkForm.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // states which we will update here
          signInEmail: '',
          signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value}) // Get user email input
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value}) // Get user password input
    }

    onSubmitSignIn = () => {
        fetch('https://serene-eyrie-91871.herokuapp.com//signin', { // Check with the server does the user exist
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // Converts JavaScript object to JSON string
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) { // "user.id" cannot be empty list but just "user" can and would always return true
                    this.props.loadUser(user); // If user registration was successful then load app with this user account
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba form shadow-5 white mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 pa2 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange} // Passing input to function to get the value
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 pa2 lh-copy f6" htmlFor="password">Password</label>
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
                            className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" 
                            type="submit"
                            value="Sign in" />
                        </div>
                        <div className="lh-copy mt3"> 
                        <p onClick={() => onRouteChange('register')} // Go to register page
                            className="f6 link pointer dim white db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
} 

export default Signin;