setHeight();
function setHeight(){
	
	let section = tools.$('#section');
	let ahead = tools.$('#head');
	let widH = window.innerHeight - ahead.offsetHeight
//	console.log(window.innerHeight)
	tools.css(section,'height',widH)
	
	window.onresize = function(){
		let widH = window.innerHeight - ahead.offsetHeight
		tools.css(section,'height',widH)

	}
}


