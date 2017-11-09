import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut } from '../reducers/reducer';
import { dbClicked, loadTo } from '../actions/action';
import createHistory from 'history/createBrowserHistory'
import './DashBoard.css';
const history = createHistory()

class DashBoard extends React.Component {
    handleClick(e) {
        e.preventDefault();
        this.props.dispatch(dbClicked(true));
        this.props.dispatch(loadTo(e.target.id));
    }
    logout(e) {
        e.preventDefault();
        this.props.dispatch(dbClicked(true));
        this.props.dispatch(logOut());
    }
    render() {
        if (this.props.clicked) {
            this.props.dispatch(dbClicked(false));
            history.push('/' + this.props.redirectTo);
            return <Redirect to={"/" + this.props.redirectTo} />;
        }
        return (
            <nav className="dashboard-nav">
                <div className="navWide ">
                    <div onClick={(e) => this.handleClick(e)}>
                        <h4 className="recipe-page col-xs-3 text-center" id="home">Search Recipes</h4>
                    </div>
                    <div onClick={e => this.handleClick(e)}>
                        <h4 className="recipe-page col-xs-3 text-center" id="myrecipes">
                            My Recipes
                </h4>
                    </div>
                    <div onClick={e => this.handleClick(e)}>
                        <h4 className="recipe-page col-xs-3 text-center" id="addrecipes">
                            Add Recipe
                </h4>
                    </div>
                    <div onClick={e => this.logout(e)}>
                        <h4 className="recipe-page col-xs-3 text-center" id="/">
                            sign-out
                </h4>
                    </div>
                </div>
                <div className="navNarrow">
					<i className="glyphicon glyphicon-menu-hamburger" onClick={this.burgerToggle}></i>
					<div className="narrowLinks">
                    <div onClick={(e) => this.handleClick(e)}>
                    <h4 className="burgermenu"id="home">Search Recipes</h4>
                </div>
                <div onClick={e => this.handleClick(e)}>
                    <h4 className="burgermenu"id="myrecipes">
                        My Recipes
            </h4>
                </div>
                <div onClick={e => this.handleClick(e)}>
                    <h4 className="burgermenu"id="addrecipes">
                        Add Recipe
            </h4>
                </div>
                <div onClick={e => this.logout(e)}>
                    <h4 className="burgermenu"id="/">
                        sign-out
            </h4>
                </div>
					</div>
				</div>
            </nav>

        )
    }
    burgerToggle = function() {
		let linksEl = document.querySelector('.narrowLinks');
		if (linksEl.style.display === 'block') {
			linksEl.style.display = 'none';
		} else {
			linksEl.style.display = 'block';
		}
	}
}

const mapStateToProps = (state) => ({
    clicked: state.clicked,
    redirectTo: state.loadTo
})

export default connect(mapStateToProps)(DashBoard);