import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

function Ingredients() {
  /* URL API for getting Ingredients and Recipes */
  const url = 'https://lb7u7svcm5.execute-api.ap-southeast-1.amazonaws.com/dev';
  
  var current_date = new Date();

  useEffect(() => {
        fetchItems(current_date);
  }, []);

  /* Initiate start date and current date for react-datepicker calendar */
  const [startDate, setStartDate] = useState(current_date);

  /* On Change Date value of react-datepicker element calendar */
  const handleChange = date => {
    setStartDate(date);
    fetchItems(date);
  };

  /* items (ingredients) is list of ingredients for recipes */
  const [items, setItems] = useState([]);
  
  /* get ingredients from API and filter it with current date (chosen date) */
  const fetchItems = async (date) => {
      const data = await fetch(
        url+'/ingredients'
      );

      const items_unfilter = await data.json()
      
      const items = items_unfilter.filter(item => (
        /* set same time to 0 for date comparison */
        /* only show unexpired ingredients */
        new Date(item["use-by"]).setHours(0,0,0,0) > date.setHours(0,0,0,0)
      ));

      setItems(items);
  };

  /* recipes */
  const [recipes, setRecipes] = useState([]);
  
  /* get recipes for selected ingredients element */
  const handleChexbox = async () => {
    let temp_ingredients = new Array();

    /* get all selected ingredients element */
    document.querySelectorAll('input[name=ingredients]:checked').forEach(function(ing){
        temp_ingredients.push(ing.value);
    });

    /* only display available recipes */
    if (temp_ingredients.length) {
        const ingredients = temp_ingredients.join();
        /* fetching recipes from API with ingredients params */
        const recipes_data = await fetch(
            url+'/recipes?ingredients='+ingredients
        );

        const recipes = await recipes_data.json();
        setRecipes(recipes);
    } else {
        setRecipes([]);
    }
  };

  return (
    <div className="container">
        <div className="row">
            <div className="col">Choose your date :</div>
            <div className="col"><DatePicker dateFormat="yyyy-MM-dd" selected={startDate} onChange={handleChange} /></div>
        </div>
        <div className="row">
            <div className="col">Available Ingredients :</div>
            <div className="col">
                {items.map(item => (
                    <div key={item.title}>
                        <input type="checkbox" id={item.title} name="ingredients" value={item.title} onClick={handleChexbox} /> {item.title}<br />
                    </div>
                ))}
            </div>
        </div>
        <div className="row">
            <div className="col">Available Recipes :</div>
            <div className="col">
                {recipes.map(recipe => (
                    <div key={recipe.title}>
                        <h1>{recipe.title}</h1>
                        <ul>
                            {recipe.ingredients.map(ing => (
                                <li key={ing}> {ing}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default Ingredients;