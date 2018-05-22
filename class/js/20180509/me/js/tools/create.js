const createBtn = tools.$('#create')
const rename = tools.$('#rename')

//新建文件
createBtn.onclick = function() {
let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
let ChildArr = t.getChild(pid)
	createFile(ChildArr, pid)

}
//重命名
rename.onclick = function() {
	let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
let ChildArr = t.getChild(pid)
	console.log(pid)
	reName(ChildArr,pid)

}
//创建文件
function createFile(arr, pid) {
	let num = 0
	if(arr) {
		let fliterArr = arr.filter(e => e.title.includes('新建文件夹'))
		if(fliterArr.length) num = fliterArr.length + 1;

	} else {

		fEmpty.style.display = 'none';
	}

	let div = document.createElement('div')
	div.className = 'file-item';
	let img = document.createElement('img');
	img.src = 'img/folder-b.png';
	let span = document.createElement('span')
	let input = document.createElement('input')
	input.className = 'editor';
	input.style.display = 'block'
	input.value = '新建文件夹' + (num ? num : '')

	input.onblur = function() {
		let val = this.value;
		if(arr && arr.some(e => e.title == val)) {
			input.focus();
			input.select();
			TipInfo('名字重复请重新填写！')

		} else {
			let cId = Date.now();
			data[cId] = {
				"id": cId,
				"pid": pid,
				"title": val,
				"type": "file",
				"checked": false
			}

			input.style.display = 'none'
			//		span.className = 'folder-name';
			//		span.style.display = 'block'
			//		span.innerHTML = data[cId].title
			TipInfo('创建成功！')
			treeMenuBox.innerHTML = treeMenu(-1, -1)
			render(pid);
		}
	}

	let i = document.createElement('i');

	div.appendChild(img)
	div.appendChild(span)
	div.appendChild(input);
	div.appendChild(i);

	folders.appendChild(div)
	input.select();

}
//重命名
function reName(ChildArr, pid) {
	let cArr = ChildArr.filter(e => e.checked)
	console.log(cArr)
	if(cArr.length < 1) {
		TipInfo('请选择一个重命名的文件！')

	} else if(cArr.length > 1) {
		TipInfo('只能选择一个重命名的文件！')

	} else {

		//	console.log(cArr)
		let divs = folders.children;
		for(let i = 0; i < divs.length; i++) {
			if(divs[i].classList.contains('hov')) {
				let oInput = divs[i].getElementsByTagName('input')[0]
				let oSpan = divs[i].getElementsByTagName('span')[0]
				oSpan.style.display = 'none';
				oInput.style.display = 'block';
				oInput.value = oSpan.innerHTML;

				oInput.onblur = function() {

					let val = oInput.value;
					if(val == '') {
						TipInfo('文件名不能为空！')
						oInput.focus();

					}else{
					let o = ChildArr.some(e=>{
							 if(e.title != cArr[0].title){
                            return e.title == val;
                        }
						})
					console.log(o)
						  if(ChildArr && o){
                        openFullTip('命名冲突!');
                        this.focus();
                        this.select();
                    }else{
                        //可以改变数据
                        data[divs[i].dataset.id].title = val;
                       
                          	TipInfo('已重新命名！')
                    }
                    treeMenuBox.innerHTML = treeMenu(-1,-1)
 						render(pid);
                        
}				}

			}

		}

		//	console.log(ChildArr)
		

	}

}