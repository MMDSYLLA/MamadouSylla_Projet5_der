
// Fonction qui retourne des données stockéesen session-localStorage-si elles existent 
function GetStorage( ){
let contenu_session=[];

// Test de l'existence de la clé 'panier'
if (localStorage.getItem("panier") === null ){
}
else {
contenu_session=JSON.parse (localStorage.panier);

}
 return contenu_session; 
}
 
//Fonction qui fait la somme des prix  des canapés dans le panier
function Sum_price() {
 // on vise l'élément <div> de  class=item__img
  const div= document.getElementsByClassName('cart__item__content__description');
var  chaine=div[0].children[2].textContent;


}

//cart__item__content__description

//Fonction qui a pour argument l'id  d'un canapé,  
// qui envoie une requête avec l'API fetch et qui 
// retoune le prix du canapé
function  Get_Price_kanap(id_canape , Objt_prix, quantite ){
         
          
  fetch("http://127.0.0.1:3000/api/products/" + id_canape)
   .then(function(res) {
    
     if (res.ok) {
      
       return res.json();
     }
   })
   .then(function(value) {  
     //traitement du résultat (un tableau avec les infos du canapé)
     
    // price = value.price; 
      Objt_prix.textContent= value.price +' €';
     
      TotalPrix=TotalPrix+Number(value.price)*Number(quantite);
    
      TotalQuantity=  TotalQuantity+Number(quantite);
      spanTotalQuantity.textContent=TotalQuantity;
      spanTotalPrix.textContent=TotalPrix;
    
   })
   
   .catch(function(err) {
     // Une erreur est  survenue
   }); // fin de la fonction fetch

}

// Affichage d'une ligne  du panier
function Afficher_ligne_panier (produit) {

// création de l'élément  html  <article>.... </article>
let article = document.createElement('article');

// création de l'élément  html  <div>.... </div>
let cartItem_img = document.createElement('div');

// création de l'élément  html  <img>
let image = document.createElement('img');

//création de l'attribut 'src'de l'élément <img>
image.setAttribute("src", produit.image); 

 //création de l'attribut 'alt' de l'élément <img>
image.setAttribute("alt", produit.texteImg); 

// Ajout de <img> au parent <div>   
cartItem_img.appendChild(image);

cartItem_img.setAttribute('class','cart__item__img');

// Ajout de <div> au parent <article>   
article.appendChild(cartItem_img);
article.setAttribute('class', 'cart__item');
article.setAttribute('data-id', produit.id);
article.setAttribute('data-colors', produit.color);

// création de l'élément <div class="cart__item__content">
let cartItem_content = document.createElement('div');
cartItem_content.setAttribute('class', 'cart__item__content')

let cartItem_contentDescription = document.createElement('div');
cartItem_contentDescription.setAttribute('class', 'cart__item__content__description')

let h2 = document.createElement('h2');
h2.innerText=produit.name;

let couleur = document.createElement('p');
couleur.innerText= produit.color;

prix = document.createElement('p');

// Appel de la fonction de récupération du prix du canapé à partir du serveur
prix.textContent='x';

Get_Price_kanap(produit.id, prix, produit.quantity);

//Ajout dee éléments  <h2(Nom du produit)>, <p(couleur) et <p (prix )> au parent <div>   
cartItem_contentDescription.appendChild(h2);
cartItem_contentDescription.appendChild(couleur);
cartItem_contentDescription.appendChild(prix);

/*Ajout de la <div> de class='cart__item__content__description'
 à la <div> parente de class=cart__item__content */
 cartItem_content.appendChild(cartItem_contentDescription);

//Ajout de la <div> de class='cart__item__content' au parent <article>
article.appendChild(cartItem_content); 

// Création de la  <div class="cart__item__content__settings">
let cartItem_contentSettings= document.createElement('div');
cartItem_contentSettings.setAttribute('class', 'cart__item__content__settings');

// Création de la  <div class="cart__item__content__settings__quantity">
let cartItem_contentSettings_quantity= document.createElement('div');
cartItem_contentSettings_quantity.setAttribute('class', 'cart__item__content__settings__quantity');

// Création du pargraphe <p(Qté>)
let quantite=document.createElement('p');
quantite.innerText= 'Qté : ';

// Création du champ <input> de la quantité
let input_quantite=document.createElement('input');
input_quantite.setAttribute('type', 'number'); 
input_quantite.setAttribute('class', 'itemQuantity'); 
input_quantite.setAttribute('name', 'itemQuantity'); 
input_quantite.setAttribute('min', '1'); 
input_quantite.setAttribute('max', '100'); 
input_quantite.setAttribute('value', produit.quantity); 


// Ajout d'un évènement sur la changement de la quantité 
//de canapés dans le panier
input_quantite.addEventListener('change', function() { 
if(Number(input_quantite.value) <=0) {  
  location.reload();
  
  return;
}

TotalPrix=0;
TotalQuantity=0;

// Acquisition de l'id du canapé sélectionné
let article_data_id=article.getAttribute('data-id');

// Acquisition de la couleur  du canapé sélectionné
let article_data_color=article.getAttribute('data-colors');
contenu_panier=GetStorage();
if(contenu_panier.length>0){

// Recherche dans le panier, de l'indice correspondant à l'id du canapé sélectionné 
for (let x=0; x <= contenu_panier.length-1; x++ ) {
  if(contenu_panier[x].id == article_data_id && contenu_panier[x].color==article_data_color ) {
     
     // Changement de la quantité de canapés sélectionnée dans le canapé 
     contenu_panier[x].quantity = input_quantite.value;

     //Mise à jour du contenu du panier
      obj=JSON.stringify(contenu_panier); 
      localStorage.setItem('panier', obj ); 
  
  }
 
  Get_Price_kanap(contenu_panier[x].id, prix, contenu_panier[x].quantity);

}
}
}); 

// Ajout de <p(Qté)> au parent <div> de class 'cart__item__content__settings__quantity'
cartItem_contentSettings_quantity.appendChild(quantite);

cartItem_contentSettings_quantity.appendChild(input_quantite);

cartItem_contentSettings.appendChild(cartItem_contentSettings_quantity);

// création de la <div class="cart__item__content__settings__delete"> 
let cartItem_contentSettings_delete=document.createElement('div');

// Creation de <p class="deleteItem">Supprimer</p>
 let deleteItem=document.createElement('p');
 deleteItem.setAttribute('class','deleteItem');
 deleteItem.innerText='Supprimer';

 //Ajout d'un évènement  -click- sur le btn 'supprimer'
 // On écoute l'événement click
 deleteItem.addEventListener('click', function() {   

// Acquisition de l'id du canapé sélectionné
 let article_data_id=article.getAttribute('data-id');

 // Acquisition de la couleur  du canapé sélectionné
 let article_data_color=article.getAttribute('data-colors');


contenu_panier=GetStorage();
if(contenu_panier.length>0){
// Recherche dans le panier, de l'indice correspondant à l'id du canapé sélectionné 
for (let x=0; x <= contenu_panier.length-1; x++ ) {    
      if(contenu_panier[x].id == article_data_id && contenu_panier[x].color==article_data_color ) {
         
         // suppression du canapé sélectionné
         contenu_panier.splice( x,1 );

         //Mise à jour du contenu du panier
          obj=JSON.stringify(contenu_panier); 
          localStorage.setItem('panier', obj ); 
          article.remove( ); 

      }
      }
  
}

}); 


 cartItem_contentSettings_delete.appendChild(deleteItem); 
 
 cartItem_contentSettings.appendChild(cartItem_contentSettings_delete);

 article.appendChild(cartItem_contentSettings); 

// Ajout de <article > au parent <section>   
section.appendChild(article);

} //Fin de la fonctionn

//====================Debut du script ====================================================================
//document.location.href="../html/confirmation.html"; // redirection vers la page confirmation
var path = window.location.pathname;
var page = path.split("/").pop();
if(page =='cart.html'){

// On vise la balise <section> par son id
var section = document.getElementById('cart__items');

// variables globales
var prix;
var TotalPrix=0;
var TotalQuantity=0;
var spanTotalPrix=document.getElementById('totalPrice')
var spanTotalQuantity=document.getElementById('totalQuantity');
var H_Order=document.getElementById('order');

contenu_panier=GetStorage();
if(contenu_panier.length>0){

for (let x=0; x <= contenu_panier.length-1; x++ ) {

Afficher_ligne_panier(contenu_panier[x]);
} 
}

// =======================Traitement du formulaire=========================================================
//ici on enregistre le prénom de l'utilisateur
var regex_str = /^[a-zA-ZÀ-ú]+-?[a-zA-ZÀ-ú]*$/;
var Message_Erreur='test';
var H_Prenom=document.getElementById('firstName');
var Check_field=[false,false,false ,false,false]; 

 function Test_field(rgx, field, field_error, indexCheckField){
  if(rgx.test(field)===true) {
    Check_field[indexCheckField]=true;
    field_error.textContent="";
  }

  else {
    field_error.textContent='ce champ comporte une erreur';
    Check_field[indexCheckField]=false;
  }
 
 }
    H_Order.addEventListener('click', function(event) {
      event.preventDefault();
      let index;
      let h_Form=document.getElementsByClassName('cart__order__form');
      let saisie = new FormData(h_Form[0]);
      let tab_contact = {};

      for (index = 0; index < Check_field.length; index++) {
        if(Check_field[index]===false)
        break;
      }
     
    if(index !=Check_field.length) // si au moins l'un des champs est faux, on quitte la fonction
      {
        return;
      }

  // On formate les données du formulaire en JSON 
      saisie.forEach((value, key) => tab_contact[key] = value);
      contenu_panier=GetStorage();
        
   // On crée un tableau avec les id des canapés
      let tab_products=[];
       contenu_panier.forEach((value, key) => tab_products.push(value['id']));

   var json_arr = {}; // Tableau regroupant les données du formulaire et les id des canapés
        json_arr["contact"] = tab_contact;
        json_arr["products"] = tab_products;

        obj=JSON.stringify(json_arr); // conversion du tableau json_arr au format JSON
        localStorage.setItem('data_commande', obj ); // On stocke le tableau en session      
        document.location.href="../html/confirmation.html"; // redirection vers la page confirmation

    }); //==================================Fin de l'écote du bouton -commander-
  
    H_Prenom.addEventListener('blur', function()  { 
     
    let H_Prenom_Err=document.getElementById('firstNameErrorMsg');
  Test_field(regex_str, this.value,H_Prenom_Err,0);   
   });


   //ici on enregistre le nom (patronyme) de l'utilisateur
   var H_Nom=document.getElementById('lastName');

   H_Nom.addEventListener('blur', function()  { 
   let H_Nom_Err=document.getElementById('lastNameErrorMsg');
    Test_field(regex_str, this.value, H_Nom_Err,1);  

   });

   //ici on enregistre l'adresse postale de l'utilisateur
   // var regex_address = /^[a-zA-Z0-9,-.]*+-[a-zA-Z]*$/;
    var regex_address =/^[a-zA-ZÀ-ú0-9,-\s]+$/;
    var H_Address=document.getElementById('address');
    H_Address.addEventListener('blur', function()  { 
    
      let H_Address_Err=document.getElementById('addressErrorMsg');
      Test_field(regex_address, this.value, H_Address_Err,2);        
      
     });

    // ici on enregistre la ville où habite l'utilisateur
    var regex_city = /^[a-zA-ZÀ-ú-]{1,45}$/;
    var H_City=document.getElementById('city');
    H_City.addEventListener('blur', function()  { 

      let H_City_Err=document.getElementById('cityErrorMsg');
      Test_field(regex_city, this.value, H_City_Err,3); 
      
     });

    // ici on enregistre l'adresse E-mail de l'utilisateur
    var regex_email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    var H_Email=document.getElementById('email');
    H_Email.addEventListener('blur', function()  { 
      let H_Email_Err=document.getElementById('emailErrorMsg');
      Test_field(regex_email, this.value, H_Email_Err,4); 
      
     });
    }

    else {  // Traitement de la page-confirmation-
            // Test de l'existence de la clé 'data_commande'
      if (localStorage.getItem("data_commande") === null ){
      }
      else {
       data_commande = localStorage.data_commande;

        // Envoi de la requête   
        fetch("http://127.0.0.1:3000/api/products/order" , {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          body: data_commande
                  
      // On envoie data_Form + le panier
      })
      .then((response) => {
          return response.json();
          
      })
      .then((data) => {
       // Affiche les résultats
     
         let h_Order=document.getElementById('orderId');    
          h_Order.innerText=data.orderId;
        
       // On supprime les variables stockées en session
        localStorage.removeItem('data_commande');
        localStorage.removeItem('panier');
      })
      
      .catch((error) => {     
      });
      }   
    }

  //======================== Convention de nommage des variables==============================================
  // Toutes les variables globales commenceront par un lettre majuscule
  // Toutes les varibles locales commenceront par un lettre minuscule;

  // Toutes les variables qui représentent  un objet HTML  commenceront par H_  ou h_
  // selon que la variable est globle ou locale