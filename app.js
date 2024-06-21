//fetching api
const Base_url = "https://v6.exchangerate-api.com/v6/76768aa8cd57255441ea1d0b/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
//populating both the dropdowns
//adding all the currency codes as options in the dropdown lists(from and to)
for (let select of dropdowns){
    for( let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode === "USD"){
            newOption.selected = "selected";
        } //to get usd as default selected currency
        else if(select.name ==="to" && currCode === "INR"){
            newOption.selected = "selected";
        }//to get inr as default selected currency
        select.append(newOption);
    }
    select.addEventListener("change", (event)=>{
        changeFlag(event.target);
    })
}

function changeFlag(element){
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    console.log(countryCode);
    let fromFlag = document.querySelector(".from img");
    let toFlag = document.querySelector(".to img");
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async (event) => {
    event.preventDefault(); //this is used to prevent the page from refreshing or perform any default actions when we click on the button. Allowing us to make desired changes on the click of the button and the default.
    //used to prevent default form submission behaviour
    let amount = document.querySelector(".amount input"); ///accessing the amount that the user inputs for conversion.
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 0 ){
        alert("Please enter a valid amount");
    }else if(isNaN(amtValue)){
        alert("please enter a number");
    }
    else{
        convertCurrency(amtValue);
    }

});




//taking the amount entered by the user as the input
//list of all the countries in the select option
//changing the flag alongwith the country's currency
//exchanging and printing the result on submittng the button




//converting the currency

async function convertCurrency(amtValue){
    let fromCurrency = dropdowns[0].value; //here dropdowns is a nodelist that accesses all the <select> elements with a class dropdown. dropdowns[0] represents the first select element that is the first dropdown. and dropdwons[0].value is used to retreive the currently selected option in the first dropdown.
    let toCurrency = dropdowns[1].value;
    const URL= `${Base_url}/${fromCurrency}`;

    try{
        const response = await fetch(URL); //fetching data from api url asynchronously.
        const data = await response.json(); //conversion of the retrived data from json or parses the json response from the api.
        
        if(data.result === "success"){
            const rate = data.conversion_rates[toCurrency]; // getting the rates.
            let convertedAmount = amtValue * rate;
            msg.innerText = `${amtValue} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            
        }
        else{
            console.error("something went wrong");
        }
    }
    catch(err){
        console.error(`Error fetching Data : ${err}`);
    }
}

