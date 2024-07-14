let AllMeals =[];
let homeItem = document.querySelector('#homeItem');
let itemContainer = document.querySelector('#itemContainer');
let submitBtn;
async function  getMeal() {
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let finalResult = await result.json();
    AllMeals = finalResult.meals;
    displayGetMeal();
}
getMeal();
function displayGetMeal() {
    let cartona =``;
    for (let i = 0; i < AllMeals.length; i++) {
        cartona+=`
            <div class="col-md-3">
                <div onclick="getMealID('${AllMeals[i].idMeal}');" class="homeItem position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${AllMeals[i].strMealThumb}"alt="">
                    <div class="homeItemLayer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${AllMeals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
    }
    homeItem.innerHTML = cartona;
}
async function getMealID(id) {
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    finalResult = await result.json();
    getHomeItemDetails(finalResult.meals[0]);
}
async function getHomeItemDetails(detail) {
    let Recipes = ``;
    for (let x = 1; x <= 20; x++) {
        if (detail[`strIngredient${x}`] != null && detail[`strIngredient${x}`] !="") {
            Recipes += `<li class="alert alert-info m-2 p-1">${detail[`strMeasure${x}`]} ${detail[`strIngredient${x}`]}</li>`;
        }
    }
    let tagsCartona = ``;
    if (detail.strTags) {
        let Tags = detail.strTags.split(",");
        for (let j = 0; j < Tags.length; j++) {
            tagsCartona += `
            <li class="alert alert-danger m-2 p-1">${Tags[j]}</li>`;
        }
    }
    let cartona =`
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${detail.strMealThumb}" alt="">
                    <h2>${detail.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${detail.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${detail.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${detail.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${Recipes}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsCartona}
                </ul>
                <a href="${detail.strSource}" class="btn btn-success">Source</a>
                <a href="${detail.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;
        homeItem.innerHTML = cartona;
}
function openSideBar() {
    $(".side-bar").animate({left: 0}, 500);
    $(".openClose").removeClass("fa-align-justify");
    $(".openClose").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".side-bar-links li").eq(i).animate({top: 0}, (i + 5) * 100);
    }
}
function closeSideBar() {
    let barLeftWidth = $(".side-bar .side-bar-left").outerWidth();
    $(".side-bar").animate({left: -barLeftWidth}, 500);
    $(".openClose").addClass("fa-align-justify");
    $(".openClose").removeClass("fa-x");
    $(".side-bar-links li").animate({top: 300}, 500);
}
closeSideBar();
$(".side-bar .openClose").click(function() {
    if ($(".side-bar").css("left") == "0px") {
        closeSideBar();
    } else {
        openSideBar();
    }
})
function showSearch() {
    let input = `
    <div class="col-md-6 ">
        <input oninput="getSearchMealName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input oninput="getSearchMealFletter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>`;
    itemContainer.innerHTML = input;
    homeItem.innerHTML = "";
}
async function getSearchMealName(meal) {
    homeItem.innerHTML = "";
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    let finalResult = await result.json();
    AllMeals = finalResult.meals;
    displayGetMeal();
}
async function getSearchMealFletter(meal) {
    homeItem.innerHTML = "";
    if (meal=="") {
        meal ='a'
    }
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`);
    let finalResult = await result.json();
    AllMeals = finalResult.meals;
    displayGetMeal();
}
async function showCategories() {
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let finalResult = await result.json();
    AllMeals = finalResult.categories;
    displayCategories();
}
function displayCategories() {
    let cartona = ``;
    for (let i = 0; i < AllMeals.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div onclick="getCategoryMeals('${AllMeals[i].strCategory}');" class="homeItem position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${AllMeals[i].strCategoryThumb}" alt="">
                    <div class="homeItemLayer position-absolute text-center text-black p-2">
                        <h3>${AllMeals[i].strCategory}</h3>
                        <p>${AllMeals[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`;
    }
    homeItem.innerHTML = cartona;
}
async function getCategoryMeals(cate) {
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`);
    let finalResult = await result.json();
    AllMeals = finalResult.meals.slice(0,20);
    displayGetMeal();
}
async function showArea() {
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let finalResult = await result.json();
    AllMeals = finalResult.meals;
    displayArea();
}
function displayArea() {
    let cartona = ``;
    for (let i = 0; i < AllMeals.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div onclick="getAreaMeals('${AllMeals[i].strArea}');" class="text-center rounded-2 cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${AllMeals[i].strArea}</h3>
                </div>
            </div>`;
    }
    homeItem.innerHTML = cartona;
}
async function getAreaMeals(area) {
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let finalResult = await result.json();
    AllMeals = finalResult.meals.slice(0,20);
    displayGetMeal();
}
async function showIngrediant() {
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let finalResult = await result.json();
    AllMeals = finalResult.meals.slice(0,20);
    displayIngrediant();
}
function displayIngrediant() {
    let cartona = ``;
    for (let i = 0; i < AllMeals.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div onclick="getIngrediantMeals('${AllMeals[i].strIngredient}');" class="text-center rounded-2 cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${AllMeals[i].strIngredient}</h3>
                        <p>${AllMeals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>`;
    }
    homeItem.innerHTML = cartona;
}
async function getIngrediantMeals(inger) {
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inger}`);
    let finalResult = await result.json();
    AllMeals = finalResult.meals;
    displayGetMeal();
}
function showContacts() {
    let cartona=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" oninput="validateName()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" oninput="validateEmail()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" oninput="validatePhone()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" oninput="validateAge()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" oninput="validatePass()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" oninput="validateRepass()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>`;
     homeItem.innerHTML = cartona;
     submitBtn = document.getElementById('submitBtn');
     document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

let nameInput = /^[a-zA-Z ]+$/;
function validateName() {
    if (nameInputTouched) {
        if (nameInput.test(document.getElementById("nameInput").value)) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
            return true;
        }
        else{
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
            return false;
        }   
    }
}
let emailInput =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validateEmail() {
    if (emailInputTouched) {
        if (emailInput.test(document.getElementById("emailInput").value)) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
            return true;
        }
        else{
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
            return false;
        }   
    }
}
let phoneInput =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
function validatePhone() {
    if (phoneInputTouched) {
        if (phoneInput.test(document.getElementById("phoneInput").value)) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
            return true;
        }
        else{
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
            return false;
        }   
    }
}
let ageInput =/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
function validateAge() {
    if (ageInputTouched) {
        if (ageInput.test(document.getElementById("ageInput").value)) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
            return true;
        }
        else{
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
            return false;
        }   
    }
}
let passwordInput =/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
function validatePass() {
    if (passwordInputTouched) {
        if (passwordInput.test(document.getElementById("passwordInput").value)) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
            return true;
        }
        else{
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
            return false;
        }
    }
}
function validateRepass() {
    if (repasswordInputTouched) {
        if (document.getElementById("repasswordInput").value == document.getElementById("repasswordInput").value) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
            return true;
        }
        else{
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
            return false;
        }
    }
}
if (validateName()&&validateEmail()&&validatePhone()&&validateAge()&&validatePass()&&validateRepass()) {
    submitBtn.removeAttribute("disabled");
}
else{
    submitBtn.setAttribute('disabled',true);
}