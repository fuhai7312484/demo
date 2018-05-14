const folderContent = tools.$('.folder-content')[0];
const sectionBox = tools.$('#section')


//框选
folders.onclick = function(){
	window.focus()
}
folders.onmousedown = function(ev) {

	//以id获取当前层级下的所有数据 把数据里的checked值push到新的数组里待用
	if(ev.target.className !== 'folders') return;
	let checkedArr = [];
	let foldersChild = folders.children;
	for(let i = 0; i < foldersChild.length; i++) {
		let id = foldersChild[i].dataset.id
		if(data[id]!=undefined){
			checkedArr.push(data[id].checked)
		}
		
	}
	let div = document.createElement('div')
	div.className = 'kuang';
	let disX = ev.pageX;
	let disY = ev.pageY - sectionBox.offsetTop;
	folderContent.appendChild(div);
	document.onmousemove = function(ev) {
		//		checkedAll.className = '';
		let modisY = ev.pageY - sectionBox.offsetTop
		let modisX = ev.pageX;
		//开始选框时 先把所有当前层级下的数据清除
		if(Math.abs(modisX - disX) > 10 || Math.abs(modisY - disY)) {
			for(let i = 0; i < checkedArr.length; i++) {
				let id = foldersChild[i].dataset.id;
				data[id].checked = false;
				foldersChild[i].classList.remove('hov')
				let childI = foldersChild[i].getElementsByTagName('i')[0]
				childI.className = '';
				checkedAll.className = '';
				render(data[id].pid)
			}

		}

		div.style.width = Math.abs(modisX - disX) + 'px';
		div.style.height = Math.abs(modisY - disY) + 'px';
		let l = Math.min(disX, modisX);
		let t2 = Math.min(disY, modisY);
		tools.css(div, 'left', l)
		tools.css(div, 'top', t2)
		//循环该上面得到的该层级下的数据里的checked 添加拖拽碰撞函数 
		for(let i = 0; i < checkedArr.length; i++) {
			let id = foldersChild[i].dataset.id;
			if(t.bong(div, foldersChild[i])) {
				data[id].checked = true;
				foldersChild[i].classList.add('hov')
				let childI = foldersChild[i].getElementsByTagName('i')[0]
				childI.className = 'checked' ? 'checked' : '';
				checkedAll.className = checkedArr.every(e => e.checked) ? 'checked' : '';
			}
			render(data[id].pid)
		}
	}
	document.onmouseup = function() {
		div.remove();
		document.onmousemove = document.onmouseup = null

	}

	return false;

}

