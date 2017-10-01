import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogIn from './login';
import './login.css';

class LoginPage extends React.Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to='/homepage' />;
        }
        return (
            <div className="landing-page">
                <section className="about-landing">
                    <div className="header-about">
                        <h3> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut est suscipit, consectetur tellus in, rhoncus ligula. Cras euismod in tortor sed molestie. Nam pretium tellus ac dui finibus, sed faucibus arcu consectetur. </h3>
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