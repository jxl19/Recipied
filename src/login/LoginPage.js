import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogIn from './login';
import './login.css';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class LoginPage extends React.Component {
    handleClick(e) {
        e.preventDefault();
        history.push("/signup");
        return <Redirect to="/signup" />;
    }
    render() {
        if (this.props.isLoggedIn) {
            history.push("/home");
            return <Redirect to='/home' />;
        }
        return (
            <div className="landing-page">
                <section className="about-landing">
                    <div className="header-about">
                        <h3> Reciped allows for you to upload your own recipes or search for recipes that have been uploaded to this site.  </h3>
                    </div>
                </section>
                <LogIn />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps)(LoginPage);