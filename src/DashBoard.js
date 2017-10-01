import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {dbClicked, loadTo} from './reducer';

class DashBoard extends React.Component {
    handleClick(e) {
        e.preventDefault();
        console.log(e.target.id);
        this.props.dispatch(dbClicked(true));
        this.props.dispatch(loadTo(e.target.id));
    }
    render() {
        console.log(this.props.clicked);
        if (this.props.clicked) {
            console.log(this.props.redirectTo)
            this.props.dispatch(dbClicked(false));
            return <Redirect to= {"/" + this.props.redirectTo} />;
        }
        // search box in middle, logo on top
        return (
            <nav className="dashboard-nav">
                <div onClick={(e) => this.handleClick(e)}>
                <h4 className="placeholder col-xs-2 text-center recipe-page" id="home">
                    APPNAME
                </h4>
                </div>
                <div onClick={(e) => this.handleClick(e)}>
                    <h4 className="recipe-page col-xs-2 text-center" id="home">Search Recipes</h4>
                </div>
                <div onClick={e => this.handleClick(e)}>
                    <h4 className="recipe-page col-xs-2 text-center" id="myrecipes">
                        My Recipes
                </h4>
                </div>
                <div onClick={e => this.handleClick(e)}>
                    <h4 className="recipe-page col-xs-2 text-center" id="addrecipes">
                        Add Recipe
                </h4>
                </div>
                <div onClick={e => this.handleClick(e)}>
                    <h4 className="recipe-page col-xs-2 text-center" id="placeholder">
                        placeholder
                </h4>
                </div>
                <div onClick={e => this.handleClick(e)}>
                    <h4 className="recipe-page col-xs-2 text-center" id="signout">
                        sign-out
                </h4>
                </div>
            </nav>

        )
    }
}

const mapStateToProps = (state) => ({
    clicked: state.clicked,
    redirectTo: state.loadTo
})

export default connect(mapStateToProps)(DashBoard);