import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  // object Destructuring
  // This tells useeffect on which props change useEffect should trigger
  const { onLoadIngredients } = props;
  const [searchIngredient, setSearchIngredient] = useState('');

  // for getting the reference
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      // searchIngredient is the old state value before the function starts so check the current
      // is equal to old value
      if (searchIngredient === inputRef.current.value) {
        const query = searchIngredient.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${searchIngredient}"`;
        fetch('https://react-hooks-e0340.firebaseio.com/ingredients.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedData = [];
            for (const key in responseData) {
              loadedData.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              })
            }
            onLoadIngredients(loadedData)
          })
      }
    }, 500)
    // for code cleanup
    return ()=>{
      // for clearing the time
      clearTimeout(timer);
    }
  }
    , [searchIngredient, onLoadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            onChange={event => { setSearchIngredient(event.target.value) }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
