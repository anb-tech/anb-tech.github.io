let chapters = [
{
	chapterIntro1:"Я не отношусь к фанатам современенного японского творчества, однако считаю, что некоторые произведения их кинематографа достойны особого внимания. Я хочу посвятить эту страницу одному из таких произведений под названием «Унесённые при́зраками». На мой взгляд даже те, кто испытывают отвращание к японской анимациии смогут в полной мере насладиться всей гаммой чуства что дарит данный шедевр.",
	chapterIntro2:"«Унесённые при́зраками» (яп. 千と千尋の神隠し Сэн то Тихиро но камикакуси, «Сэн и похищенная ками Тихиро») — полнометражный аниме-фильм режиссёра Хаяо Миядзаки, снятый на студии «Гибли» в 2001 году. Премьера фильма в Японии состоялась 20 июля 2001 года, а в России 31 декабря 2002 года.",
},
{
	chapterHistory:"Маленькая Тихиро вместе с мамой и папой переезжают в новый дом. Заблудившись по дороге, они оказываются в странном пустынном городе, где их ждет великолепный пир. Родители с жадностью набрасываются на еду и к ужасу девочки превращаются в свиней, став пленниками злой колдуньи Юбабы, властительницы таинственного мира древних богов и могущественных духов. Теперь, оказавшись одна среди магических существ и загадочных видений, отважная Тихиро должна придумать, как избавить своих родителей от чар коварной старухи и спастись из пугающего царства призраков..."
},
{
	chapterAutor1:"Японский режиссер-мультипликатор, сценарист, продюсер.",
	chapterAutor2:"Родился 5 января 1941 года в Токио (Япония) в семье директора фабрики «Миядзаки Эйрплейн», которая производила запчасти для самолётов.",
	chapterAutor3:"В детстве много рисовал и мечтал стать мангакой, но после просмотра мультфильма Легенда о белой змее» (1958) задумался о карьере аниматора.",
	chapterAutor4:"В 1963 году окончил факультет политики и экономики Университета Гакусюин. После выпуска работал раскадровщиком и художником на студии «Toei Animation».",
	chapterAutor5:"Дебютировал как режиссёр с мультсериалом «Люпен III» (1971 – 1972). В 1985 году стал одним из основателей «Studio Ghibli».",
	chapterAutor6:"Признание на Западе пришло к режиссеру после премьеры картины «Принцесса Мононоке» (1997), которая стала первым в истории мультфильмом, удостоившимся премии Японской киноакадемии. Одна из наиболее узнаваемых и известных работ режиссёра - анимационный фильм «Унесённые призраками» (2001), отмеченный «Золотым медведем» Берлинского кинофестиваля, премией «Оскар» и номинацией на премию BAFTA."
},
];

let addTopicButtons = document.getElementsByClassName("button__topic");
let chaptersPositions = document.getElementsByClassName("chapter-text");
let showChaptersButton = document.getElementById("showChaptersButton");
let animateButtons = document.getElementsByClassName("button__topic-link");
let counters = [0,0,0,0];

const addChapterHeader = () => {
	switch (counters[0]) {
		case 0:
		chaptersPositions.item(0).insertAdjacentHTML('beforeend', chapters[0].chapterIntro1);
		counters[0]++;
		break;

		case 1:
		chaptersPositions.item(1).insertAdjacentHTML('beforeend', chapters[0].chapterIntro2);
		animateButtons.item(0).classList.add("button__topic-active");
		counters[0]++;
		break;

		case 2:
		animateButtons.item(0).classList.remove("button__topic-active");
		chaptersPositions.item(0).innerHTML="";
		chaptersPositions.item(1).innerHTML="";
		counters[0] = 0;
		break
	}
};

const addChapterHistory = () => {
	if (counters[1] == 0) {
		chaptersPositions.item(2).insertAdjacentHTML('beforeend', chapters[1].chapterHistory);
		animateButtons.item(1).classList.add("button__topic-active");
		counters[1]++;
	} else if (counters[1] == 1) {
		animateButtons.item(1).classList.remove("button__topic-active");
		chaptersPositions.item(2).innerHTML="";
		counters[1] = 0;
	}
};

const addChapterAutor = () => {
	switch (counters[2]) {
		case 0:
		chaptersPositions.item(3).insertAdjacentHTML('beforeend', chapters[2].chapterAutor1);
		animateButtons.item(2).classList.add("button__topic-active");
		counters[2]++;
		break;

		case 1:
		chaptersPositions.item(4).insertAdjacentHTML('beforeend', chapters[2].chapterAutor2);
		counters[2]++;
		break;

		case 2:
		chaptersPositions.item(5).insertAdjacentHTML('beforeend', chapters[2].chapterAutor3);
		counters[2]++;
		break;

		case 3:
		chaptersPositions.item(6).insertAdjacentHTML('beforeend', chapters[2].chapterAutor4);
		counters[2]++;
		break;

		case 4:
		chaptersPositions.item(7).insertAdjacentHTML('beforeend', chapters[2].chapterAutor5);
		counters[2]++;
		break;

		case 5:
		chaptersPositions.item(8).insertAdjacentHTML('beforeend', chapters[2].chapterAutor6);
		counters[2]++;
		break;

		case 6:
		animateButtons.item(2).classList.remove("button__topic-active");
		for (let i = 3; i < 9; i++) {
			chaptersPositions.item(i).innerHTML="";
		}
		counters[2] = 0;
		break
	}
};

const addAllChaptersAwful = () => {
	if (counters[3] == 0) {
		if (counters[0] != 1) {chaptersPositions.item(0).insertAdjacentHTML('beforeend', chapters[0].chapterIntro1);}
		if (counters[0] != 2) {chaptersPositions.item(1).insertAdjacentHTML('beforeend', chapters[0].chapterIntro2);}
		if (counters[1] != 1) {chaptersPositions.item(2).insertAdjacentHTML('beforeend', chapters[1].chapterHistory);}
		if (counters[2] != 1) {chaptersPositions.item(3).insertAdjacentHTML('beforeend', chapters[2].chapterAutor1);}
		if (counters[2] != 2) {chaptersPositions.item(4).insertAdjacentHTML('beforeend', chapters[2].chapterAutor2);}
		if (counters[2] != 3) {chaptersPositions.item(5).insertAdjacentHTML('beforeend', chapters[2].chapterAutor3);}
		if (counters[2] != 4) {chaptersPositions.item(6).insertAdjacentHTML('beforeend', chapters[2].chapterAutor4);}
		if (counters[2] != 5) {chaptersPositions.item(7).insertAdjacentHTML('beforeend', chapters[2].chapterAutor5);}
		if (counters[2] != 6) {chaptersPositions.item(8).insertAdjacentHTML('beforeend', chapters[2].chapterAutor6);}
		counters[3]++;
		for (let i = 0; i < 3; i++) {
			animateButtons.item(i).classList.add("button__topic-active");
		}
	}
	else if (counters[3] == 1) {
		for (let i = 0; i < 9; i++) {
			chaptersPositions.item(i).innerHTML="";
		}
		for (let i = 0; i < 3; i++) {
			animateButtons.item(i).classList.remove("button__topic-active");
		}
		counters[3] = 0;
	}
}

addTopicButtons.item(0).addEventListener("click", addChapterHeader);
addTopicButtons.item(1).addEventListener("click", addChapterHistory);
addTopicButtons.item(2).addEventListener("click", addChapterAutor);
showChaptersButton.addEventListener("click", addAllChaptersAwful);






