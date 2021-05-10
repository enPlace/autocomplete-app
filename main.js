const searchBar = document.getElementById("search-bar")
const dropdown= document.querySelector(".dropdown-results")
let results = document.querySelectorAll(".result")
const stateInfo = document.querySelector(".state-info")
const searchForm = document.getElementById("search-form")
const inputContainer = document.getElementById("input-container")


let matches =[] //holds matches from the json file
let activeItem = false //for holding active list item in autocomplete field.
let searchText = "" //for keeping track of user input


const getMatches = async(string) =>{
    //checks a string for matches in the states.json file and adds them to an array
    const regex = new RegExp(`^${string}`, 'i')
    const response = await fetch('/data/states.json');
    const data = await response.json()
    return matches = data.filter(state=>{
        return state.abbr.match(regex) || state.name.match(regex)||state.capital.match(regex)
    })
}

/*______________Dom manipulation functions____________________ */
function removeChildren(parent){
    //removes all children of an element
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    };
}

function newDropdown(string, i){
    //inserts a new item in the autocomplete dropdown
    const newdiv = document.createElement("div")
    newdiv.className ="result"
    newdiv.textContent = string
    newdiv.setAttribute("data-target", i)
    dropdown.appendChild(newdiv)
}

function infoConstructor(name, capital, abbreviation){
    //formats state information and inserts it into the DOM
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
function submitState(state){
    //formats page with the search result and clears the searchBar
    //and autocomplete fields. Takes a "state" object from the json 
    //file as an argument.
    removeChildren(stateInfo)
    stateInfo.style.display="block"
    infoConstructor(state.name, state.capital, state.abbr)
    searchBar.value = ""
    dropdown.style.display = "none"
    removeChildren(dropdown)
}

function noMatches(){
    //inserts a message into the DOM if no matches are found
    removeChildren(stateInfo)
    stateInfo.style.display="block"
    const newh3 = document.createElement("h3")
    newh3.textContent = "No state or capital matches found."
    stateInfo.appendChild(newh3)
}




/*_______________Event Handlers_______________ */
searchBar.addEventListener("input", async e=>{
    //gets matches for the searchBar.value and adds 
    //them to the autocomplete dropdown
    removeChildren(dropdown) 
    stateInfo.style.display="none" //removing previous search results
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
        results = document.querySelectorAll(".result") //updates results nodelist
    })

searchForm.addEventListener("submit", e=>{
    //returns a match if there is one. The full
    //word does not need to be typed. 
    e.preventDefault();
    if(searchBar.value && results.length){
        const state = matches[results[0].dataset.target]
        submitState(state)
    }
    else{
        noMatches()
    }
})

dropdown.addEventListener("click", e=>{
    //selects a state if it is clicked on from the dropdown autocomplete field.
        const state = matches[e.target.dataset.target]
        submitState(state)
})
document.addEventListener("keydown", e=>{
    console.log(e.key)
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