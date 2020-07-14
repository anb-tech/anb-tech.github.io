
$(function(){

/*	$('.skills__slider').slick({
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 2,
		adaptiveHeight: true,
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
	*/

	/*	skills slider*/

	$('.skills__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: false,
		nextArrow: false,
		centerPadding: '60px',
	});

	$('.slider-arrow__back').on('click', function(){
		$('.skills__slider').slick('slickPrev'),
		$('.slider-arrow__back').addClass('slider-arrow__active');
		setTimeout(function(){
			$('.slider-arrow__back').removeClass('slider-arrow__active');
		}, 300);
	});


	$('.slider-arrow__next').on('click', function(){
		$('.skills__slider').slick('slickNext'),
		$('.slider-arrow__next').addClass('slider-arrow__active');
		setTimeout(function(){
			$('.slider-arrow__next').removeClass('slider-arrow__active');
		}, 300);
	});

	/*instrument slider*/

	$('.skills__instruments-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: false,
		nextArrow: false,
		centerPadding: '60px',
	});

	$('.instruments-arrow__back').on('click', function(){
		$('.skills__instruments-slider').slick('slickPrev'),
		$('.instruments-arrow__back').addClass('slider-arrow__active');
		setTimeout(function(){
			$('.instruments-arrow__back').removeClass('slider-arrow__active');
		}, 300);
	});


	$('.instruments-arrow__next').on('click', function(){
		$('.skills__instruments-slider').slick('slickNext'),
		$('.instruments-arrow__next').addClass('slider-arrow__active');
		setTimeout(function(){
			$('.instruments-arrow__next').removeClass('slider-arrow__active');
		}, 300);
	});

	/*projects slider*/

	$('.projects-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: false,
		nextArrow: false,
	});

		$('.projects-arrow__back').on('click', function(){
		$('.projects-slider').slick('slickPrev'),
		$('.projects-arrow__text-back').addClass('animate__animated animate__pulse animate__slower');
		setTimeout(function(){
			$('.projects-arrow__text-back').removeClass('animate__animated animate__pulse animate__slower');
		}, 300);
	});


	$('.projects-arrow__next').on('click', function(){
		$('.projects-slider').slick('slickNext'),
		$('.projects-arrow__text-next').addClass('animate__animated animate__pulse animate__slower');
		setTimeout(function(){
			$('.projects-arrow__text-next').removeClass('animate__animated animate__pulse animate__slow');
		}, 300);
	});

	/*languages*/

	$('.top__inner-ru').on('click', function(){
		$('.eng').css('display','none'),
		$('.ru').css('display','block'),
		$('.top__inner-ru').addClass('active-language'),
		$('.top__inner-eng').removeClass('active-language');
	});
	$('.top__inner-eng').on('click', function(){
		$('.ru').css('display','none'),
		$('.eng').css('display','block'),
		$('.top__inner-eng').addClass('active-language'),
		$('.top__inner-ru').removeClass('active-language');
	});

});


