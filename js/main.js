
$(function(){

	$(document).ready(function() {     
		$('.rating').hover(function(){   
			var rating = document.querySelector 
			$(this).addClass('rating-js');    
		},     
		function(){    
			$(this).removeClass('rating-js');     
		});
	});

	$('.skills__slider').slick({
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 2,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1
			}
		}
		]
	});
});
//function

var
rating = document.querySelector('.rating'),
ratingItem = rating.querySelectorAll('.rating-item');
console.log(rating);
console.log(ratingItem);

rating.onclick = function(e) { 
	var target = e.target;

	if(target.classList.contains('rating-item')) { 
		removeClass(ratingItem,'current-active') 
		target.classList.add('active','current-active')
	}
}


rating.onmouseover = function(e) {
	var target = e.target;

	if(target.classList.contains('rating-item')) {
		removeClass(ratingItem, 'active') 
		target.classList.add('active');
		mouseOverActiveClass(ratingItem)
	}
}

rating.onmouseout = function() {
	addClass(ratingItem, 'active');
	mouseOutActiveClass(ratingItem)
}

/*удаление активированных классов*/
function removeClass(arr) {
	for(let i = 0, iLen = arr.length; i < iLen; i ++) { 
		for(let j = 1; j < arguments.length; j ++) {
			ratingItem[i].classList.remove(arguments[j]);
		}
	}
}

function addClass(arr) {
	for(let i = 0, iLen = arr.length; i < iLen; i ++) {
		for(let j = 1; j < arguments.length; j ++) {
			ratingItem[i].classList.add(arguments[j]); 
		}
	}
}

function mouseOverActiveClass(arr){
	for(let i = 0, iLen = arr.length; i < iLen; i++) {
		if(arr[i].classList.contains('active')) {
			break;
		} else {
			arr[i].classList.add('active'); 
		}
	}
}

function mouseOutActiveClass(arr){ 	for(let i = arr.length-1; i >=1; i--) {
	if(arr[i].classList.contains('current-active')) {
		break; 
	} else {
		arr[i].classList.remove('active');
	}
}
}







