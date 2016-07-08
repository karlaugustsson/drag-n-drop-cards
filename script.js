window.onload = () => {
	
	let cards = [] ;

	let card_form = document.forms["card_form"];
		card_form.addEventListener("submit" , submitNewCard);

	let card_container = document.getElementsByClassName("card_container")[0];


	// card = createCard("big topic" , "lorem ipsum");
	// card.panels.push(createPanel("hepp","knapp"));

	function findCardById(id){

			for(var i = 0 ; i <= cards.length ; i++){

				if(cards.id == id ){
					return cards[i]
					break;
				}
			}
	return false;

	}
	function findCardElement(el){
		
		let parentNode = el.parentNode;
		let result = null; 

		while (parentNode != null){
			parentNode = parentNode.parentNode;

			if(parentNode != null && parentNode.dataset.card){
				return parentNode;
			}
		}
		return false;
	}
	function createCard(title , content){
		var card = { id : cards.length, title : title , content:content , panels : []};
		cards.push(card);
		return card;
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
		appendCardToElement(card,card_container);
		return 
		
	}
	function submitNewCardPanel(e){

		e.preventDefault();
		let form = e.target;
		let form_inputs = form.elements;
		let card_el = findCardElement(form);
		
		if(card_el != false){
			let card = findCardById(card_el.dataset.id);
			console.log(card);
			if(card){
				let panel = createPanel(form_inputs[0].value,form_inputs[1].value);
				card.panels.push(panel);
				console.log(form);
				
				appendPanelToCardElement(panel,card_el);
				card_el.removeChild(form.parentNode);
				card_el.appendChild(form.parentNode);
				clear_form_inputs(form);				
			}
		}	
		
	}

	function appendPanelToCardElement(panel,card_el){

		let panel_html = document.createElement("div");
			panel_html.className = "panel";

		let panel_title_paragraph = document.createElement("p")
			panel_title_paragraph.className = "title" ;
			panel_title_paragraph.innerHTML = panel.title; 
		
		
		let panel_body_paragraph = document.createElement("p")
			panel_body_paragraph.className = "body" ;
			panel_body_paragraph.innerHTML = panel.content; 
		

			panel_html.appendChild(panel_title_paragraph);
			panel_html.appendChild(panel_body_paragraph);
			card_el.appendChild(panel_html);

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
		card_el.appendChild(create_panel_form());
		element.appendChild(card_el)
	}
	function create_panel_form(){
	let form_div = document.createElement("div");
		form_div.className = "panel form";
	let panel_form = document.createElement("form");

	let panel_title_input = document.createElement("input") ;
	panel_title_input.type = "text";
	panel_title_input.className = "panel title";
	panel_title_input.placeholder = "Title";
	
	let panel_body_input = document.createElement("textarea");
	panel_body_input.className = "panel body";
	panel_body_input.placeholder = "Description" 

	let submit = document.createElement("input");
	submit.type = "submit";
	submit.value = "new panel";


	panel_form.appendChild(panel_title_input);
	panel_form.appendChild(panel_body_input);
	panel_form.appendChild(submit);
	panel_form.addEventListener("submit" , submitNewCardPanel );
	
	form_div.appendChild(panel_form);
	return form_div; 
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