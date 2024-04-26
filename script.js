document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const mealList = document.getElementById('mealList');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            searchMeal(searchTerm);
        }
    });

    async function searchMeal(term) {
        mealList.innerHTML = ''; 
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
            const data = await response.json();
            displayMeals(data.meals);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayMeals(meals) {
        if (meals) {
            const mealCount = Math.min(meals.length, 5); 
            for (let i = 0; i < mealCount; i++) {
                const meal = meals[i];
                const mealDiv = createMealDiv(meal);
                mealList.appendChild(mealDiv);
            }
            if (meals.length > 5) {
                const showAllButton = document.createElement('button');
                showAllButton.textContent = 'SHOW ALL';
                showAllButton.addEventListener('click', () => {
                    for (let i = 5; i < meals.length; i++) {
                        const meal = meals[i];
                        const mealDiv = createMealDiv(meal);
                        mealList.appendChild(mealDiv);
                    }
                    showAllButton.style.display = 'none';
                });
                mealList.appendChild(showAllButton);
            }
        } else {
            const noResults = document.createElement('p');
            noResults.textContent = 'No meals found.';
            mealList.appendChild(noResults);
        }
    }

    function createMealDiv(meal) {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');

        const mealId = document.createElement('p');
        mealId.textContent = `ID: ${meal.idMeal}`;
        mealDiv.appendChild(mealId);

        const mealName = document.createElement('p');
        mealName.textContent = `Name: ${meal.strMeal}`;
        mealDiv.appendChild(mealName);

        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealDiv.appendChild(mealImage);

        const mealCategory = document.createElement('p');
        mealCategory.textContent = `Category: ${meal.strCategory}`;
        mealDiv.appendChild(mealCategory);

        const mealInstructions = document.createElement('p');
        mealInstructions.textContent = `Instructions: ${meal.strInstructions}`;
        mealDiv.appendChild(mealInstructions);

        return mealDiv;
    }
});
