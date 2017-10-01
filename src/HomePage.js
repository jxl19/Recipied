import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashBoard from './DashBoard';
import './HomePage.css'
import './recipePage.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//we can split up this component further -- each on click should just be in a diff component so we can specifically define each click function?
class HomePage extends React.Component {
    render(){
        return(
            <DashBoard />
        )
    }
}


export default connect()(HomePage);