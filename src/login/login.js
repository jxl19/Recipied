import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../reducers/reducer';
import {dbClicked} from '../actions/action';
import { Redirect, withRouter } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';
//if theres token automatically redirect
import createHistory from 'history/createBrowserHistory'
//when we login we should grab the jwt token from the server and save it in the state.. so we need to make server send over the response for that token so we can save it
const history = createHistory()
class LogIn extends React.Component {

    componentWillReceiveProps(newProps) {
        if (newProps.isLoggedIn === true) {
            this.setState({ loginSuccess: true })
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        return this.props.login({
            username: this.username.value,
            password: this.password.value
        })
    }
    handleSignUp(e) {
        e.preventDefault();
        return this.props.clicked(true);
    }
    render() {
        if (this.props.isLoggedIn) {
            history.push('/home');
            return <Redirect to='/home' />;
        }
        if (this.props.click) {
            this.props.clicked(false);
            history.push('/signup');
            return <Redirect to='/signup' />
        }
        return (
            // center login inputs and button
                    <div className="log-in-container">
                        <div className="center">
                            <form onSubmit={e => this.handleSubmit(e)} id="login-form">
                                <div className="login">
                                    <p><input type="text" ref={(input) => this.username = input} className="input-login" placeholder="User ID" size="35" required /></p>
                                    <p><input type="password" ref={(input) => this.password = input} className="input-login" placeholder="Password" size="35" required /></p>
                                    <p className="login_button">
                                        <button className="signup-login-button" >Log In</button>
                                    </p>
                                    <div className="demo"> Would you like to try a demo? <br /> Fill in 'demo' for login and password <div className="sign_up" onClick={e=>this.handleSignUp(e)}>Sign up</div></div>
                                </div>
                            </form>
                        </div>
                    {/* <p className="header-login-button">
                        <button className="page-login-signup-button" onClick={this.props.gotoSignup}>Sign Up</button>
                    </p> */}
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (attributes) => {
        dispatch(login(attributes));
    },
    clicked: (bool) => {
        dispatch(dbClicked(bool));
    },
    gotoSignup: () => dispatch(push('/signup')),
    goToHomePage: () => dispatch(push('/homepage'))
})

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    click: state.clicked
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));