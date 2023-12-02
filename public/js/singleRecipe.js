document.addEventListener("DOMContentLoaded", function () {
    const ContainerElement = document.querySelector(".single-recipe-container");
    
    try{
        const userId = document.getElementById('userIdInput').value;
        const recipeApiEndpointInput = document.querySelector('#recipeApiEndpoint');

        
        const edamamApiEndpoint = recipeApiEndpointInput.value;
        viewRecipeDetails(edamamApiEndpoint,userId)
    }catch(error){
        ContainerElement.innerHTML = `<p> No records Found </p>`;
    }

});


function viewRecipeDetails(edamamApiEndpoint,userId) {
    
    const ContainerElement = document.querySelector(".single-recipe-container")
    
    // fecth the recipe
    fetchRecipeData(edamamApiEndpoint)
                .then((data) => {
                    
                    console.log(data)
                    recipe = data.hits[0].recipe

                        
                        // console.log(ContainerElement)
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
                                        
                                        <i class="fa-regular fa-bookmark save-recipe-icon" id="saveRecipeIcon" data-edamam-uri="${recipe.uri}"></i>
                                        
                                        <h5>Add to Favourites</h5>
                                        
                                    </div>
                                    <div>
                                            <button id="shareRecipe">
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
                    
                        ContainerElement.innerHTML = createRecipe;
                        // console.log("ele",ContainerElement)
                        document.getElementById('shareRecipe').addEventListener('click', copyToClipboard);
                        saveRecipeIcon = ContainerElement.querySelector('#saveRecipeIcon');

                    
                        saveRecipeIcon.addEventListener('click', function (event) {
                            event.preventDefault()
                            var edamamUri = saveRecipeIcon.getAttribute('data-edamam-uri');
                            console.log(edamamUri)
                            // Get the user ID from the hidden input
                            // var userId = document.getElementById('userIdInput').value;
                            // console.log(userId,edamamUri)
                            saveRecipe(saveRecipeIcon, userId,edamamUri)
                        });

                        }
                    else{
                        console.log("eleement not found")
                    }
                })
                .catch((error) => {
                    console.error("Error fetching recipe details:", error);
                });
    
                
                

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



function copyToClipboard() {
    // get the url of the page
    const currentUrl = window.location.href;

    const input = document.createElement('input');
    input.value = currentUrl;
    document.body.appendChild(input);

    // select the URL in the textarea and copy it to the clipboard
    input.select();
    document.execCommand('copy');

    // remove the temporary textarea
    document.body.removeChild(input);

    // display the "link copied" message with green color
    const copyStatus = document.getElementById('copyStatus');
    copyStatus.textContent = 'Link copied';
    copyStatus.classList.add('copied');

    // reset the color after a short delay
    setTimeout(() => {
        copyStatus.textContent = '';
        copyStatus.classList.remove('copied');
    }, 2000); 
}
