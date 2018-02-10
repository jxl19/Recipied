import React from 'react';
import { connect } from 'react-redux';
import { getUserName, deleteRecipe } from '../reducers/reducer';
import {getId, renderID} from '../actions/action';
import { Redirect } from 'react-router-dom';
import DashBoard from './DashBoard';
import { Table, Column, Cell } from 'fixed-data-table';
import './MyRecipePage.css';
import createHistory from 'history/createBrowserHistory'
const history = createHistory();
class MyRecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: '0', height: '0' };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      componentDidMount() {
        var userid = sessionStorage.getItem('id');
        this.props.dispatch(getUserName(userid));
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }
    handleClick(e, id) {
        e.preventDefault();
        this.props.dispatch(getId(id));
    }
    onClick(e, id) {
        e.preventDefault();
        this.props.dispatch(renderID(id));
    }
    handleDelete(e, id) {
        e.preventDefault();
        this.props.dispatch(deleteRecipe(id));
    }
    render() {
        if (this.props.idSet) {
            history.push("/myrecipes/" + this.props.id);
            return <Redirect to={"/myrecipes/" + this.props.id} />
        }
        if (this.props.renderPage) {
            history.push("/recipepage/" + this.props.id)
            return <Redirect to={"/recipepage/" + this.props.id} />
        }
        let tableWidth = this.state.width*0.98;
        let columnWidth = this.state.width*0.40;
        let tableHeight = (this.props.userData.length + 1) *69.2;
        let buttonWidth = this.state.width*0.0899;
        let user = undefined;
        if (this.props.userData && this.props.userData.length > 0 || this.props.recipeDeleted) {
            user = <Table className="center"
            rowHeight={75}
            headerHeight={50}
            rowsCount={this.props.userData.length}
            width={tableWidth}
            height={tableHeight}>
            <Column
                header={<Cell>Dish Name</Cell>}
                cell={props => (
                    <Cell className="dish"{...props} onClick={e=>this.onClick(e, this.props.userData[props.rowIndex].id)}>
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
                    <Cell className="far fa-edit"{...props} onClick={e=>this.handleClick(e, this.props.userData[props.rowIndex].id)}>
                    </Cell>
                  )}
                width={buttonWidth}
            />
            <Column
                cell={props => (
                    <Cell className="far fa-trash-alt"{...props} onClick={e=>this.handleDelete(e, this.props.userData[props.rowIndex].id)}>
                    </Cell>
                  )}
                width={buttonWidth}
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
                <div className="centerdiv myrecipeboard">
                    {user}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.userData,
    idSet: state.idSet,
    renderPage: state.renderToPage,
    id: state.id,
    recipeDeleted: state.delRecipe
})

export default connect(mapStateToProps)(MyRecipePage);