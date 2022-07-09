// const articlesUrl = "https://api.spaceflightnewsapi.net/v3/articles";
// const getAnother15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=15&_limit=15";
// const get15Articles = "https://api.spaceflightnewsapi.net/v3/articles?pagination[start]=1&pagination[limit]=15";
// const countUrl = "https://api.spaceflightnewsapi.net/v3/articles/count";
// const get15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=0&_limit=15";


// let defaultNumber = 15;

// let defaultStartNumber = 0;

const slider = document.getElementById("num-of-articles");

const cardsDisplay = document.getElementsByClassName("main");

let currentNumOfArticles = 15;

let storedArticlesId = Object.keys(localStorage);
console.log(storedArticlesId);
// localStorage.clear();
// const closeToEndCard = document.getElementsByClassName("close-to-end");
// console.log(closeToEndCard);
// console.log(storedArticlesId);
// console.log(Storage.length);
// localStorage.getItem(`15700`);

// let checkIdArray = [];

// let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

/*
function init(){
    displayArticlesCount
}
let shownArticles = 15;

function countarticles(var extra){
    shownArticlers+=extra;

}
*/

// const favourites = document.getElementsByClassName("favourites");


window.addEventListener("click", (event) => {
    // console.log(Object.keys(localStorage))
    // console.log(event.target.classList);
    const addedClasses = event.target.classList;
    const targetId = event.target.id;
    if (addedClasses.contains("star")) {
        // event.target.classList.toggle("star-fill");
        if (addedClasses.contains("star-fill") && Object.keys(localStorage).includes(targetId)) {
            console.log(targetId);
            localStorage.removeItem(`${targetId}`);
            console.log("ITEM REMOVED FROM STORAGE");
            event.target.classList.toggle("star-fill");
            console.log(Object.keys(localStorage));


        } else if (!addedClasses.contains("star-fill") && !Object.keys(localStorage).includes(targetId)) {
            console.log(Object.keys(localStorage))
            event.target.classList.toggle("star-fill");
            localStorage.setItem(`${event.target.id}`, `${event.target.id}`);
            (console.log("article saved to the storage, id: ", event.target.id));
            // console.log(Object.keys(localStorage));
        }
        else {
            console.log("Something went wrong");


        }

        // console.log(event.target.id);
        // localStorage.setItem(`${event.target.id}`, `${event.target.id}`);
        // const articleAdded = localStorage.getItem(`${event.target.id}`);
        // console.log(articleAdded);
        // console.log(localStorage.length);
    }
});

const changeArticlesCounter = (num) => {
    const selectedValueDisplay = document.getElementById("selected-value");
    selectedValueDisplay.innerText = num;
}


slider.addEventListener("change", (event) => {
    currentNumOfArticles = event.target.value;
    changeArticlesCounter(currentNumOfArticles);
    cardsDisplay[0].remove();
    const body = document.getElementsByTagName("BODY")[0];
    const newMain = document.createElement("div");
    newMain.classList.add("main");
    body.append(newMain);
    displayArticles(0, currentNumOfArticles);
    displayArticlesCount();
})

window.addEventListener("scroll", function () {
    const closeToEndCard = document.getElementsByClassName("close-to-end");

    const cardPosition = closeToEndCard[0].offsetTop;

    if (window.scrollY > cardPosition) {
        closeToEndCard[0].classList.value = "card";
        displayArticles(currentNumOfArticles, 8);
        currentNumOfArticles += 8;
        changeArticlesCounter(currentNumOfArticles);
    }
});


const getArticlesCount = async () => {
    try {
        const res = await fetch("https://api.spaceflightnewsapi.net/v3/articles/count");
        const data = await res.json();
        return data
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};


const displayArticlesCount = async () => {
    // let articlesTotal = null;
    const fetchedCount = await getArticlesCount()
    articlesTotal = fetchedCount;
    const countDisplay = document.getElementById("total-articles");
    countDisplay.innerText = articlesTotal;
}


const getArticles = async (startNumber, limitNumber) => {
    try {
        const res = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_start=${startNumber}&_limit=${limitNumber}`);
        const data = await res.json();
        return data
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};


const displayArticles = async (firstArticle, numOfArticles) => {
    const fetchedArticles = await getArticles(firstArticle, numOfArticles);
    console.log(fetchedArticles);
    for (let i = 0; i < numOfArticles; i++) {



        const newCard = document.createElement("article");
        newCard.classList.add("card")
        // const newAddToFav = document.createElement("p");
        // newAddToFav.setAttribute("id", "favourites");
        // newAddToFav.classList.add("favourites");
        // newAddToFav.innerText = "Add to favourites";
        if (i === numOfArticles - 8) {
            newCard.classList.add("close-to-end");

        };
        const newStar = document.createElement("img");
        if (storedArticlesId.includes(`${fetchedArticles[i].id}`)) {
            console.log("this article is saved in the storage! id: ", fetchedArticles[i].id);
            newStar.classList.add("star", "star-fill");


        } else {
            newStar.classList.add("star");
        }
        newStar.setAttribute("src", "./photos/star.svg");
        newStar.setAttribute("id", `${fetchedArticles[i].id}`);

        const newImg = document.createElement("img");
        newImg.src = fetchedArticles[i].imageUrl;
        newImg.classList.add("article-image")
        const newTitle = document.createElement("h3");
        newTitle.innerText = fetchedArticles[i].title;
        newTitle.classList.add("article-title");
        const newSummary = document.createElement("p");
        let summaryText = fetchedArticles[i].summary;
        if (summaryText.length > 200) {
            summaryText = `${summaryText.slice(0, 200)} [...]`
        }
        newSummary.innerText = summaryText
        newSummary.classList.add("article-summary");

        const newLink = document.createElement("a");
        newLink.setAttribute("id", "full-article-link");
        newLink.setAttribute("href", `${fetchedArticles[i].url}`);
        newLink.setAttribute("target", "_blank");
        newLink.text = "Read more";

        const newFooter = document.createElement("footer");
        const newParagraph = document.createElement("p");
        const publishDate = fetchedArticles[i].publishedAt.split("T")[0];
        const day = publishDate.split("-")[2];
        const month = publishDate.split("-")[1];
        const year = publishDate.split("-")[0];
        const newsSite = fetchedArticles[i].newsSite;
        newParagraph.innerHTML = `<b>${newsSite}</b>&nbsp;&nbsp;${day}.${month}.${year}`;
        newFooter.append(newParagraph);
        newCard.append(newImg, newStar, newTitle, newSummary, newLink, newFooter);

        const cardsDisplay = document.getElementsByClassName("main");
        cardsDisplay[0].append(newCard);
    }
}
    ;

window.onload = (event) => {
    displayArticles(0, 15);
};

displayArticlesCount();


console.log("HELLO FROM THE SCRIPT!");

