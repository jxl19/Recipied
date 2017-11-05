import {sendRecipe, SEND_RECIPE, ADD_FINISHED, addFinished, GET_RECIPE, getRecipe, LOAD_TO, loadTo, LOGIN_FINISHED, loginFinished, GET_ID, getId, RECIPE_DATA, recipeData, getUser, GET_USER, RECIPE_DELETED, recipeDeleted, DB_CLICKED, dbClicked, ADD_RLIST, addRList, ADD_STEP_LIST, addStepList, ADD_FILE, addFiles, ADD_IMG, addImg, SAVE_ID, saveId} from './action';

describe('send recipename', () => {
  it('should create an action to add a send recipe', () => {
    const recipename = 'send recipename'
    const action = sendRecipe(recipename);
    expect(action.payload).toEqual(recipename);
    expect(action.type).toEqual(SEND_RECIPE);
  })
})

describe('finished adding', () => {
    it('should have finished adding recipe', () => {
        const recipe = 'recipe';
        const action = addFinished(recipe);
        expect(action.payload).toEqual(recipe);
        expect(action.type).toEqual(ADD_FINISHED);
    })
})

describe('getting recipe', () => {
    it('should have got recipe name', () => {
        const recipedata = 'recipedata';
        const action = getRecipe(recipedata);
        expect(action.payload).toEqual(recipedata);
        expect(action.type).toEqual(GET_RECIPE);
    })
})

describe('load endpoint', () => {
    it('should load to correct ep', () => {
        const endpoint = 'endpoint';
        const action = loadTo(endpoint);
        expect(action.payload).toEqual(endpoint);
        expect(action.type).toEqual(LOAD_TO);
    })
})

describe('finished logging in', () => {
    it('should return token', () => {
        const token = 'token';
        const action = loginFinished(token);
        expect(action.payload).toEqual(token);
        expect(action.type).toEqual(LOGIN_FINISHED);
    })
})

describe('should return id', () => {
    it('should return id', () => {
        const id = 'id';
        const action = getId(id);
        expect(action.payload).toEqual(id);
        expect(action.type).toEqual(GET_ID);
    })
})

describe('recipe data', () => {
    it('should return recipe data', () => {
        const data = 'data';
        const action = recipeData(data);
        expect(action.payload).toEqual(data);
        expect(action.type).toEqual(RECIPE_DATA);
    })
})

describe('get user', () => {
    it('should return recipes made by user', () => {
        const data = 'data';
        const action = getUser(data);
        expect(action.payload).toEqual(data);
        expect(action.type).toEqual(GET_USER);
    })
})

describe('delete recipe', () => {
    it('should delete recipe', () => {
        const recipe = 'recipe';
        const action = recipeDeleted(recipe);
        expect(action.type).toEqual(RECIPE_DELETED);
    })
})

describe('click', () => {
    it('should return data from click', () => {
        const data = 'data';
        const action = dbClicked(data);
        expect(action.payload).toEqual(data);
        expect(action.type).toEqual(DB_CLICKED);
    })
})

describe('add recipe list', () => {
    it('should add recipe list', () => {
        const list = ['list', 'list', 'data'];
        const action = addRList(list);
        expect(action.payload).toEqual(list);
        expect(action.type).toEqual(ADD_RLIST);
    })
})

describe('add step list', () => {
    it('should add step list', () => {
        const list = ['list', 'list', 'data'];
        const action = addStepList(list);
        expect(action.payload).toEqual(list);
        expect(action.type).toEqual(ADD_STEP_LIST);
    })
})

describe('add files', () => {
    it('should add file id from photo by user', () => {
        const data = 'data';
        const action = addFiles(data);
        expect(action.payload).toEqual(data);
        expect(action.type).toEqual(ADD_FILE);
    })
})

describe('add image', () => {
    it('should upload photo from user', () => {
        const data = 'data';
        const action = addImg(data);
        expect(action.payload).toEqual(data);
        expect(action.type).toEqual(ADD_IMG);
    })
})

describe('save user id', () => {
    it('should save user id', () => {
        const data = 'data';
        const action = saveId(data);
        expect(action.payload).toEqual(data);
        expect(action.type).toEqual(SAVE_ID);
    })
})
