window.addEventListener("load",function() {
	const card_container = document.getElementsByClassName("card_container")[0];
	const cards = document.getElementsByClassName("card");
	const Panels = document.getElementsByClassName("panel")
	let appendClass = (el,c) => el.classList.add(c);
	let sameId = (el,el2) => {return el.id == el2.id};
	let dragged_item = null;
	let hideElement = (el) => appendClass(el,"hide");
	let showElement = (el) => removeClass(el,"hide");
	let hasClass = (el,c) => el.classList.contains(c);
	let removeClass = (el,c) => el.classList.remove(c);
	let paneltest = document.getElementsByClassName("panel");
	let preserveOrignalWidth = (e) => { e.currentTarget.style.width = e.currentTarget.offsetWidth + "px"; }
	let clearStyle = (e) => e.currentTarget.style = "";
	let getItemPlacement = (element) => element.dataset.canbeplaced;

	for( let i = 0 ; i < cards.length ; i++ ){
		cards[i].addEventListener("dragstart",drag);
		cards[i].addEventListener("dragleave",appendSibling);
		cards[i].addEventListener("dragend",stopDrag);
		cards[i].addEventListener("dragenter" , placeItemInside);
	  
	}
	for(let i  = 0 ; i < paneltest.length ; i++){
		paneltest[i].addEventListener("dragover",()=>{});
		paneltest[i].addEventListener("dragstart" , (e) => { e.stopPropagation();drag(e);});
		paneltest[i].addEventListener("dragenter" , (e) => {e.stopPropagation();})
		paneltest[i].addEventListener("dragleave" ,(e)=>{appendSiblingHorizontally(e)});
		paneltest[i].addEventListener("dragend" , (e) => { removeClass(e.currentTarget,"placeholder"),showElement(e.currentTarget);removeElementsWithClass("clone");clearStyle(e)});
	
	}

function drag(e){
	dragged_item = e.currentTarget;
	createDragImage(e);
	appendClass(e.currentTarget,"placeholder")
}
function appendSibling(e){
		let placeItemToThisDirection = mouseCameFromThisPosition(e);
		let element = e.currentTarget;
		
		if( sameId(element,dragged_item) || placeItemToThisDirection == "top" || placeItemToThisDirection == "bottom" || dragged_item.dataset.canbeplaced == "inside"  ){

			return false;
		}

		if(	placeItemToThisDirection == "left"){
			placeElementBefore(dragged_item,element);	
		}else{
			placeElementAfter(dragged_item,element);
		}
}
function appendSiblingHorizontally(e){
		let placeItemToThisDirection = mouseCameFromThisPosition(e);
		let element = e.currentTarget;
		
		if( sameId(element,dragged_item) || placeItemToThisDirection == "left" || placeItemToThisDirection == "right" || dragged_item.dataset.canbeplaced == "outside"  ){

			return false;
		}

		if(	placeItemToThisDirection == "top"){
			placeElementBefore(dragged_item,element);	
		}else{
			placeElementAfter(dragged_item,element);
		}
}
function stopDrag(e){
	removeElementsWithClassName("clone_drag");
	removeClass(e.currentTarget,"placeholder");

}
	function createDragImage(e){

		var clone = e.currentTarget.cloneNode(true);

		appendClass(clone,"clone_drag");
		clone.style.position = "absolute";
		clone.style.left = "-999999px";

		clone.style.width = e.currentTarget.offsetWidth + "px";
		document.body.appendChild(clone);
		e.dataTransfer.setDragImage(clone,0,0)

	}
  	function mouseCameFromThisPosition(e){
		
		let element = e.currentTarget;
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
  	function removeElementsWithClassName(c){
		let el = document.getElementsByClassName(c);
		let elementsLength = el.length;

		for (var i = 0; i < elementsLength; i++) {
			el[0].parentNode.removeChild(el[0])
		};
	}
	function placeElementBefore(el,el2){

		el.parentNode.insertBefore(el,el2);
	}
	function placeElementAfter(el,el2){
		el2.parentNode.insertBefore(el, el2.nextSibling);
	}
	function placeItemInside(e){
		element = e.currentTarget;
		if(dragged_item.dataset.canbeplaced == ("inside" || "both") ){
			element.appendChild(dragged_item);
		}
		
	}
});



