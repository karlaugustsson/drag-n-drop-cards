window.onload = () => {
	
	let cards = [] ;

	let card_form = document.forms["card_form"];
		card_form.addEventListener("submit" , submitNewCard);

	let card_container = document.getElementsByClassName("card_container")[0];


	card = createCard("big topic" , "lorem ipsum");
	card.panels.push(createPanel("hepp","knapp"));


	function createCard(title , content){
		return { id : cards.length, title : title , content:content , panels : []};
	}

	function createPanel(title , content){
		return { title : title , content:content };
	}

	function submitNewCard(e){
		e.preventDefault();
		let form = e.target;
		let form_inputs = form.elements;
		let card = createCard(form_inputs[0].value,form_inputs[1].value);
		clear_form_inputs(form);
		cards.push(card);
		appendCardToElement(card,card_container);
		return 
		
	}

	function appendCardToElement(card,element){

		let card_el = document.createElement("div");
			card_el.dataset.card = card.id;
			card_el.className = "card";
		
		let card_title_el = document.createElement("div");
			card_title_el.innerHTML = "<h3>" + card.title  + "</h3>"; 
		
		let card_desc_el = document.createElement("div");
			card_desc_el.className = "hide" 
			card_desc_el.innerHTML = "<p>" + card.content + "</p>";
		
		


		card_el.appendChild(create_delete_button(card_el,cards,cards.indexOf(card)));
		card_el.appendChild(card_title_el);
		card_el.appendChild(card_desc_el);
		//card_el.appendChild(create_panel_form());
		element.appendChild(card_el)
	}

	function clear_form_inputs(form){

		for (var i = 0; i < form.childElementCount ; i++)
		{ 
		 	if (form.children[i].type === "text" || form.children[i].nodeName.toLowerCase() == "textarea" ) {
		 	 form.children[i].value = "" }
		}
	}
	function create_delete_button(el,array,index){
		let delete_button = document.createElement("span");
		delete_button.innerHTML = "x";

		delete_button.addEventListener("click" , (e) => { el.parentNode.removeChild(el);array.splice(index,0);});
		return delete_button ; 
	}
	

	
}