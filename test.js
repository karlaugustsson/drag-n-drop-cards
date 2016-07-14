window.addEventListener("load",function() {
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
		cardtest[i].addEventListener("dragstart" , (e) => { dragged_item = e.target;startDragging(e,true),appendClass(e.target,"placeholder")});
		cardtest[i].addEventListener("dragenter" , (e) => {hideElementIfNotSameId(dragged_item,e.target)})
		cardtest[i].addEventListener("dragleave" ,(e)=>{movePlaceholderNextToElementVertical(e)});
		cardtest[i].addEventListener("dragend" , (e) => { removeClass(e.target,"placeholder")});
	
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
	function movePlaceholderNextToElementHorizontaly(e){
		let placeItemToThisDirection = eventLeftFromThisPosition(e);
		let element = e.target;
		
		if( sameId(element,dragged_item) || placeItemToThisDirection == "left" || placeItemToThisDirection == "right"){
			return false;
		}

		if(	placeItemToThisDirection == "top"){
			placeElementBefore(dragged_item,element);	
		}else{
			placeElementAfter(dragged_item,element);
		}

		showElement(dragged_item);
	}
	function movePlaceholderNextToElementVertical(e){
		
		let placeItemToThisDirection = eventLeftFromThisPosition(e);
		let element = e.target;
		
		if( sameId(element,dragged_item) || placeItemToThisDirection == "top" || placeItemToThisDirection == "bottom"){
			return false;
		}

		if(	placeItemToThisDirection == "left"){
			placeElementBefore(dragged_item,element);	
		}else{
			placeElementAfter(dragged_item,element);
		}

		showElement(dragged_item);

	}
	function eventLeftFromThisPosition(e){
		let element = e.target;
		let elementWidth = element.offsetWidth;
		let elementHeight = element.offsetHeight;
		let elementLeftPosition = element.offsetLeft;
		let elementRightPosition = elementLeftPosition + elementWidth;
		let elementTopPosition = element.offsetTop;
		let elementBottomPosition = elementTopPosition + elementHeight;
		
		let result = [];
			result.push({position:"left" , numVal:Math.abs(e.clientX - elementLeftPosition)});
			result.push({position:"right" , numVal:Math.abs(e.clientX - elementRightPosition)});
			result.push({position:"top" , numVal:Math.abs(e.clientY - elementTopPosition)});
			result.push({position:"bottom" , numVal:Math.abs(e.clientY - elementBottomPosition)});
			result = result.reduce((curr,prev) => {return (curr.numVal < prev.numVal)?curr:prev},result[0]).position;

		return result;
	}
	function removeElementsWithClass(c){
		let el = document.getElementsByClassName(c);
		let elementsLength = clones.length;
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
		//e.stopPropagation();
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
		//container.appendChild(el);
	}
});



