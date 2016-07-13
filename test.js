window.onload = () => {
	const card_container = document.getElementsByClassName("card_container")[0];
	let cardtest = document.getElementsByClassName("card");
	let dragged = null;
	let hideElement = el => el.style.display = "none";
	let hasClass = (el,c) => el.classList.contains(c);
	let appendClass = (el,c) => el.classList.add(c);


	for(let i  = 0 ; i < cardtest.length ; i++){
		cardtest[i].addEventListener("dragover",()=>{});
		cardtest[i].addEventListener("dragstart" , (e) => {startDragging(e,true),appendClass(e.target,"placeholder")});
		cardtest[i].addEventListener("dragleave" ,()=>{});
		cardtest[i].addEventListener("dragend" , (e) => { });
		cardtest[i].addEventListener("drop" , (e) => { dropItemIntoContainer(e,card_container)});
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