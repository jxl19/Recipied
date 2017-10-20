import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {dbClicked, loadTo, logOut} from './reducer';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class DashBoard extends React.Component {
    handleClick(e) {
        e.preventDefault();
        console.log(e.target.id);
        this.props.dispatch(dbClicked(true));
        this.props.dispatch(loadTo(e.target.id));
    }
    logout(e){
        e.preventDefault();
        console.log('asd');
        this.props.dispatch(dbClicked(true));
        this.props.dispatch(logOut());
    }
    render() {
        console.log(this.props.clicked);
        if (this.props.clicked) {
            console.log(this.props.redirectTo)
            this.props.dispatch(dbClicked(false));
            history.push('/' + this.props.redirectTo);
            return <Redirect to= {"/" + this.props.redirectTo} />;
        }
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
                <div onClick={e => this.logout(e)}>
                    <h4 className="recipe-page col-xs-2 text-center" id="/">
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