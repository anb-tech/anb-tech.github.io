x'use strict';

let motionPath = document.querySelector('.motion__path');
let similarPointTemplate = document.querySelector('#similar-point-template').content.querySelector('.point');
let motionElemList = document.querySelectorAll('.motion__elem');
let formWrapper = document.querySelector('.form-wrapper');
let saveFormButton = motionPath.querySelector('#save-form-button');
let closeFormButton = motionPath.querySelector('#close-form-button');
var data = [];
var numberPoints;

////////////////////////// work with data //////////////////////////
function requestGET () {
	const request = new XMLHttpRequest();
	request.open('GET', 'https://anb-tech.github.io/all_data/beacons_controler.json');
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	request.send();
	request.addEventListener('load', function() {
		if (request.status == 200) {
			data = JSON.parse(request.response);
			createPoint(data);
			console.log(data);
			numberPoints = data.length;

		} else {
			console.error('Ошибка');
		}
	});
}

function createPoint(data) {
	data.forEach(item => {
		let point = document.createElement('div');
		point.classList.add('point', 'motion__elem');
		point.style.top = (item.top_position) + 'px';
		point.style.left = (item.left_position) + 'px';

		point.innerHTML = `
		<div class="point__inner">
		<div class="point__radius2" style="width: ${item.radius2}px; height: ${item.radius2}px">
		<div class="point__radius1" style="width: ${item.radius1}px; height: ${item.radius1}px">
		<div class="point__center"></div>
		</div>
		</div>
		</div>
		<p class="point__name">
		${item.name}
		</p>
		`;
		motionPath.appendChild(point);
	});
};


window.addEventListener('DOMContentLoaded', () => {
	requestGET();
});

let onPathClick = (e) => {

	const target = e.target;

	console.log(target);
	console.log(e.currentTarget);

////////////////////////// elem motion //////////////////////////
	if (target.matches('.motion__elem')) {

		target.addEventListener('mousedown', function(e){
			e.preventDefault();
			var startCoords = {
				x: e.clientX,
				y: e.clientY
			};

			var onMouseMove	= function(e) {
				e.preventDefault();

				var shift = {
					x: startCoords.x - e.clientX,
					y: startCoords.y - e.clientY
				};

				startCoords	= {
					x: e.clientX,
					y: e.clientY
				};

				target.style.top = (target.offsetTop - shift.y) + 'px';
				target.style.left = (target.offsetLeft - shift.x) + 'px';
			};

			var onMouseUp = function(e) {
				e.preventDefault();
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp)
			}

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		});

	};

////////////////////////// show menu //////////////////////////
	if (target.matches('.point')) {
		target.addEventListener('contextmenu', function(e) {
			if (formWrapper.classList.contains('hidden')){
				formWrapper.classList.remove('hidden');
			}
			else {
				formWrapper.classList.add('hidden');
			}
		});
	};

////////////////////////// add elem on path //////////////////////////
	if (target == motionPath) {

		let newPoint = similarPointTemplate.cloneNode(true);
		numberPoints++;
		console.log(numberPoints);

		newPoint.querySelector('.point__name').textContent = numberPoints;
		newPoint.querySelector('.point__radius2').style.width = data[data.length-1].radius2  + 'px';
		newPoint.querySelector('.point__radius2').style.height = data[data.length-1].radius2  + 'px';
		newPoint.querySelector('.point__radius1').style.width = data[data.length-1].radius1 + 'px';
		newPoint.querySelector('.point__radius1').style.height = data[data.length-1].radius1 + 'px';
		newPoint.style.top = e.clientY - (data[data.length-1].radius2)/2 + 'px';
		newPoint.style.left = e.clientX - (data[data.length-1].radius2)/2 + 'px';


		motionPath.appendChild(newPoint);

		function requestPOST (e) {

			let obj = {
				name: numberPoints,
				radius1: data[data.length-1].radius1,
				radius2: data[data.length-1].radius2,
				signal_quality1: 80,
				signal_quality2: 50,
				top_position: e.clientY - (data[data.length-1].radius2)/2,
				left_position: e.clientX - (data[data.length-1].radius2)/2,
				id: numberPoints
			};

			let json = JSON.stringify(obj);

			const request = new XMLHttpRequest();
			request.open('POST', 'https://anb-tech.github.io/all_data/beacons_controler.json');
			request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			request.send(json);
		};

		requestPOST(e);
	};
};

motionPath.addEventListener('click',onPathClick);


