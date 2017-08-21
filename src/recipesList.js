import React from 'react';

export default function RecipesList({ recipes }) {
    const emptyMessage = (
        <p>There are no recipes </p>
    );
    const recipesList = (
        <p> recipe list </p>
    );

    return (
        <div>
            {recipes.length === 0 ? emptyMessage : recipesList}
        </div>
    )
}