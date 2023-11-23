
document.addEventListener("DOMContentLoaded", function () {
    console.log('jhgj');
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

document.getElementById('burgerMenu').addEventListener('click', toggleNavbar);
document.getElementById('closeBtn').addEventListener('click', toggleNavbar);

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
    try{
        document.getElementById('saveRecipe').addEventListener('click', function() {
            saveRecipe(this.querySelector('i'));
        });
        
        document.getElementById('shareRecipe').addEventListener('click', copyToClipboard);
    }catch(error){

    }
});


document.addEventListener('DOMContentLoaded', function () {

    // event-listener for add ingredient button
    var addIngredientButton = document.querySelector("#ingredientsContainer button");
    if (addIngredientButton) {
        addIngredientButton.addEventListener("click", addIngredient);
    };

    // event-listener for add step button
    var addInstructionButton = document.querySelector("#instructionsContainer button");
    if (addInstructionButton) {
        addInstructionButton.addEventListener("click", addInstruction);
    };
    function addIngredient() {
        var container = document.querySelector(".ingredients-inner-container");
        var ingredientContainer = document.createElement("div")
        var input = document.createElement("input");
        ingredientContainer.classList.add("ingredient-container")
        input.type = "text";
        input.name = "ingredients";
        var deleteButton = createDeleteButton(input);
        ingredientContainer.appendChild(input);
        ingredientContainer.appendChild(deleteButton);

        container.appendChild(ingredientContainer)
    }


    function addInstruction() {
        var container = document.querySelector(".instructions-inner-container");
        var instructionContainer = document.createElement("div")
        instructionContainer.classList.add("instruction-container")
        var stepNumber = container.childElementCount + 1; 

        var stepInput = createStepHeader(stepNumber);

        var instructionInput = createInstructionInput(stepNumber);
        var deleteButton = createDeleteButton(instructionInput);
        instructionContainer.appendChild(stepInput);
        instructionContainer.appendChild(instructionInput);
        instructionContainer.appendChild(deleteButton);

        container.appendChild(instructionContainer)
    }


    function createStepHeader(stepNumber) {
        var stepHeader = document.createElement("h4");
        stepHeader.textContent = "Step " + stepNumber;
        return stepHeader;
    }

    
    function createInstructionInput(stepNumber) {
        var instructionInput = document.createElement("input");
        instructionInput.type = "text";
        instructionInput.name = "instructions";
        instructionInput.placeholder = "Instruction for Step " + stepNumber;
        instructionInput.required = true;
        return instructionInput;
    }
    

    function createDeleteButton(targetInput) {
        var deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            var parent = deleteButton.parentNode;
            var containerElement = parent.parentElement
            // console.log(containerElement)
            containerElement.removeChild(parent); 

            try{
                updateStepNumbers(containerElement);
            }catch{

            }
        };
        return deleteButton;
    }
    function updateStepNumbers(container) {
        var children = container.children;
        // console.log(children)
        for (var i = 0; i < children.length; i++) {
            var stepHeader = children[i].querySelector("h4");
            var parent = stepHeader.parentElement

            // console.log(parent)
            var inputInstruction = parent.querySelector('input')
            // console.log(stepHeader)
            // console.log(parent)
            if (stepHeader) {
                stepHeader.textContent = "Step " + (i + 1);
                inputInstruction.placeholder = "Instruction for Step " + (i + 1);
            }
        }
    }

});
document.addEventListener("DOMContentLoaded", function () {
    try{

        document.getElementById('recipeSearchBtn').addEventListener('click', function() {
            searchRecipes();
        });
    }catch{

    }
});


function searchRecipes() {

    const appId = 'fbf980cd'; 
    const appKey = '17f290186199c2129b0e48087b583767';
    const recipeInput = document.getElementById('recipeInput').value;

    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeInput}&app_id=${appId}&app_key=${appKey}`;

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

            const topFiveRecipes = data.hits.slice(0, 5);
            if (topFiveRecipes.length > 0) {
                console.log(topFiveRecipes)
                displayResults(topFiveRecipes)
            } else {
                
                console.log('No recipes found.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe-container';

    
        recipeDiv.innerHTML = `<div class="recipe-image-container">
                                
                                   <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                                   <i class="fa-regular fa-bookmark save-recipe-icon"></i>
                               </div>
                               <h4 class="recipe-title">${recipe.recipe.label}</h4>
                               <a class="btn btn-recipe" href="${recipe.recipe.url}" target="_blank">View</a>`;

        recipeContainer.appendChild(recipeDiv);

        
    
    });

    
}

