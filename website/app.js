/* Global Variables */
let generateButton = document.getElementById("generate");

let mainUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = '&appid=f2df801126f749704e01a69ef8844d2b&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

generateButton.addEventListener("click", getData = () => {
    let zip = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;
    let totalUrl = mainUrl + zip + apiKey;
    let myPromise = allData(totalUrl);  // To fetch all data from link
    myPromise.then((object) => {
        let requireData = {
            theTemp: object.main.temp,
            theFellings: feelings,
            theDate: newDate
        }
        sendTheData('/add', requireData);
    })
    retrieveData();
});

// Fetch data from open weather map
async function allData (url) {
    let jsonData = await fetch(url);
    try {
        let realData = await jsonData.json();  // To return data as object  
        return realData;
    } catch (error) {
        console.log("error")
    }
}

// Send data to server
let sendTheData = async (route, data) => {
    // Change the defult method of fetch to post the data to server
    let postedData = await fetch(route, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data),
    });
    try {
        let myData = await postedData.json();
    } catch (error) {
        console.log(error);
    }
} 


// Get data from server 
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
 // Transform into JSON
    const allData = await request.json()
    console.log(allData)
 // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.theTemp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.theFellings;
    document.getElementById("date").innerHTML =allData.theDate;
    }
    catch(error) {
    console.log("error", error);
   // appropriately handle the error
    }
}