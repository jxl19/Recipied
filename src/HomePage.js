import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter, Redirect } from 'react-router-dom'
import './HomePage.css'
import './recipePage.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: false
        };
    }
    handleClick(e) {
        e.preventDefault();
        this.setState({clicked: true});
    }
    render() {
        if(this.state.clicked) {
            return <Redirect to='/recipepage' />;
        }
        return (
            <nav className="dashboard-nav">
                <h4 className="placeholder col-xs-2 text-center recipe-page">
                    APPNAME 
                </h4>
                <div onClick={e => this.handleClick(e)}>
                <h4 className="recipe-page col-xs-2 text-center">Search Recipes</h4>
                </div>
                <h4 className="recipe-page col-xs-2 text-center">
                    placeholder
                </h4>
                <h4 className="recipe-page col-xs-2 text-center">
                    placeholder
                </h4>
                <h4 className="recipe-page col-xs-2 text-center">
                    placeholder
                </h4>
                <h4 className="recipe-page col-xs-2 text-center" id="signout">
                        sign-out
                </h4>
            </nav>

        )
    }
}

const mapDispatchToProps = (dispatch) =>
    ({
        getRecipe: () => dispatch(push('/recipepage'))
    })

export default withRouter(connect(null, mapDispatchToProps)(HomePage));