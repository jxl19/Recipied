import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createUser } from '../reducers/reducer';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';
import './login.css';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class SignUpPage extends React.Component {

    componentWillReceiveProps(newProps) {
        if (newProps.isLoggedIn === true) {
            this.setState({ loginSuccess: true })
        }
    }
    renderResults() {
        if (this.props.signupFailed) {
            return <p className="signup-failed">Username is being used</p>
        }
        if (this.props.loading) {
            return <Spinner spinnerName="circle" noFadeIn />;
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.password.value === this.confirmPassword.value) {
            return this.props.createUser({
                username: this.username.value,
                password: this.password.value
            })
        }
        else {
            window.alert('passwords do not match');
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            history.push("/home");
            return <Redirect to='/home' />;
        }
        return (
            <div className="landing-page">
                <div className="log-in-container">
                    <div className="center text-center">
                        <h1>Sign Up </h1>
                        <form onSubmit={e => this.handleSubmit(e)} id="login-form">
                            <div className="login">
                                <p><input type="text" ref={(input) => this.username = input} className="input-login" placeholder="User ID" size="35" required /></p>
                                <p><input type="password" ref={(input) => this.password = input} className="input-login" placeholder="Password" size="35" required /></p>
                                <p><input type="password" ref={(input) => this.confirmPassword = input} className="input-login" placeholder="Confirm Password" size="35" required /></p>
                                <p className="login_button">
                                    <button className="signup-login-button" >Sign Up</button>
                                </p>
                            </div>
                        </form>
                        <div>
                            {this.renderResults()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createUser: (attributes) => {
        dispatch(createUser(attributes));
    },
    gotoSignup: () => dispatch(push('/signup')),
    goToHomePage: () => dispatch(push('/homepage'))
})


const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    loading: state.loading,
    signupFailed: state.signupFailed
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);