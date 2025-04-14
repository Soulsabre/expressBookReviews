import axios from 'axios';

//Task 10: Make a get request for all books
axios.get('https://sstathamdev-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/')
    .then((response) => {
        console.log("Task 10: Request for all books");
        console.log(response.data);
    })
    .catch((error) => {
        console.log("Task 10: Something went wrong");
        console.log(error);
    });

//Task 11: Make a get request for a book by ISBN
axios.get('https://sstathamdev-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/4')
   .then((response) => {
        console.log("Task 11: Request a book by ISBN (4)");
        console.log(response.data);
   })
   .catch((error) => {
        console.log("Task 11: Something went wrong:");
        console.log(error);
   });


//Task 12: Make a get request for books by an author
axios.get('https://sstathamdev-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/Hans%20Christian%20Andersen')
    .then((response) => {
        console.log("Task 12: Request books by an author (Hans Christian Andersen)");
        console.log(response.data);
    })
    .catch((error) => {
        console.log("Task 12: Something went wrong:");
        console.log(error);
    });


    
//Task 13: Make a get request for books by Title
axios.get('https://sstathamdev-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/Le%20P\u00e8re%20Goriot')
    .then((response) => {
        console.log("Task 13: Request a book by title (Le P\u00e8re Goriot)");
        console.log(response.data);
    })
    .catch((error) => {
        console.log("Task 13: Something went wrong");
        console.log(error);
    })