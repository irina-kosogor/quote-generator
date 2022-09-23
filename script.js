//Get Quote from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    if (!loader.hidder) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //If author is blank add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = "Author unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.innerText = data.quoteText;
        }
        complete();
    }

    catch (error) {
        getQuote();
    }

   
}

//Tweet a quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweeterUrl, '_blank');
}

//On Load
getQuote();

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);    
twitterBtn.addEventListener('click', tweetQuote);