//I want to take the search input, and each time there is a
//new input, run a function that searches for a match in the JSON file. 

//I'll use a regular expression for the search and async/awat/fetch to get the data
// from the json file. 
//for now, simply console.log the data. 

const searchBar = document.getElementById("search-bar")
const dropdown= document.querySelector(".dropdown-results")
let results = document.querySelectorAll(".result")
const stateInfo = document.querySelector(".state-info")


let matches =[] //autocomplete matches
let activeItem = false //active list item in autocomplete field.
let searchText = "" //for keeping track of user input


const getMatches = async(string) =>{
    const regex = new RegExp(`^${string}`, 'i')
    const response = await fetch('/data/states.json');
    const data = await response.json()
   
    //data.forEach(item=>{console.log(item)})
    return matches = data.filter(state=>{
        return state.abbr.match(regex) || state.name.match(regex)||state.capital.match(regex)
    })
}


function newDropdown(string, i){
    const newdiv = document.createElement("div")
    newdiv.className ="result"
    newdiv.textContent = string
    newdiv.setAttribute("data-target", i)
    dropdown.appendChild(newdiv)
}

function infoConstructor(name, capital, abbreviation){
    const newh3=document.createElement("h3")
    const nameDiv =document.createElement("div")
    const capitalDiv =document.createElement("div")
    const abbrDiv =document.createElement("div")
    newh3.textContent = "State Information"
    nameDiv.textContent=`Name: ${name}`
    capitalDiv.textContent=`Capital: ${capital}`
    abbrDiv.textContent=`Abbreviation: ${abbreviation}`
    const elements = [newh3, nameDiv, capitalDiv, abbrDiv]
    elements.forEach(element=>stateInfo.appendChild(element))
}

function removeChildren(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    };
}

let lastLetter
searchBar.addEventListener("keydown", async e=>{
    removeChildren(dropdown) //removing any previous dropdown results
console.log(e.keyCode)
    await getMatches(searchBar.value);
    if (matches.length==0||!searchBar.value) dropdown.style.display = "none";
    else{
        dropdown.style.display = "block"
        const regex = new RegExp(`^${searchBar.value}`, 'i')
        for(let i=0; i<matches.length; i++){
            const state = matches[i]
            if(state.capital.match(regex))    newDropdown(state.capital, i)
            if(state.name.match(regex) || state.abbr.match(regex))  newDropdown(state.name, i)
        }
        }
        results = document.querySelectorAll(".result")
    })

    dropdown.addEventListener("click", e=>{
        removeChildren(stateInfo)
        stateInfo.style.display="block"
       const state = matches[e.target.dataset.target]
       infoConstructor(state.name, state.capital, state.abbr)
       searchBar.value = ""
       dropdown.style.display = "none"
       removeChildren(dropdown)
    })

    function downActivator(){
        //activates next list item in autocomplete field
        if(!activeItem&&results.length!=0){
            results[0].dataset.status = "active"
            activeItem = results[0]
        }
        else if(activeItem && activeItem!= results[results.length-1]){
            let next = results[parseInt(activeItem.dataset.target) +1]
            activeItem.dataset.status = ""
            next.dataset.status = "active"
            activeItem = next

        }
        else if(activeItem && activeItem== results[results.length-1]){
            activeItem.dataset.status =""
            activeItem = false
        }

    }