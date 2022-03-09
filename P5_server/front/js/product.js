    // fonction qui traite les informations reçues par la requête 'http://127.0.0.1:3000/api/products/:id'
    let nomProduit="";
   
    let altImg="";
    let srcImg="";

    function dataProcessing(tab_canape){
     
   //================== image ===================================================
    // on vise l'élément <div> de  class=item__img
    const div = document.getElementsByClassName('item__img');
   
    // création d'une balise img
    let image= document.createElement('img');
 
    // Création d'attributs (src et alt ) dans la balise img
    image.setAttribute("src", tab_canape['imageUrl']); 
      srcImg=tab_canape['imageUrl'];

    image.setAttribute("alt", tab_canape['altTxt']); 
        altImg=tab_canape['altTxt'];


    // Ajout de <img> au parent <div> 
      div[0].appendChild(image);
  
    //================== Title ===================================================
    // on vise l'élément <h1> de id= title
    const h1 = document.getElementById('title');
    
    // on insère les éléments dans la page html
      h1.innerText=tab_canape['name'];
      nomProduit=tab_canape['name'];
     //================== Price ===================================================   
      // on vise l'élément <span> de id= price
      const span = document.getElementById('price');

      // on insère les éléments dans la page html
        span.innerText=tab_canape['price'];
       
     //================== Price ===================================================   
    // on vise l'élément <p> de id=description
      const p = document.getElementById('description');

      // on insère les éléments dans la page html
        p.innerText=tab_canape['description'];

    //================== Price ===================================================   
    // on vise l'élément <select> de id=color
    const select = document.getElementById('colors');
   
 // Début de la boucle 
for (let x=0; x <= tab_canape['colors'].length-1; x++ ) {
  
    // création d'une balise <option>
    var option = document.createElement('option');

    // Ajout du contenu dans la balise <option>
      option.innerText=tab_canape['colors'][x];

    // Ajout de <option> au parent <select> 
       select.appendChild(option);

    }
//Fin de la boucle
} 

//==============  Début du programme ===========================================================
//On enregistre l'url de la page dans la variable url_string
let url_string  = window.location.href; 

// on déclare un objet URL avec l'url de la page en paramètre (url_string)
let obj_url     = new URL(url_string);

// On cherche l'id avec la méthode 'searchParams.get(id)'
let id = obj_url.searchParams.get("id");

  // envoi d'une requête (fetch)  pour récupérer les informations du canapé correspondant
  // à l'id (sur le quel l'utilisateur a cliqué dans  la page Accueil
  fetch("http://127.0.0.1:3000/api/products/" + id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {  
    //traitement du résultat (un tableau avec les infos du canapé)
  dataProcessing(value);

  })
  .catch(function(err) {
    // Une erreur est  survenue
  }); // fin de la fonction fetch

  //===========================================================================================
  let compteur=0;
  let contenu_panier=[];
   
  // Test de l'existence de la clé 'panier'
  if (localStorage.getItem("panier") === null ){
    contenu_panier;
  }
  else{
       console.log('lecture du panier'); 
       contenu_panier=JSON.parse (localStorage.panier);
  }
  
  
  // On récupère l'élément sur lequel on veut détecter le clic
  const btn_ajoutAuPanier = document.getElementById('addToCart');
  
  // On écoute l'événement click
  btn_ajoutAuPanier.addEventListener('click', function() {    
   
    // vérification du champ "couleur"
  const select = document.getElementById('colors');
    if (select.value==""){
      alert('veuillez selectionner une couleur');
      return;
    }
    
    // vérification du champ "quantité"
     const liste_quantite=document.getElementById('quantity');
    if (liste_quantite.value< 1|| liste_quantite.value >5 ){
      alert('veuillez selectionner une quantitté entre 1 et 5');
      return;
    }
    let couleur=select.value;
    let quantite=liste_quantite.value;
    let produit={id : id, name: nomProduit, quantity: quantite, color:couleur, image:srcImg, texteImg:altImg};
  
  //=================BOUCLE FOR : RECHERCHE DU PRODUIT DANS LE PANIER ==========================
  
    let indice_produit=0;
    let produit_dans_panier =false;
    for (indice_produit=0; indice_produit <= contenu_panier.length-1; indice_produit++ ) {
     
     if (contenu_panier[indice_produit].id==id && contenu_panier[indice_produit].color== couleur){  
        produit_dans_panier = true;
      break;  // ON QUITTE LA BOUCLE
    }
  } // FIN DE LA BOUCLE FOR 
  
  //==================Traitement de la recherche dans le panier par un tese conditionnel============================================================
  
  if (produit_dans_panier === true) { // CAS N° 1 : LE CANAPE EXISTE DANS LE PANIER
      
      // INCREMENTATION DE LA QUANTITE  
      contenu_panier[indice_produit].quantity= Number(contenu_panier[indice_produit].quantity)+Number(quantite);
     
      //Mise à jour du contenu du panier
      obj=JSON.stringify(contenu_panier); 
      localStorage.setItem('panier', obj ); 
  }
  else { // CAS N°2 : AJOUT DU PRODUIT DANS LE PANIER
        contenu_panier.push(produit);
        obj=JSON.stringify(contenu_panier); 
        localStorage.setItem('panier', obj ); 
       
  }
  }); 
  

 

  
