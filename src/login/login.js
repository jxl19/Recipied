import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../reducer';
import { Redirect, withRouter } from 'react-router-dom';

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginSuccess: false
        };
    }

    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
        console.log(newProps.isLoggedIn);
        if (newProps.isLoggedIn === true) {
            this.setState({ loginSuccess: true })
            this.props.goToHomePage();
        }
    }
    handleSubmit(e) {
        let username, password;
        e.preventDefault();
        console.log(`handlesubmit--- ${this.username.value} ${this.password.value}`);
        console.log(this.props.isLoggedIn);
        // if state.logged = false, return props login , else redirect
        return this.props.login({
            username: this.username.value,
            password: this.password.value
        })
    }
    render() {
        if (this.state.loginSuccess) {
            return <Redirect to='/homepage' />;
        }
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)} id="login-form">
                    <div className="login">
                        <p><input type="text" ref={(input) => this.username = input} className="blank" placeholder="User ID" size="35" required /></p>
                        <p><input type="password" ref={(input) => this.password = input} className="blank" placeholder="Password" size="35" required /></p>
                        <p className="login_button">
                            <button className="signup-login-button" >Log In</button>
                        </p>
                    </div>
                </form>
                <p className="header-login-button">
                    <button className="page-login-signup-button" onClick={this.props.gotoSignup}>Sign Up</button>
                </p>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (attributes) => {
        console.log("mapDispatchToProps logging out creds", attributes);
        dispatch(login(attributes));
    },
    gotoSignup: () => dispatch(push('/signup')),
    goToHomePage: () => dispatch(push('/homepage'))
})

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));