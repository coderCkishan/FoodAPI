const mealDetailsContent = document.querySelector('.meal-details-content');

        // searched mealList 
        $('#search-btn').click(function(){
            let Ingredient=$('#search-input').val();
            $.trim('Ingredient');
            $.getJSON(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`,function(data){
             let html= "";
             if(data.meals){
                data.meals.forEach(meal=> {
                    html +=`
                   <div class="col-md-3" data-id="${meal.idMeal}">
                 <div class="card mx-auto" style="width: 100%;">
                     <img src="${meal.strMealThumb}" alt="food" width="200px" class="card-img-top">
                 </div> 
                 <div class="card-body">
                     <p style="font-family:'Lucida Sans Unicode';" class="card-text">${meal.strMeal}</p>
                     <a href="#" class="recipe-btn">Get Recipe</a>
                 </div>
              </div>
              `;
            });
            $('#meal').removeClass('notfound');
             }
             else{
                 html="Sorry, Can't find any recipe!!";
                 $('#meal').addClass('notfound');
                 }
                 $("#meal").html(html);
            });
        });

        //   Get Recipe Box
        $("#meal").click(function(event){
                event.preventDefault();
                if($(event.target).hasClass("recipe-btn")){
                    let mealitem=event.target.parentElement.parentElement;
                    $.getJSON(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealitem.dataset.id}`,function(data){
                             let meal=data.meals[0];
                             let html=`
                             <h2 class="recipe-title" style="color: tomato;">
                    ${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3 style="color: tomato;">Instruction:</h3>
                        <p>
                        ${meal.strInstructions}
                        </p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="" style="width: 18rem;" class="img-fluid">
                    </div>
                    <div class="recipe-link">
                       <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                    </div>
                             `;
                             $(".meal-details-content").html(html);
                             mealDetailsContent.parentElement.classList.add('showRecipe');
                    });
                }
        });

        // remove meal recipe
        $('#recipe-close-btn').click(function () {
            mealDetailsContent.parentElement.classList.remove('showRecipe');
        })
    