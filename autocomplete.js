const createAutocomplete = ({root, renderOption, onOptionSelect, inputValue, fetchData }) => {
root.innerHTML = `
<label><b>Search </b></label>
<input class = "input" />
<div class = "dropdown">
<div class = "dropdown-menu">
    <div class = "dropdown-content results"></div>
 </div> 
 </div>
`

const resultsWrapper = root.querySelector('.results') 
const dropdown = root.querySelector('.dropdown') 
const input = root.querySelector('input')

//DEBOUNCE

 const debounce = (func, delay) => {
     let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId  )
        }
       timeoutId =  setTimeout(() => {
            func.apply(null,args)
        }, delay)
     }

 }

 const onInput = async event => {
  const items =  await fetchData(event.target.value)
  dropdown.classList.add('is-active')

  for(let item of items){
    const option = document.createElement('a')

    if(item.length = 0){
        dropdown.classList.remove('is-active')
        return
    }

    option.classList.add('dropdown-item')
    option.innerHTML =  renderOption(item )
   
    option.addEventListener('click', () =>{
        dropdown.classList.remove('is-active')
        input.value = inputValue(item)
        onOptionSelect(item)
    })

    resultsWrapper.append(option)
  }
  
 }


 input.addEventListener('input', debounce(onInput, 700) )
 document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
 })   
}

