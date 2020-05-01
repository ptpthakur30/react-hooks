import React, { useState, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'
import IngredientList from './IngredientList'

// The below is like reducers in redux, takes current state and returns updated state
// It is defined above function declaration so that it doesn't load every time the function component re renders
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(igid => igid !== action.id);
    default:
      throw new Error('Should not reach here');
  }
}

const Ingredients = () => {
  // The useReducer takes the reducer function and the initial state
  // It returns the current state and dispatch action
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  // Sets the loading image 
  const [loading, setLoading] = useState(false);

  // for setting the error modal
  const [error, seterror] = useState()

  // When re rendering this function will not be created again
  const searchIngredientsHandler = useCallback((ingredients) => {
    // setUserIngredients(ingredients);
    dispatch({ type: 'SET', ingredients: ingredients })
  }, [])

  const addIngredientsHandler = useCallback(ingredients => {
    // set the loading to true
    setLoading(true)
    // Fetch is a browser function for getting and posting json data on web containers  
    fetch('https://react-hooks-e0340.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: { 'Content-Type': 'application/json' }
    }).then(
      response => {
        setLoading(false)
        // The response.json will return a promise 
        return response.json();
      }).then(responseData => {
        // responseData.name is the id name of Firebase
        dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredients } })
      })
      // catching the error
      .catch(error => {
        seterror('Something went wrong');
        setLoading(false);
      })
  }, []);

  const onCloseErrorHandler = useCallback(() => {
    seterror(null);
  }, []);

  // useCall will create function only once
  const removeItemHandler = useCallback(id => {
    // Sets the loading 
    setLoading(true);
    // string interpolation
    fetch(`https://react-hooks-e0340.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(
      response => {
        setLoading(false);
        dispatch({ type: 'DELETE', id: id })
      })
  }, []);

  // it will load the component  based on the change in passed value
  const ingredientsList = useMemo(()=>{
    return <IngredientList 
    ingredients={userIngredients} 
    onRemoveItem={removeItemHandler} />
  },[userIngredients,removeItemHandler])

  return (
    <div className="App">
      {/* Sets the error modal if error is true */}
      {error && <ErrorModal onClose={onCloseErrorHandler}>{error}</ErrorModal>}
      <IngredientForm
        addIngredients={addIngredientsHandler}
        showLoading={loading}
      />

      <section>
        <Search onLoadIngredients={searchIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
}

export default Ingredients;
