import React from 'react';
import { connect } from 'react-redux';
import LogIn from './login';
import './login.css';

class LoginPage extends React.Component {
    render() {
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

export default connect()(LoginPage);