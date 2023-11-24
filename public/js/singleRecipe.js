document.addEventListener("DOMContentLoaded", function () {
    const ContainerElement = document.querySelector(".single-recipe-container")
    try{
        const recipeApiEndpointInput = document.querySelector('#recipeApiEndpoint');

        
        const edamamApiEndpoint = recipeApiEndpointInput.value;
        viewRecipeDetails(edamamApiEndpoint)
    }catch(error){
        ContainerElement.innerHTML = `<p> No records Found </p>`;
    }

});


function viewRecipeDetails(edamamApiEndpoint) {
    
    const ContainerElement = document.querySelector(".single-recipe-container")
    
    // fecth the recipe
    fetchRecipeData(edamamApiEndpoint)
                .then((data) => {
                    
                    console.log(data)
                    recipe = data.hits[0].recipe

                        
                        console.log(ContainerElement)
                        if(ContainerElement){

                        const createRecipe = `<div class="recipe-page">
                        <section class="recipe-hero">
                            <img
                            src="${recipe.image}"
                            class="img recipe-hero-img"
                            />
                            <div class="recipe-info">
                                <h2>${recipe.label}</h2>
                                
                                <div class="recipe-icons">
                                    <div class="recipe-details-1">
                                        <div>
                                            <h4>calories</h4>
                                            <p>${recipe.calories.toFixed(0)}</p>
                                        </div>
                                        <div>
                                            <h4>Cuisine</h4>
                                            <p>${recipe.cuisineType[0]}</p>
                                        </div>
                                        <div>
                                            <h4>Meal Type</h4>
                                            <p>${recipe.mealType[0]}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <input type="hidden" value="${recipe.uri}" />
                                        <button id="saveRecipe"><i class="fa-regular fa-bookmark recipe-page-save" onclick="saveRecipe(this)"></i></button>
                                        
                                        <h5>Add to Favourites</h5>
                                        
                                    </div>
                                    <div>
                                        <button id="shareRecipe" onclick="copyToClipboard()">
                                            <i class="fa-solid fa-share-from-square"></i>
                                        </button>
                                        <h5>share</h5>
                                        <p id="copyStatus"> </p>
                                    </div>
                            
                                    <div>
                                        <i class="far fa-clock"></i>
                                        <h5>time</h5>
                                        <p>${recipe.totalTime}</p>
                                    </div>
                                    
                                </div>
                            
                            </div>
                        </section>
        
                        <section class="recipe-content">
                            <div class="instructions-container">
                                <h4>Instructions</h4>           
                                ${recipe.instructions && recipe.instructions.length > 0 ?
                                    recipe.instructions.map((instruction, index) => `
                                        <div class="single-instruction">
                                            <div class="steps">
                                                <p>Step ${index + 1}</p>
                                            </div>
                                            <p>${instruction}</p>
                                        </div>
                                    `).join('') :
                                    `For Instructions Follow this link <a href="${recipe.url}" target="_blank"><button class="btn instruction-btn">Get Instructions</button></>`
                                }
                            </div>
                            <div class="ingredients-container">
                                <div>
                                    <h4>Ingredients</h4>
                                    ${recipe.ingredientLines.map(ingredient => `<p class="single-ingredient">${ingredient}</p>`).join('')}
                                </div>
        
                            </div>
                        </section>
                        <section class="recipe-details-2">
                            <h4>Total Nutrients</h4>
                            <div class="recipe-details-2-content">
                            ${Object.keys(recipe.totalNutrients).map(nutrientKey => `
                                <div>
                                    <h5>${recipe.totalNutrients[nutrientKey].label}: </h5>
                                    <span>${recipe.totalNutrients[nutrientKey].quantity.toFixed(0)}</span> 
                                    <span>${recipe.totalNutrients[nutrientKey].unit}</span>
                                </div>
                            `).join('')}

                            
                                    
                                
                                
                            </div>
                        </section>
                    </div>`
                    
                    ContainerElement.innerHTML = createRecipe
                        }
                    else{
                        console.log("eleement not found")
                    }
                })
                .catch((error) => {
                    console.error("Error fetching recipe details:", error);
                });;
}


function fetchRecipeData(uri) {
    

    return fetch(uri)
        .then(response => {
        
            return response.json();
        
            
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error); 
        });
}

