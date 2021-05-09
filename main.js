//I want to take the search input, and each time there is a
//new input, run a function that searches for a match in the JSON file. 

//I'll use a regular expression for the search and async/awat/fetch to get the data
// from the json file. 
//for now, simply console.log the data. 

let searchBar = document.getElementById("search")

let regex
const logs = ()=>{
    console.log(searchBar.value)
}


let matches
const al = new RegExp(`al`, 'i')
const getMatches = async(searchText) =>{
    const regex = new RegExp(`^${searchText}`, 'i')
    const response = await fetch('../data/states.json');
    const data = await response.json()
   
    //data.forEach(item=>{console.log(item)})
    console.log("_________________________")
    matches = data
    matches =matches.filter(state=>{
        return state.abbr.match(regex) || state.name.match(regex)
    })
    matches.forEach(state=>{console.log(state.name)})
   

}



searchBar.addEventListener("input", ()=>getMatches(searchBar.value))