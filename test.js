window.onload = () => {
	const card_container = document.getElementsByClassName("card_container")[0];
	let cardtest = document.getElementsByClassName("card");
	let dragged_item = null;
	let hideElement = (el) => appendClass(el,"hide");
	let showElement = (el) => removeClass(el,"hide");
	let hasClass = (el,c) => el.classList.contains(c);
	let appendClass = (el,c) => el.classList.add(c);
	let removeClass = (el,c) => el.classList.remove(c);
	let sameId = (el,el2) => {return el.id == el2.id};


	for(let i  = 0 ; i < cardtest.length ; i++){
		cardtest[i].addEventListener("dragover",()=>{});
		cardtest[i].addEventListener("dragstart" , (e) => {dragged_item = e.target;startDragging(e,true),appendClass(e.target,"placeholder")});
		cardtest[i].addEventListener("dragenter" , (e) => {hideElementIfNotSameId(dragged_item,e.target)})
		cardtest[i].addEventListener("dragleave" ,(e)=>{movePlaceholderNextToElement(e)});
		cardtest[i].addEventListener("dragend" , (e) => { removeClass(e.target,"placeholder")});
		cardtest[i].addEventListener("drop" , (e) => { dropItemIntoContainer(e,card_container)});
	}
	function hideElementIfNotSameId(el1,el2){

		if(!sameId(el1,el2) ){
			hideElement(el1);
		}
	}
	function placeElementBefore(el,el2){
		el.parentNode.insertBefore(el,el2);
	}
	function placeElementAfter(el,el2){
		el2.parentNode.insertBefore(el, el2.nextSibling);
	}
	function movePlaceholderNextToElement(e){
		let victim = e.target;
		victimLeft = victim.offsetLeft;
		victimRight = victimLeft + victim.offsetWidth;
		
		if( sameId(victim,dragged_item)){
			return false;
		}

		if( Math.abs(victimLeft  - e.clientX) < (victimRight - e.clientX)){
			placeElementBefore(dragged_item,victim);
			

		}else{
			placeElementAfter(dragged_item,victim,card_container);
		}
		showElement(dragged_item);

	}
	function removeElementsWithClass(c){
		let el = document.getElementsByClassName(c);
		var elementsLength = clones.length;
		for (var i = 0; i < elementsLength; i++) {
			el[0].parentNode.removeChild(el[0])
		};
	}
	function createDragImage(e){
		var clone = e.target.cloneNode();
		appendClass(clone,"clone");
		clone.style.position = "absolute";
		clone.style.left = "-99999999999999999px";
		document.body.appendChild(clone);
		e.dataTransfer.setDragImage(clone,0,0)

	}
	function startDragging(e,cursorimage){
		var element = e.target;
		if(cursorimage){
			createDragImage(e);
		}
		e.dataTransfer.setData("text/plain", element.id);	
	}
	function dropItemIntoContainer(e,container){
		console.log(e.dataTransfer.getData("text/plain"))
		let el = document.getElementById(e.dataTransfer.getData("text/plain"));
		if(typeof el === "undefined" || !el){
			return false;
		}
		container.appendChild(el);
	}


}