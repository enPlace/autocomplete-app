//I want to take the search input, and each time there is a
//new input, run a function that searches for a match in the JSON file. 

//I'll use a regular expression for the search and async/awat/fetch to get the data
// from the json file. 
//for now, simply console.log the data. 

const searchBar = document.getElementById("search-bar")
const dropdown= document.querySelector(".dropdown-results")
const results = document.querySelectorAll(".result")
const stateInfo = document.querySelector(".state-info")

let matches =[]

const getMatches = async(searchText) =>{
    const regex = new RegExp(`^${searchText}`, 'i')
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

searchBar.addEventListener("input", async ()=>{
    //removing any previous dropdown results
    removeChildren(dropdown)
    
    await getMatches(searchBar.value);
    if (matches.length==0||!searchBar.value) dropdown.style.display = "none";
    else{
        dropdown.style.display = "block"
        const regex = new RegExp(`^${searchBar.value}`, 'i')
        for(let i=0; i<matches.length; i++){
            const state = matches[i]
            if(state.capital.match(regex)) {newDropdown(state.capital, i)}
            if(state.name.match(regex) || state.abbr.match(regex)){newDropdown(state.name, i)}

        }
        }
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