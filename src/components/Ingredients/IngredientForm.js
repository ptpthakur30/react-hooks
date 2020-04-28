import React,{useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // Defines the state, destructuring the state
  const [enteredTitle, setTitle] = useState('')
  const [enteredAmount, setAmount] = useState('')

  const submitHandler = event => {
    event.preventDefault();
    props.addIngredients({title:enteredTitle,amount:enteredAmount});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={enteredTitle}
              onChange={event => setTitle(event.target.value)}
              //   // It is declared so that the dom does not resuses the previous event object
              //   const newTitle = event.target.value
              //   setstate(prevInputState => ({
              //     title: newTitle,
              //     amount: prevInputState.amount
              //   }))
              // }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={enteredAmount} 
            onChange={event => setAmount(event.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
