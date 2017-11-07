import React from 'react';
import { connect } from 'react-redux';
import { getUserName, deleteRecipe } from '../reducers/reducer';
import {getId} from '../actions/action';
import { Redirect } from 'react-router-dom';
import DashBoard from './DashBoard';
import { Table, Column, Cell } from 'fixed-data-table';
import './MyRecipePage.css';
import createHistory from 'history/createBrowserHistory'
//have dishname link to its own page
const history = createHistory();
class MyRecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: '0', height: '0' };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      componentDidMount() {
        var userid = sessionStorage.getItem('id');
        console.log(userid);
        this.props.dispatch(getUserName(userid));
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        console.log(this.state);
      }

    handleClick(e, id) {
        e.preventDefault();
        console.log(id);
        this.props.dispatch(getId(id));
    }

    handleDelete(e, id) {
        e.preventDefault();
        console.log(id);
        this.props.dispatch(deleteRecipe(id));
    }
    render() {
        if (this.props.idSet) {
            console.log(this.props.idSet);
            history.push("/myrecipes/" + this.props.id);
            return <Redirect to={"/myrecipes/" + this.props.id} />
        }
        let tableWidth = this.state.width*0.98;
        let columnWidth = this.state.width*0.45;
        let thisHeight = this.state.height/2;
        let tableHeight = (this.props.userData.length + 1) *50.5;
        console.log(this.props.userData);
        let user = undefined;
        if (this.props.userData && this.props.userData.length > 0 || this.props.recipeDeleted) {
           //trashbin, edit icon next to name
            user = <Table className="center"
            rowHeight={50}
            headerHeight={50}
            rowsCount={this.props.userData.length}
            width={tableWidth}
            height={tableHeight}>
            <Column
                header={<Cell>Dish Name</Cell>}
                cell={props => (
                    <Cell {...props}>
                      {this.props.userData[props.rowIndex].dishName}
                    </Cell>
                  )}
                width={columnWidth}
            />
            <Column
                header={<Cell>Ingredients</Cell>}
                cell={props => (
                    <Cell {...props}>
                      {this.props.userData[props.rowIndex].ingredients}
                    </Cell>
                  )}
                width={columnWidth}
            />
            <Column
                cell={props => (
                    <Cell className="glyphicon glyphicon-edit"{...props} onClick={e=>this.handleClick(e, this.props.userData[props.rowIndex]._id)}>
                    </Cell>
                  )}
                width={67}
            />
            <Column
                cell={props => (
                    <Cell className="glyphicon glyphicon-remove-circle"{...props} onClick={e=>this.handleDelete(e, this.props.userData[props.rowIndex]._id)}>
                    </Cell>
                  )}
                width={67}
            />
            </Table>
        }
        else {
            return (
                <div>
                    < DashBoard />
                    <h1>You have not created a recipe</h1>
                </div>
            )
        }
        return (
            <div>
                < DashBoard />
                <div className="centerdiv col-xs-12">
                    {user}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.userData,
    idSet: state.idSet,
    id: state.id,
    recipeDeleted: state.delRecipe
})

export default connect(mapStateToProps)(MyRecipePage);