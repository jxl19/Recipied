import React from 'react';
import { connect } from 'react-redux';
import { getUserName, getId, deleteRecipe } from './reducer';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';
import './MyRecipePage.css';
//create delete and update requests for this component.
// for delete just access the delete EP when clicked and delete it using id, use alert?
// for update, change focus to the words on click, and add a update button when there is focus?
class MyRecipePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(getUserName());
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
        //make page for this updatepage, need new endpoint
        //the update page can look like a preview of the main page
        //maybe a background for the card itself?
        if(this.props.idSet){
            console.log(this.props.idSet);
            return  <Redirect to={"/myrecipes/" + this.props.id } /> 
        }
        console.log(this.props.userData);
        let user = undefined;
        if (this.props.userData && this.props.userData.length > 0 || this.props.recipeDeleted) {
            //create user var
            user = this.props.userData.map((recipes, i) => {
                console.log(this.props.userData);
                console.log(recipes.ingredients);
                //create a delete button?
                return (
                    <div className="card col-xs-5" key={i}>
                            <h4 className="card-header">{recipes.dishName}
                            <div className="delete btn btn-danger pull-right" onClick={(e) => this.handleDelete(e, recipes)}>
                                delete recipe
                            </div>
                            </h4>
                        <div className="card-block">
                            <div className="card-text">{recipes.ingredients}
                            </div>
                            <div className ="btn btn-primary update pull-right" onClick={(e) => this.handleClick(e, recipes)}>
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