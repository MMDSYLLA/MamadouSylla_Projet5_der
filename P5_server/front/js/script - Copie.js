"use script"
 let tab_canapes=[];
// envoi d'une requete pour récupérer le infos sur les canapés
fetch("http://127.0.0.1:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  
  })
  .then(function(value) {
    tab_canapes=value;
   
// on vise l'élément <section> qui a l'ID items
  const items = document.getElementById('items');
// Ajout des éléments dans la page html

// Début de la boucle 
for (let x=0;  x <= tab_canapes.length-1; x++ ) {
  
  // création de l'élément  html <a>.... </a>
  var a = document.createElement('a');
  
  //création de l'attribut href de l'élément <a>
  a.setAttribute("href", "./product.html?id="+tab_canapes[x]['_id']);  // Change le type de l'input en un type password

//Réecriture du contenu  de l'objet <a>
  a.innerHTML = "<article>"  +
     "<img src="+tab_canapes[x]['imageUrl']+" alt="+tab_canapes[x]['altTxt']+">" +
     "<h3 class='productName'>"+tab_canapes[x]['name']+"</h3>" +
     "<p class='productDescription'>"+tab_canapes[x]['description']+"</p>"+
     "</article>";

  // Ajout de <a> au parent itemms   
   items.appendChild(a);
  }
//Fin de la boucle

})
  .catch(function(err) {
    // Une erreur est  survenue
  }); // fin de la fonction fetch


	

	

  
 
           

             
           
          