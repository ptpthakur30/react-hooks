import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'


const Ingredients = () => {
  // userIngredients is an array of objects
  const [userIngredients, setUserIngredients] = useState([]);

  // When re rendering this function will not be created again
  const searchIngredientsHandler = useCallback((ingredients) => {
    setUserIngredients(ingredients);
  },[])

  const addIngredientsHandler = ingredients => {
    // Fetch is a browser function for getting and posting json data on web containers  
    fetch('https://react-hooks-e0340.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: { 'Content-Type': 'application/json' }
    }).then(
      response => {
        // The response.json will return a promise 
        return response.json();
      }).then(responseData => {
        // responseData.name is the id name of Firebase
        setUserIngredients(prevState => [...prevState, { id: responseData.name, ...ingredients }])
      })
  }

  const removeItemHandler = id => {
    setUserIngredients(prevIngredients => prevIngredients.filter(igid => igid.id !== id));
  }
  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredientsHandler} />

      <section>
        <Search onLoadIngredients={searchIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
