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
        if (e.target.id === 'home') {
            window.location.reload();
        }
        else {
            this.props.dispatch(dbClicked(true));
            this.props.dispatch(loadTo(e.target.id));
        }

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
                <ul className="navWide">
                    <li id="home" onClick={(e) => this.handleClick(e)}>
                        <h4 className="recipe-page logohome" id="home">Recipied</h4>
                    </li>
                    <li id="home" onClick={(e) => this.handleClick(e)}>
                        <h4 className="recipe-page" id="home">Search Recipes</h4>
                    </li>
                    <li id="myrecipes" onClick={e => this.handleClick(e)}>
                        <h4 className="recipe-page" id="myrecipes">
                            My Recipes
                </h4>
                    </li>
                    <li id="addrecipes" onClick={e => this.handleClick(e)}>
                        <h4 className="recipe-page" id="addrecipes">
                            Add Recipe
                </h4>
                    </li>
                    <li id="/" onClick={e => this.logout(e)}>
                        <h4 className="recipe-page" id="/">
                            Sign-Out
                </h4>
                    </li>
                </ul>
                <div className="navNarrow">
                    <i className="fas fa-bars fa-3x" onClick={this.burgerToggle}></i>
                    <div className="narrowLinks">
                        <div onClick={(e) => this.handleClick(e)}>
                            <h4 className="burgermenu" id="home">Search Recipes</h4>
                        </div>
                        <div onClick={e => this.handleClick(e)}>
                            <h4 className="burgermenu" id="myrecipes">
                                My Recipes
            </h4>
                        </div>
                        <div onClick={e => this.handleClick(e)}>
                            <h4 className="burgermenu" id="addrecipes">
                                Add Recipe
            </h4>
                        </div>
                        <div onClick={e => this.logout(e)}>
                            <h4 className="burgermenu" id="/">
                                Sign-Out
            </h4>
                        </div>
                    </div>
                </div>
            </nav>

        )
    }
    burgerToggle = function () {
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