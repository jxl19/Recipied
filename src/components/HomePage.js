import React from 'react';
import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import './HomePage.css'
import './recipePage.css';

class HomePage extends React.Component {
    render(){
        return(
            <DashBoard />
        )
    }
}


export default connect()(HomePage);