/*
    1.微云下有 id:0
        我的音乐  pid:0
        我的文档  pid:0
    渲染

    传入一个ID给你，你给我这个ID下的所有子级
    
*/

const folders = tools.$('.folders')[0];
const fEmpty = tools.$('.f-empty')[0];
const checkedAll = tools.$('.checkedAll')[0]
const treeMenuBox = tools.$('.tree-menu')[0];
const onTree = tools.$('.tree-menu')[0];
const fullTipBox = tools.$('.full-tip-box')[0];
const treeMenuBoxChilds = treeMenuBox.getElementsByTagName('span')


render(0)

function render(id) {
	folders.innerHTML = '';
	let arr = t.getChild(id)
	if(!arr) {
		fEmpty.style.display = 'block';
		checkedAll.className = '';
		return;

	} else {
		fEmpty.style.display = 'none';
		console.log(arr)
		checkedAll.className = arr.every(e => e.checked) ? 'checkedAll checked':'checkedAll'

		//创建元素
		arr.forEach(e => {
			let div = document.createElement('div');
			div.className = 'file-item';
			if(e.checked) {
				div.classList.add('hov')
			} else {
				div.classList.remove('hov')

			}
			div.dataset.id = e.id

			let img = document.createElement('img')
		
			img.src = imgSrc(e.type);
			
			//给图片添加双击事件
			img.ondblclick = function() {
				arr.forEach(e=>e.checked=false)
				let childArr = t.getChild(e.id)
				if(childArr){
					
					childArr.forEach(e=>e.checked = false)
				}
				addClass(e.id)
				//渲染面包屑导航
				breadMenu(e.id)
				//重新渲染数据
				render(e.id)
			}
			let span = document.createElement('span');
			span.className = 'folder-name';
			span.innerHTML = e.title;

			let input = document.createElement('input')
			input.className = 'editor';

			let i = document.createElement('i')
			i.className = e.checked ? 'checked' : '';

			i.onclick = function() {
				e.checked = !e.checked;
				render(id);

			}

			div.appendChild(img)
			div.appendChild(span)
			div.appendChild(input)
			div.appendChild(i)
			folders.appendChild(div);

		})	
		
		function imgSrc(type){
			switch(type){
				case 'music': return 'img/folder-m.png' ;
				break;
				case 'file': return 'img/folder-b.png' ;
				break;
				case 'Code': return 'img/folder-js.png' ;
				break;
				case 'Word': return 'img/folder-W.png' ;
				break;
				case 'Video': return 'img/folder-V.png' ;
				break;
				case 'Photo': return 'img/folder-P.png' ;
				break;
				
				
			}
			
		}
		
		
		checkedAll.onclick = function(){
						  /*
			                当没有数据的时候就不能全选
			                只有有数据的时候才有全选操作。
			            */
			           if(fEmpty.style.display == 'none' ){
			           	   if(checkedAll.classList.contains('checked')){
			           	checkedAll.classList.remove('checked')
			           	 arr.forEach(e=>{
			           	 	e.checked = false
			           	 })
			           }else{
			           	checkedAll.classList.add('checked')
			           		 arr.forEach(e=>{
			           	 	e.checked = true
			           	 })
			           }
			           	    render(id);
			           }
			        
			       

		}
		
		

	}
}
const breadNav = tools.$('.bread-nav')[0];
//面包屑渲染
breadMenu(0);

function breadMenu(id) {
	let navHtml = ''
	let arr = t.getParents(id);
	arr.forEach((e, i, all) => {
		if(i == all.length - 1) {
			navHtml += `<span data-id="${e.id}">${e.title}</span>`;
		} else {
			navHtml += `<a data-id="${e.id}" href="javascript:;">${e.title}</a>`;
		}

	})
	breadNav.innerHTML = navHtml;
	breadNav.onclick = function(ev) {
		if(ev.target.tagName == 'A') {
			render(ev.target.dataset.id);
			breadMenu(ev.target.dataset.id);
			treeMenuBox.innerHTML = treeMenu(-1,-1)
			addClass(ev.target.dataset.id)

		}

	}

}
//生成树形导航结构
function treeMenu(treePid,num){
	let treeChild = t.getChild(treePid)
	if(!treeChild)return ''; //如果没有子数据直接返回空字符串
	 num ++;
	let treeHtml=`<ul style="padding-left:${num*10}px">`;
	 treeChild.forEach(e=>{
	 	treeHtml+=` <li>
                        <div class="tree-title">
                    <span data-id="${e.id}" class="${t.getChild(e.id)?('open'):('')}"><i></i>${e.title}</span>
                </div>   
                    ${treeMenu(e.id,num)}
                    </li>`
	
	});
	  treeHtml+=`</ul>`
	  
	return treeHtml;
}

treeMenuBox.innerHTML = treeMenu(-1,-1)
onTree.onclick = function(ev){
	if(ev.target.tagName === 'SPAN'){
		for(let i=0;i<treeMenuBoxChilds.length;i++){
			treeMenuBoxChilds[i].style.background = ''
		}
		ev.target.style.background = '#eee'
		render(ev.target.dataset.id)
		breadMenu(ev.target.dataset.id)
		
		
	}
}
addClass(0)
function addClass(id){
//	console.log(id)
	let treeSpan = document.querySelectorAll('.tree-menu span')
	let treeSpanId = document.querySelectorAll('.tree-menu span[data-id="'+id+'"]')[0]
	

	for(let i=0;i<treeSpan.length;i++){
		treeSpan[i].style.background = '';
	}
	treeSpanId.style.background = 'rgb(238, 238, 238)';

}

//function TipInfo(txt){

function TipInfo(txt){
    let TipText = tools.$('.tip-text')[0]
    fullTipBox.style.opacity = 1;
    fullTipBox.style.top = 0+'px'
    TipText.innerHTML = txt;
    setTimeout(function(){
    	
    	fullTipBox.style.top = -40+'px';
    	fullTipBox.style.opacity = 0;
    	
    },2000)
   
}