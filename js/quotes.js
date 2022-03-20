const quotes = [
    {
        quote:"Be yourself; everyone else is already taken.",
        author:"Oscar Wilde"
    },
    {
        quote:"You only live once, but if you do it right, once is enough.",
        author:"Mae West"
    },
    {
        quote:"Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author:"Mahatma Gandhi"
    },
    {
        quote:"If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
        author:"Haruki Murakami"
    },
    {
        quote:"One glance at a book and you hear the voice of another person, perhaps someone dead for 1,000 years. To read is to voyage through time.",
        author:"Carl Sagan"
    },
    {
        quote:"If you live each day as it was your last, someday you'll most certainly be right",
        author:"Steve Jobs"
    },
    {
        quote:"Being the richest man in the cemetery doesn't matter to me. Going to bed at night saying we've done something wonderful... that's what matters to me.",
        author:"Steve Jobs"
    },
    {
        quote:"Risk comes from not knowing what you're doing.",
        author:"Warren Buffett"
    },
    {
        quote:"Someone's sitting in the shade today because someone planted a tree a long time ago.",
        author:"Warren Buffett"
    },
    {
        quote:"You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.",
        author:"Albert Camus"
    }
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const chosenQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = `"${chosenQuote["quote"]}"`;
author.innerText = chosenQuote["author"];