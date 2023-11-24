
document.addEventListener("DOMContentLoaded", function () {
    const heroContainer = document.querySelector(".hero-inner-container");
    const logoContainer = document.querySelector(".logo-container");
    const navbarOuter = document.querySelector('.navbar-outer-container')
    const burgerMenu = document.querySelector('.burger-menu')
    const closeMenuBtn = document.getElementById('closeBtn')
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

    // event for burger click
    burgerMenu.addEventListener("click", function () {
        toggleNavbar();
    });
    closeMenuBtn.addEventListener("click", function () {
        toggleNavbar();
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





document.addEventListener("DOMContentLoaded", function () {
    try{

        var addIngredientButton = document.getElementById("addIngredientButton");
        addIngredientButton.addEventListener("click", addIngredient);
        
        var addInstructionButton = document.getElementById("addInstructionButton");
        addInstructionButton.addEventListener("click", addInstruction);
    }catch{

    }
});
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
        
        containerElement.removeChild(parent); 

        updateStepNumbers(containerElement);
    };
    return deleteButton;
}
function updateStepNumbers(container) {
    var children = container.children;
    // console.log(children)
    for (var i = 0; i < children.length; i++) {
        var stepHeader = children[i].querySelector("h4");
        var parent = stepHeader.parentElement
        var inputInstruction = parent.querySelector('input')
        // console.log(stepHeader)
        // console.log(parent)
        if (stepHeader) {
            stepHeader.textContent = "Step " + (i + 1);
            inputInstruction.placeholder = "Instruction for Step " + (i + 1);
        }
    }
}


