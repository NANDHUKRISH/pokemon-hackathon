let pokAPI ='https://pokeapi.co/api/v2/pokemon/?offset=0&limit=4'
const buttons=document.querySelector(".buttons")
let nextButton;
let prevButton;

    const nav=document.querySelector(".nav")
    nav.innerHTML =`
    <img class="pokemon-nav-logo" src="https://i.pinimg.com/originals/80/95/87/809587d927f1ed20ca2a9df792135f8b.png">
    <h3 class="header">🎉✨ COLLECTION OF POKEMON CARDS ✨🎉</h3>
    <img class="pokemon-nav-logo" src="https://i.pinimg.com/originals/80/95/87/809587d927f1ed20ca2a9df792135f8b.png">
`
 async function getDetails(){
   try{
       const details=await fetch(`${pokAPI}`);
       const data= await details.json();
       const res=data.results;
       res.map((pokstate)=>  getDetails1(pokstate.url))

       nextButton=data.next ? `<button class="btn" data-url=${data.next} >NEXT PAGE</button>`:''
       prevButton=data.previous ? `<button class="btn" data-url=${data.previous}>PREVIOUS PAGE</button>`:''
       buttons.innerHTML=prevButton+ " "+nextButton
      }
   catch(error){
      console.error(error);
     }
  }
  getDetails()


      const pokemonlist=document.querySelector(".pokemon-container")
      async function getDetails1(user){
      try{pokemonlist.innerHTML="";
         const details=await fetch(`${user}`);
         const data= await details.json();
         pokemonlist.innerHTML += `
          <div class=pokemon>
          <img class="pokemon-logo" src="https://clipground.com/images/pokemon-logo-png-5.png">
          <div class="pokemon-datas">
          <div class="poki-img-id">
          <h2 class="pokemon-id">#${data.id}</h2>
          <img class="pokemon-img" src="${data.sprites.front_shiny}" alt="${data.name.toUpperCase()}">
          </div>
          <div class="pokemon-details">
          <h3 class="pokemon-name">${data.name.toUpperCase()}</h3>     
          <h3 class="pokemon-weight">Weight-${data.weight}kg</h5> 
          <p class="pokemon-ability"><span>ABILITY - </span>${data.abilities.map((ability)=>(ability.ability.name.charAt(0).toUpperCase() +ability.ability.name.slice(1))).slice(0,2)}</p>   
          <p class="pokemon-move"><span>MOVES - </span>${data.moves.map((move)=>(move.move.name.charAt(0).toUpperCase() +move.move.name.slice(1))).slice(0,3)}</p>
          </div>
         </div>
         </div>`;      
        }
      catch(err){
          console.log(err);
       }
       }
       getDetails1()

       buttons.addEventListener('click',(e)=>{
       if(e.target.classList.contains('btn'))
       {
       let value=e.target.dataset.url;
       console.log(value);
       pokAPI=value;
       getDetails();
        }
       })


  