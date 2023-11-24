document.addEventListener("DOMContentLoaded", function () {
 
    const userId = getCurrentUser()
    // console.log(userId)
    try{

        document.getElementById('recipeSearchBtn').addEventListener('click', function() {

            searchRecipes(userId);
            
        
        });
        
        document.getElementById('filterButton').addEventListener('click', function() {
            searchRecipes(userId);
        
        
        });
    }catch{

    }
    try{
        document.getElementById('toggleFilter').addEventListener('click', toggleFilter);
    }catch{
        
    }
    
});

function searchRecipes(userId) {
    const appId = 'fbf980cd'; 
    const appKey = '17f290186199c2129b0e48087b583767';
    const recipeInput = document.getElementById('recipeInput').value;
    const recipeContainer = document.getElementById('recipeContainer');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    // filter values
    // Get filter values
    const caloriesFrom = document.getElementById('cal-from').value;
    const caloriesTo = document.getElementById('cal-to').value;

    // Get selected diet options
    const dietOptions = document.querySelectorAll('input[name="diet"]:checked');
    const selectedDiets = Array.from(dietOptions).map(option => option.value);

    // Get selected health options
    const healthOptions = document.querySelectorAll('input[name="health"]:checked');
    const selectedHealth = Array.from(healthOptions).map(option => option.value);

    // Construct the base URL
    let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeInput}&app_id=${appId}&app_key=${appKey}`;

    // Add filters to the URL only if they are selected
    if (caloriesFrom && caloriesTo) {
        apiUrl += `&calories=${caloriesFrom}-${caloriesTo}`;
    }

    if (selectedDiets.length > 0) {
        apiUrl += selectedDiets.map(diet => `&diet=${diet}`).join('');
    }

    if (selectedHealth.length > 0) {
        apiUrl += selectedHealth.map(health => `&health=${health}`).join('');
    }

    console.log(apiUrl)

    // fetch request
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
           

            allRecipes = data.hits;
            if(allRecipes.length > 0){

                console.log("total recipes",allRecipes)
                recipeContainer.innerHTML = '';
                recipeContainer.classList.remove('empty-recipes')
                recipeContainer.classList.add('total-recipies-container')
                viewMoreBtn.style.display = 'block'
                displayResults(allRecipes,userId)
            }else{
                recipeContainer.innerHTML = `<h4> No Recipies Found </h4>`
                recipeContainer.style.width = "100%;"
                viewMoreBtn.style.display = 'none'
            }
            
            
        })
        .catch(error => {
            
        });
}



function displayResults(recipes,userId) {
    
    recipes.forEach(recipe => {
        

        
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe-container';

        const encodedUri = encodeURIComponent(recipe.recipe.uri);
        recipeDiv.innerHTML = `<div class="recipe-image-container">
                                <input type="hidden" value="${recipe.recipe.uri}" />
                                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                                
                                
                                <h4 class="recipe-title">${recipe.recipe.label}</h4>
                                <a class="btn btn-recipe" href="/view-recipe/recipe?uri=${encodedUri}" target="_blank">View</a>`;

        recipeContainer.appendChild(recipeDiv);

        // <i class="fa-regular fa-bookmark save-recipe-icon" data-edamam-uri="${recipe.recipe.uri}"></i>

    });
    var saveIcons = document.querySelectorAll('.save-recipe-icon');

    
    saveIcons.forEach(function (icon) {
        icon.addEventListener('click', function (event) {
            event.preventDefault()
            var edamamUri = icon.getAttribute('data-edamam-uri');

            
            saveRecipe(icon, userId,edamamUri)
        });
    });
    
}

function saveRecipe(icon, userId, edamamUri) { 

    fetch('/add-favorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            user: userId,
            edamam_uri: edamamUri,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Favorite added successfully:', data);
        // toggle the icon classes
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.classList.add('saved')
        
    })
    .catch(error => {
        console.error('Error adding favorite:', error);
    });
}


