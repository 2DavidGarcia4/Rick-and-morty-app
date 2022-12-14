import React, {useState} from "react";
import useFetch from "../hoocks/useFetch";

function Seeker({getId, getButton, locations}){
   const [text, setText] = useState("") // Para obtener el contenido del imput
   const [options, setOptions] = useState([]) // Areglo de botones para la paginacion

   function optionClick(event){ // Cuando se hace click en una opcion del buscador
      const form = document.querySelector(".seeker")
      getId(event.target.dataset.id)
      getButton(undefined)
      setText(locations.find(f=> f.id==event.target.dataset.id).name)
      form.classList.remove("seeker-active")
   }

   function inputChange(event){ // Para actualizar los datos cuando se modifica el valor del input
      const form = document.querySelector(".seeker"), valLowercase = event.target.value.toLowerCase()
      setText(event.target.value)
      if(event.target.value.trim()){
         form.classList.add("seeker-active")
         const filter = locations.filter(f=> f.name.toLowerCase().startsWith(valLowercase)).length==0 ? locations.filter(f=> f.name.toLowerCase().includes(valLowercase)) : locations.filter(f=> f.name.toLowerCase().startsWith(valLowercase))
         const mapa = filter.map(m=> Object({id: m.id, start: m.name.toLowerCase().startsWith(valLowercase) ? "" : m.name.slice(0, m.name.toLowerCase().indexOf(valLowercase[0])), span: m.name.slice(m.name.toLowerCase().indexOf(valLowercase[0]), m.name.toLowerCase().indexOf(valLowercase[0])+event.target.value.length), end: m.name.slice(m.name.toLowerCase().indexOf(valLowercase[0])+valLowercase.length, m.name.length)})) 
         setOptions(mapa)
      }else{
         form.classList.remove("seeker-active")
         setOptions([])
      }
   }

   return (
      <form onSubmit={(e)=> e.preventDefault()} className="seeker">
         <label htmlFor="location" className="search" ><i id="icon-search" className="fi fi-br-search"></i></label>
         <input onChange={inputChange} autoComplete="off" type="text" list="locations" id="location" placeholder="Location" value={text} />
         <div className="separator"></div>
         <ul className="autocomp-box">
            {options.map(option=> (
               <li key={option.id} onClick={optionClick} className="autocomp_option" data-id={option.id}>
                  {option.start}
                  <span>{option.span}</span>
                  {option.end}
               </li>)
            )}
         </ul>
      </form>
   )
}
export default Seeker