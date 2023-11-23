
document.addEventListener("DOMContentLoaded", function () {
    const heroContainer = document.querySelector(".hero-inner-container");
    const logoContainer = document.querySelector(".logo-container");
    const navbarOuter = document.querySelector('.navbar-outer-container')
    const burgerMenu = document.querySelector('.burger-menu')
    window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY;

        // adjust the containers when scrolled
        if (scrollPosition > 100) {
            heroContainer.classList.add("sticky-hero");
            logoContainer.classList.add("scrolled");
            burgerMenu.classList.add('sticky')
        } else {
            heroContainer.classList.remove("sticky-hero");
            logoContainer.classList.remove("scrolled");
            burgerMenu.classList.remove('sticky')

        }


    });
});

// ---for navigation menu
function toggleNavbar() {
    var navbarResponsive = document.getElementById("navbarResponsive");
    navbarResponsive.classList.toggle("show");
}

// ---for filter toggle in recipies
function toggleFilter() {
    var filterContainer = document.getElementById("filterContainer");
    filterContainer.classList.toggle("show");
}

// ----save recipe to users list--------
function saveRecipe(icon) {
    
    // check for the recipe icon type
    if(icon.classList.contains('fa-regular')){
        icon.classList.remove('fa-regular')
        icon.classList.add('fa-solid')
        // console.log("in fa-regular")
        // console.log(icon)
    }else{
        // console.log("fa-solid")
        icon.classList.remove('fa-solid')
        icon.classList.add('fa-regular')
        // console.log(icon)
    }

    // add the class to the icon
    icon.classList.toggle('saved');

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


document.addEventListener("DOMContentLoaded", function () {
    
    // get all the drop down btns
    const allDropDowns = document.querySelectorAll(".dropdown-btn")

    allDropDowns.forEach(dropdown => {

        dropdown.addEventListener('click', (e)=>{
            e.preventDefault()

            // get the parent element of the button
            parentElement = dropdown.parentElement
            console.log(parentElement)

            // since the options are in the next element we select that element
            dropdownOptions = parentElement.nextElementSibling
            dropdownOptions.style.display = "block"
            dropdownOptions.classList.toggle("active")
        })
    })

});

let initalCount = 0;
let displayedRecipes = 10;
let allRecipes = [];
document.addEventListener("DOMContentLoaded", function () {
    try{

        document.getElementById('recipeSearchBtn').addEventListener('click', function() {
            searchRecipes();
        
        document.getElementById('viewMoreBtn').addEventListener('click', function () {
            displayedRecipes += 10; // Increase the number of recipes to display
            initalCount += 10
            displayResults(allRecipes,initalCount,displayedRecipes);
        });
        });
    }catch{

    }
});
// https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=fbf980cd&app_key=17f290186199c2129b0e48087b583767&diet=high-fiber&health=alcohol-free&calories=100-2000
function searchRecipes() {
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


    // fetch request
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // displayResults(data.hits);

            allRecipes = data.hits.slice(0, 1);
            if(allRecipes.length > 0){

                console.log("total recipes",allRecipes)
                recipeContainer.innerHTML = '';
                recipeContainer.classList.remove('empty-recipes')
                recipeContainer.classList.add('total-recipies-container')
                viewMoreBtn.style.display = 'block'
                displayResults(allRecipes, initalCount, displayedRecipes)
            }else{
                recipeContainer.innerHTML = `<h4> No Recipies Found </h4>`
                recipeContainer.style.width = "100%;"
            }
            
            
        })
        .catch(error => {
            
        });
}



function displayResults(recipes,initial, numToDisplay) {
    
    recipes.slice(initial, numToDisplay).forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe-container';

    
        recipeDiv.innerHTML = `<div class="recipe-image-container">
                                <input type="hidden" value="${recipe.recipe.uri}" />
                                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                                <i class="fa-regular fa-bookmark save-recipe-icon"></i>
                                </div>
                                <h4 class="recipe-title">${recipe.recipe.label}</h4>
                                <a class="btn btn-recipe" href="recipe-page.html" target="_blank">View</a>`;

        recipeContainer.appendChild(recipeDiv);

        
        const saveRecipeIcon = recipeDiv.querySelector('.save-recipe-icon');
        saveRecipeIcon.addEventListener('click', function() {
            saveRecipe(this);
        });
    });

    
}

document.addEventListener("DOMContentLoaded", function () {
    viewRecipeDetails()
});

function viewRecipeDetails() {
    

    // get the uri
    // console.log(event.target.parentElement)
    const uri = "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6"
    // const uri = event.target.parentElement.querySelector('input').value;
    
    // fecth the recipe
    fetchRecipeData(uri)
                .then((data) => {
                    
                    console.log(data)
                    recipe = data.hits[0].recipe

                        const ContainerElement = document.querySelector(".single-recipe-container")
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
    
    const appId = 'fbf980cd';
    const appKey = '17f290186199c2129b0e48087b583767'; 
    const apiUrl = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(uri)}&app_id=${appId}&app_key=${appKey}`;

    return fetch(apiUrl)
        .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            throw error; 
        });
}


function createRecipeContent(){

    const apiUrl = ``
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // displayResults(data.hits);

            allRecipes = data.hits.slice(0, 1);
            if(allRecipes.length > 0){

                console.log("total recipes",allRecipes)
                recipeContainer.innerHTML = '';
                recipeContainer.classList.remove('empty-recipes')
                recipeContainer.classList.add('total-recipies-container')
                viewMoreBtn.style.display = 'block'
                displayResults(allRecipes, initalCount, displayedRecipes)
            }else{
                recipeContainer.innerHTML = `<h4> No Recipies Found </h4>`
                recipeContainer.style.width = "100%;"
            }
            
            
        })
        .catch(error => {
            
        });
}
