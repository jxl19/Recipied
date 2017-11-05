import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

class RoutePrivate extends Route {
    render() {
        function userIsAuth() {
            const userData = sessionStorage.getItem('id');
            return userData;
        }
        if (userIsAuth()) {
            return (
              <Route path={this.props.path} component={this.props.component} />
            );
        }
        return (
          <Redirect
            to={{
                pathname: '/',
            }}
          />
        );
    }
}

export default connect()(RoutePrivate);