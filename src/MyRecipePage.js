import React from 'react';
import { connect } from 'react-redux';
import { getUserName, getId, deleteRecipe } from './reducer';
import { Redirect } from 'react-router-dom';
import DashBoard from './DashBoard';
import './MyRecipePage.css';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
class MyRecipePage extends React.Component {
    componentDidMount() {
        var userid = sessionStorage.getItem('id');
        console.log(userid);
        this.props.dispatch(getUserName(userid));
    }

    handleClick(e, recipes) {
        e.preventDefault();
        console.log(recipes._id);
        this.props.dispatch(getId(recipes._id));
    }

    handleDelete(e, recipes) {
        e.preventDefault();
        this.props.dispatch(deleteRecipe(recipes._id));
    }
    render() {
        if (this.props.idSet) {
            console.log(this.props.idSet);
            history.push("/myrecipes/" + this.props.id);
            return <Redirect to={"/myrecipes/" + this.props.id} />
        }
        console.log(this.props.userData);
        let user = undefined;
        if (this.props.userData && this.props.userData.length > 0 || this.props.recipeDeleted) {
            //create user var
            user = this.props.userData.map((recipes, i) => {
                let ingredients = recipes.ingredients.map(ingredient => {
                    return <div className='col-xs-12'>{ingredient}</div>
                })
                return (
                    <div className="card col-xs-5" key={i}>
                        <h4 className="card-header">
                            {recipes.dishName}
                            <div className="delete btn btn-danger pull-right" onClick={(e) => this.handleDelete(e, recipes)}>
                                delete recipe
                            </div>
                        </h4>
                        <div className="card-block">
                            <div className="card-text">{ingredients}
                            </div>
                            <div className="btn btn-primary update pull-right" onClick={(e) => this.handleClick(e, recipes)}>
                                update recipe
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            return (
                <div>
                    < DashBoard />
                    <h1>nothing here</h1>
                </div>
            )
        }
        return (
            //render user var
            <div>
                < DashBoard />
                {user}
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