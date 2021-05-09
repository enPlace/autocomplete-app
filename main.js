//I want to take the search input, and each time there is a
//new input, run a function that searches for a match in the JSON file. 

//I'll use a regular expression for the search and async/awat/fetch to get the data
// from the json file. 
//for now, simply console.log the data. 

const searchBar = document.getElementById("search-bar")
const dropdown= document.querySelector(".dropdown-results")
const results = document.querySelectorAll(".result")



let matches =[]

const getMatches = async(searchText) =>{
    const regex = new RegExp(`^${searchText}`, 'i')
    const response = await fetch('/data/states.json');
    const data = await response.json()
   
    //data.forEach(item=>{console.log(item)})
    console.log("_________________________")
    return matches = data.filter(state=>{
        return state.abbr.match(regex) || state.name.match(regex)||state.capital.match(regex)
    })

}


function newDropdown(string, i){
    const newdiv = document.createElement("div")
    newdiv.className ="result"
    newdiv.textContent = string
    newdiv.id = i
    dropdown.appendChild(newdiv)

}


searchBar.addEventListener("input", async ()=>{
    //removing any previous dropdown results
    while(dropdown.firstChild){
        dropdown.removeChild(dropdown.firstChild)
    };
    await getMatches(searchBar.value);
    if (matches.length==0||!searchBar.value) dropdown.style.display = "none";
    else{
        dropdown.style.display = "block"
        const regex = new RegExp(`^${searchBar.value}`, 'i')
        for(let i=0; i<matches.length; i++){
            const state = matches[i]
            if(state.capital.match(regex)) {return newDropdown(state.capital, i)}
            else{newDropdown(state.name, i)}

        }


        /* matches.forEach(state=>{
            return(state.capital.match(regex))? newDropdown(state.capital) 
            : newDropdown(state.name)
        }) */
        }
    })
