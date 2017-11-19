import React from 'react';
import { connect } from 'react-redux';
import { getReciped, getUserName } from '../reducers/reducer';
import {getId} from '../actions/action';
import './recipePage.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Table, Column, Cell } from 'fixed-data-table';
import DashBoard from './DashBoard';
import { Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
//change search value to tolowercase
const history = createHistory()
class RecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: '0', height: '0' };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }
    onSubmit(e) {
        e.preventDefault();
        console.log('hello');
        var userid = sessionStorage.getItem('id');
        const recipe = this.recipe.value.toLowerCase();
        this.props.dispatch(getReciped(recipe));
        this.props.dispatch(getUserName(userid));
    }
    handleClick(e, id) {
        e.preventDefault();
        this.props.dispatch(getId(id));
    }
    render() {
        if (this.props.idSet) {
            history.push('/recipepage/' + this.props.id);
            return <Redirect to={"/recipepage/" + this.props.id} />
        }
        // var clientWidth = function () {  return Math.max(window.innerWidth, document.documentElement.clientWidth);};
        // var clientHeight = function () {  return Math.max(window.innerHeight, document.documentElement.clientHeight);};
        var userid = sessionStorage.getItem('id');
        let recipes = undefined;
        let tableWidth = this.state.width*0.98;
        let columnWidth = this.state.width*0.49;
        let tableHeight = (this.props.existingRecipes.length + 1) *50.5;
        if (this.props.existingRecipes.length > 0) {
            recipes =
                <Table className="centerdiv"
                    rowHeight={50}
                    headerHeight={50}
                    rowsCount={this.props.existingRecipes.length}
                    width={tableWidth}
                    height={tableHeight}>
                    <Column
                        header={<Cell>Dish Name</Cell>}
                        cell={props => (
                            <Cell className="gotorecipe"{...props} onClick={e => this.handleClick(e, this.props.existingRecipes[props.rowIndex]._id)}>
                                {this.props.existingRecipes[props.rowIndex].dishName}
                            </Cell>
                        )}
                        width={columnWidth}
                    />
                    <Column
                        header={<Cell>Ingredients</Cell>}
                        cell={props => (
                            <Cell {...props}>
                                {this.props.existingRecipes[props.rowIndex].ingredients}
                            </Cell>
                        )}
                        width={columnWidth}
                    />
                </Table>
        }
        //condition to print out of nothing
        // else if () {
        //     console.log('here')
        //     console.log(this.props.existingRecipes);
        //     recipes = <li>No Recipes here!</li>
        // }
        return (
            <div>
                <DashBoard />
                <div className="logo">
                </div>
                <div className="jumbotron jumbotron-fluid jumbotron-bg">
                    <div className="container">
                        <form className="js-search-form col-md-12" onSubmit={e => this.onSubmit(e)}>
                            <div className="form-group">
                                <input type="text" name="getRecipe" className="submit-form col-xs-6" placeholder="search for recipe" ref={(input) => this.recipe = input} />
                                <div className="search col-xs-1">
                                    <i className="glyphicon glyphicon-search"></i>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="centerdiv">
                    {recipes}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    existingRecipes: state.recipes,
    id: state.id,
    idSet: state.idSet
})

export default connect(mapStateToProps)(RecipePage);