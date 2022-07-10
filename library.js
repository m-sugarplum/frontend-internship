const selectSort = document.getElementById("sort");

// Allow sorting Library ascending and descending by publishedAt date and by title.




const cardsDisplay = document.getElementsByClassName("main");

// let currentNumOfArticles = 15;

let storedArticlesId = Object.keys(localStorage);
// console.log(storedArticlesId);


let storedArticlesCount = localStorage.length;
// console.log(storedArticlesCount);


// localStorage.clear()

window.addEventListener("click", (event) => {
    const addedClasses = event.target.classList;
    const targetId = event.target.id;
    if (addedClasses.contains("star")) {

        if (addedClasses.contains("star-fill") && Object.keys(localStorage).includes(targetId)) {
            console.log(targetId);
            localStorage.removeItem(`${targetId}`);
            console.log("Article REMOVED FROM STORAGE");
            event.target.classList.toggle("star-fill");
            console.log(Object.keys(localStorage));


        } else if (!addedClasses.contains("star-fill") && !Object.keys(localStorage).includes(targetId)) {
            console.log(Object.keys(localStorage))
            event.target.classList.toggle("star-fill");
            localStorage.setItem(`${event.target.id}`, `${event.target.id}`);
            (console.log("Article SAVED TO THE STORAGE, id: ", event.target.id));

        }
        else {
            console.log("Something went wrong");


        }
    }
});

const displayTotalSavedArticles = () => {
    const totalSavedArticles = document.getElementById("total-saved-articles");
    // console.log(totalSavedArticles);
    totalSavedArticles.innerText = storedArticlesCount;
}
displayTotalSavedArticles();


selectSort.addEventListener("change", (event) => {
    selectedSort = event.target.value;
    if (selectedSort === "date-asc") {
        cardsDisplay[0].remove();
        const body = document.getElementsByTagName("BODY")[0];
        const newMain = document.createElement("div");
        newMain.classList.add("main");
        body.append(newMain);
        displayArticles("publishedAt:asc");
    }
    else if (selectedSort === "date-desc") {
        console.log("FUNCTION - REMOVE ARTICLES AND ADD NEW, SORTED BY DATE");

        cardsDisplay[0].remove();
        const body = document.getElementsByTagName("BODY")[0];
        const newMain = document.createElement("div");
        newMain.classList.add("main");
        body.append(newMain);
        // console.log(newMain);
        // get sorted articles
        displayArticles("publishedAt:desc");
    } else if (selectedSort === "title") {
        cardsDisplay[0].remove();
        const body = document.getElementsByTagName("BODY")[0];
        const newMain = document.createElement("div");
        newMain.classList.add("main");
        body.append(newMain);
        displayArticles("title");
    } else {
        console.log("something went wrong");
    }


    // displayArticles(0, currentNumOfArticles);
    // displayArticlesCount();
})

// window.addEventListener("scroll", function () {
//     if (storedArticlesCount > 8) {
//         const closeToEndCard = document.getElementsByClassName("close-to-end");
//         const cardPosition = closeToEndCard[0].offsetTop;
//         if (window.scrollY > cardPosition) {
//             closeToEndCard[0].classList.value = "card";
//             displayArticles();
//             currentNumOfArticles += 8;
//             changeArticlesCounter(currentNumOfArticles);
//         }
//     }

// });


// const getArticlesCount = async () => {
//     try {
//         const res = await fetch("https://api.spaceflightnewsapi.net/v3/articles/count");
//         const data = await res.json();
//         return data
//     } catch (err) {
//         console.log("ERROR :( ", err);
//     }
// };


// const displayArticlesCount = async () => {
//     const fetchedCount = await getArticlesCount()
//     articlesTotal = fetchedCount;
//     const countDisplay = document.getElementById("total-articles");
//     countDisplay.innerText = articlesTotal;
// }


// const getArticles = async (startNumber, limitNumber) => {
//     try {
//         const res = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_start=${startNumber}&_limit=${limitNumber}`);
//         const data = await res.json();
//         return data
//     } catch (err) {
//         console.log("ERROR :( ", err);
//     }
// };

const getSavedArticles = async (sortType) => {
    let url = `https://api.spaceflightnewsapi.net/v3/articles?`;

    try {
        for (let article of storedArticlesId) {
            newUrl = url.concat(`id_in=${article}&`);
            url = newUrl
            // console.log(article, url);
        }
        // url = url.concat("_sort=publishedAt:asc");
        url = url.concat(`_sort=${sortType}`);
        // url = url.concat(`_sort=`);
        // console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        return data
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};
// getSavedArticles("publishedAt:asc");

const displayArticles = async (sortType) => {
    const fetchedArticles = await getSavedArticles(sortType);
    // console.log(fetchedArticles, storedArticlesId);

    for (let i = 0; i < storedArticlesCount; i++) {
        const newCard = document.createElement("article");
        newCard.classList.add("card");
        // console.log(fetchedArticles[i].id);

        // if (i === storedArticlesCount - 8) {
        //     newCard.classList.add("close-to-end");
        // };


        const newStar = document.createElement("img");
        if (storedArticlesId.includes(`${fetchedArticles[i].id}`)) {
            // console.log("this article is saved in the storage! id: ", fetchedArticles[i].id);
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
    displayArticles("publishedAt:asc");
};

// displayArticlesCount();


console.log("HELLO FROM THE LIBRARY SCRIPT!");

