let motionPath = document.querySelector('.motion__path');
let similarPointTemplate = document.querySelector('#similar-point-template').content.querySelector('.point');
let motionElemList = document.querySelectorAll('.motion__elem');
let settingsMenu = document.querySelector('.settings-menu');
let contextMenu = document.querySelector('.context-menu');
let saveFormButton = motionPath.querySelector('#save-form-button');
let closeFormButton = motionPath.querySelector('#close-form-button')
let defaultValuesForm = document.querySelector('.default-values__menu');
let clearPathButton = document.querySelector('.default-values__delete-button');
let settingsForm = document.querySelector('.form');
let showInfoButton = document.querySelector('.default-values__title');
let infoText = document.querySelector('.default-values__info-inner');
let numberPoints;
let saveTarget;
let data;

////////////////////////// work with data //////////////////////////

function createPoint(data) {
    data.forEach(item => {
        
        let point = document.createElement('div');
        point.classList.add('point', 'motion__elem');
        point.style.top = (item.top_position) + 'px';
        point.style.left = (item.left_position) + 'px';

        point.innerHTML = `
		<div class='point__inner'>
		    <div class='point__radius2' style='width: ${item.radius2}px; height: ${item.radius2}px; background-image: radial-gradient(circle closest-side at ${(item.radius2)/2}px ${(item.radius2)/2}px, rgba(0, 124, 33, 0.8) 0%, rgba(0, 124, 33, 0.2)) '>
		        <div class='point__radius1' style='width: ${item.radius1}px; height: ${item.radius1}px;'>
		            <div class='point__center'>
		                <p class='point__name'>
		                    ${item.id}
		                </p>
                    </div>
		        </div>
		    </div>
		</div>`;
        motionPath.appendChild(point);
    });
}

function requestGET() {
    let request = localStorage.getItem('data');
    data = request ? JSON.parse(request) : [];
    if (data[data.length - 1] == undefined) {
        numberPoints = 0
    } else {
        numberPoints = data[data.length - 1].id
    }

}



function requestPOST(e, name = numberPoints, radius1 = defaultValuesForm.querySelector('#radius1').value,
                     radius2 = defaultValuesForm.querySelector('#radius2').value,
                     signal1 = defaultValuesForm.querySelector('#signal1').value,
                     signal2 = defaultValuesForm.querySelector('#signal2').value) {

    let obj = {
        id: numberPoints,
        name: name,
        radius1: radius1,
        radius2: radius2,
        signal_quality1: signal1,
        signal_quality2: signal2,
        top_position: e.clientY - (radius2/2),
        left_position: e.clientX - (radius2/2),
    };

    data.push(obj);
    let request = JSON.stringify(data);
    localStorage.setItem('data', request);

}

function requestDELETE(target) {

    let deleteElemId = Number(target.querySelector('.point__name').textContent);
    let dataForSlice = (JSON.parse(localStorage.getItem('data')));
    let slicedPoints = dataForSlice.filter((item) => item.id !== deleteElemId);
    localStorage.setItem('data', JSON.stringify(slicedPoints));

}

let onPathClick = (e) => {
    const target = e.target;
    contextMenu.classList.add('hidden');

////////////////////////// add elem on path //////////////////////////

    if (target == motionPath && settingsMenu.classList.contains('hidden')) {

        let newPoint = similarPointTemplate.cloneNode(true);
        numberPoints++;
        requestPOST(e);

        newPoint.querySelector('.point__name').textContent = numberPoints;
        newPoint.querySelector('.point__radius2').style.width = data[data.length-1].radius2 + 'px';
        newPoint.querySelector('.point__radius2').style.height = data[data.length-1].radius2 + 'px';
        newPoint.querySelector('.point__radius1').style.width = data[data.length-1].radius1 + 'px';
        newPoint.querySelector('.point__radius1').style.height = data[data.length-1].radius1 + 'px';
        newPoint.querySelector('.point__radius2').style.backgroundImage = `radial-gradient(circle closest-side at ${(data[data.length-1].radius2)/2}px ${(data[data.length-1].radius2)/2}px, rgba(0, 124, 33, ${(data[data.length-1].signal_quality1)/100}) 0%, rgba(0, 124, 33, ${(data[data.length-1].signal_quality2)/100}))`;
        console.log(newPoint.querySelector('.point__radius2').style.backgroundImage);

        newPoint.style.top = e.clientY - (data[data.length-1].radius2)/2 + 'px';
        newPoint.style.left = e.clientX - (data[data.length-1].radius2)/2 + 'px';

        motionPath.appendChild(newPoint);

    }

    ////////////////////////// elem motion //////////////////////////

    else if (target.closest('.motion__elem')) {
        motionTarget = target.closest('.motion__elem');

        motionTarget.addEventListener('mousedown', function (e) {
            e.preventDefault();
            var startCoords = {
                x: e.clientX,
                y: e.clientY
            };

            var onMouseMove = function (e) {
                e.preventDefault();

                var shift = {
                    x: startCoords.x - e.clientX,
                    y: startCoords.y - e.clientY
                };

                startCoords = {
                    x: e.clientX,
                    y: e.clientY
                };

                motionTarget.style.top = (motionTarget.offsetTop - shift.y) + 'px';
                motionTarget.style.left = (motionTarget.offsetLeft - shift.x) + 'px';

                let settingsElemId = Number(target.querySelector('.point__name').textContent);
                let changedData = data.map(p=>{
                    if (p.id == settingsElemId) {
                        return ({
                            id: p.id,
                            name: p.sname,
                            radius1: p.radius1,
                            radius2: p.radius2,
                            signal_quality1: p.signal_quality1,
                            signal_quality2: p.signal_quality2,
                            top_position: (motionTarget.offsetTop - shift.y),
                            left_position:  (motionTarget.offsetLeft - shift.x)
                        })
                    }
                    return p;
                });
                localStorage.setItem('data', JSON.stringify(changedData));

            };

            var onMouseUp = function (e) {
                e.preventDefault();
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp)
            }
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

    }
}

////////////////////////////// context menu ///////////////////////////////////////////////

let onPointRightClick = (e) => {

    e.preventDefault();
    const target = e.target;
    if ((target.querySelector('.point__center') !== null) || (target.classList.contains('point__center'))) {
        saveTarget = target;
        if (contextMenu.classList.contains('hidden')) {
            contextMenu.style.top = `${e.clientY}px`;
            contextMenu.style.left = `${e.clientX}px`;
            contextMenu.classList.remove('hidden');

        } else {
            contextMenu.classList.add('hidden');
        }
    }
}

let onContextMenuClick = (e) => {

    const target = e.target;
    if (target.classList.contains('context-menu__back')) {
        contextMenu.classList.add('hidden');
    }
    if (target.classList.contains('context-menu__open-setting')) {
        if (settingsMenu.classList.contains('hidden')) {
            settingsMenu.style.top = `${e.clientY}px`;
            settingsMenu.style.left = `${e.clientX}px`;
            settingsMenu.classList.remove('hidden');

        } else {
            settingsMenu.classList.add('hidden');
        }
    }
    if (target.classList.contains('context-menu__delete-point')) {
        requestDELETE(saveTarget);
        let domPointToDelete = saveTarget.closest('.motion__elem');
        domPointToDelete.remove();
        contextMenu.classList.add('hidden');
    }
}

////////////////////////// setup points parameters from settings menu //////////////////////////////

let onSentFormClick = () => {
    let settingsElemId = Number(saveTarget.querySelector('.point__name').textContent);
    let settingPoint = data.filter((item) => item.id == settingsElemId);
    settingPoint.name = settingsForm.querySelector('.form-settings__name').value;
    settingPoint.radius1 = settingsForm.querySelector('.form-settings__radius1').value;
    settingPoint.radius2 = settingsForm.querySelector('.form-settings__radius2').value;
    settingPoint.signal_quality1 = settingsForm.querySelector('.form-settings__signal1').value;
    settingPoint.signal_quality2 = settingsForm.querySelector('.form-settings__signal2').value;

    let changedData = data.map(p=>{
        if (p.id == settingsElemId) {
            return ({
                id: settingsElemId,
                name: settingPoint.name,
                radius1: settingPoint.radius1,
                radius2: settingPoint.radius2,
                signal_quality1: settingPoint.signal_quality1,
                signal_quality2: settingPoint.signal_quality2,
                top_position: p.top_position,
                left_position: p.left_position
            })
        }
        return p;
    });
    localStorage.setItem('data', JSON.stringify(changedData));
    while (motionPath.firstChild) {
        motionPath.removeChild(motionPath.firstChild);
    }
    createPoint(changedData);
    settingsMenu.classList.add('hidden');
}

let onShowInfoClick = () => {
    if (infoText.classList.contains('hidden')) {
        infoText.classList.remove('hidden')
    } else {
        infoText.classList.add('hidden')
    }

}

let onClearPathButtonClick = () => {
    numberPoints = 0;
    while (motionPath.firstChild) {
        motionPath.removeChild(motionPath.firstChild);
    }
    localStorage.removeItem('data');

}

let onCloseFormButtonClick = () => {
    settingsMenu.classList.add('hidden');
}

let body = document.querySelector('.body');

let onBodyClick = () => {
    contextMenu.classList.add('hidden');
}


/////////////////////////////////// events on page ///////////////////////////////////////////

window.addEventListener('DOMContentLoaded', () => {
    requestGET();
    createPoint(data);
});

showInfoButton.addEventListener('click', onShowInfoClick);
clearPathButton.addEventListener('click', onClearPathButtonClick);
closeFormButton.addEventListener('click', onCloseFormButtonClick);
saveFormButton.addEventListener('click', onSentFormClick)
body.addEventListener('click', onBodyClick);
contextMenu.addEventListener('click', (e) => onContextMenuClick(e));
motionPath.addEventListener('contextmenu', (e) => onPointRightClick(e));
motionPath.addEventListener('click', onPathClick);


