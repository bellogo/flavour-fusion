

async function getUserFavorites() {
    try {
        const user = await getCurrentUser();
        // console.log(user);

        const favoritesResponse = await fetch(`/get-favorites/${user}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!favoritesResponse.ok) {
            throw new Error(`HTTP error! Status: ${favoritesResponse.status}`);
        }

        const favoritesData = await favoritesResponse.json();
        // console.log(favoritesData.data);
        favoritesData.data.forEach(async(recipe) =>{
            const baseUrl = 'https://api.edamam.com/api/recipes/v2/by-uri?type=public&app_id=fbf980cd&app_key=17f290186199c2129b0e48087b583767';
            // console.log(recipe.edamam_uri)
            const edamamUri = encodeURIComponent(recipe.edamam_uri);
            const apiUrl = `${baseUrl}&uri=${edamamUri}`;
            try {
                const favoritesRecipesContainer = document.getElementById('favoritesRecipesContainer')
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    
                    
                    throw new Error(`HTTP error! Status: ${response.status}`);

                }
    
                const recipeData = await response.json();
                const recipeFullData = recipeData.hits[0];
                displayUserResults(favoritesRecipesContainer,recipeFullData, user)
                // if(recipeFullData.length > 0){

                //     displayUserResults(favoritesRecipesContainer,recipeFullData, user)
                // }else{
                //     const errorMessage = `<p> No Favorites added </p`
                //     favoritesRecipesContainer.innerHTML = errorMessage;
                // }
            } catch (error) {
                console.error('Error fetching data for recipe:', error);
                
            }
        })


        
    } catch (error) {
        console.error('Error getting user favorites:', error);
        
    }
}




async function getMainHost() {
    try {
        const response = await fetch('/get-host', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data);
        return data.data;
    } catch (error) {
        console.error('Error getting main host:', error);
        
        throw error;
    }
}


function displayUserResults(favoritesRecipesContainer,recipe,userId) {
    
    
        

        
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe-container';

    const encodedUri = encodeURIComponent(recipe.recipe.uri);
    recipeDiv.innerHTML = `<div class="recipe-image-container">
                            <input type="hidden" value="${recipe.recipe.uri}" />
                            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                            
                            
                            <h4 class="recipe-title">${recipe.recipe.label}</h4>
                            <a class="btn btn-recipe" href="/view-recipe/recipe?uri=${encodedUri}" target="_blank">View</a>`;

    favoritesRecipesContainer.appendChild(recipeDiv);


    // <i class="fa-regular fa-bookmark save-recipe-icon" data-edamam-uri="${recipe.recipe.uri}"></i>

    // var saveIcons = document.querySelectorAll('.save-recipe-icon');

    
    // saveIcons.forEach(function (icon) {
    //     icon.addEventListener('click', function (event) {
    //         event.preventDefault()
    //         var edamamUri = icon.getAttribute('data-edamam-uri');

    //         // Get the user ID from the hidden input
    //         // var userId = document.getElementById('userIdInput').value;
    //         // console.log(userId,edamamUri)
    //         saveRecipe(icon, userId,edamamUri)
    //     });
    // });
    
}

getUserFavorites()
