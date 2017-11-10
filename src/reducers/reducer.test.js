import {recipeReducer} from './reducer';
import {sendRecipe,addFinished, getRecipe, loadTo, loginFinished, getId, recipeData, getUser, recipeDeleted, dbClicked, addRList, addStepList, addFiles, addImg, saveId} from '../actions/action';

// recipeName, ingredient, calories, steps, recipes, loadTo, isLoggedIn, id, idSet, recipeData, added, username, userData, delRecipe, clicked, ingredientsList, stepsList, file, imagePreviewUrl, uuid, token 

describe('recipeReducer', () => {
    //set up dummy data
    const recipeName = 'test recipe';
    const ingredient = ['test', 'test2', 'test3'];
    const calories = 440;
    const steps = ['step1', 'step2', 'step3'];
    const recipes = ['recipe1', 'recipe2']
    const loadTo = '/endpoint';
    const isLoggedIn = false;
    const id = '123123';
    const idSet = false;
    //recipedata is object of a recipe
    const recipeData = 'placeholder';
    const added = false;
    const username = 'testuser';
    //should be data of all recipes user created
    const userData = 'placeholder';
    const delRecipe = false;
    const clicked = false;
    const ingredientsList = ['1','2','3'];
    const stepsList = ['1','2','3'];
    const file = 'file.jpg';
    const uuid = '123123';
    const token = '123123'; 

    it('Should set the initial state when nothing is passed in', () => {
        const state = recipeReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
            recipeName: '',
            ingredient: '',
            calories: '',
            steps: '',
            recipes: [],
            loadTo: '',
            isLoggedIn: false,
            id: '',
            idSet: false,
            recipeData: '',
            added: false,
            username: '',
            userData: [],
            renderToPage: false,
            delRecipe: false,
            clicked: false,
            ingredientsList: [],
            stepsList: [],
            file: '',
            imagePreviewUrl: '',
            uuid: '',
            token: ''
        });
    });
    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = recipeReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });
})