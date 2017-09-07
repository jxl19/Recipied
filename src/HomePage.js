import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter,Link } from 'react-router-dom'
import './HomePage.css'
class HomePage extends React.Component {
    render() {
        return (
            <nav>
                <Link onClick={this.forceUpdate} to={'/recipepage'}>
                <h1>recipepage</h1>
                </Link>
            </nav>

        )
    }
}

const mapDispatchToProps = (dispatch) =>
    ({
        getRecipe: () => dispatch(push('/recipepage'))
    })

export default withRouter(connect(null, mapDispatchToProps)(HomePage));