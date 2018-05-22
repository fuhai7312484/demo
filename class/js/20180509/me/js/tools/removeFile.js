/*
 先查找到所有选择的div判断当前DIV中有没有checked有选择的
 然后把需要删除项先找出来放进到数组中（其中包括当前选择的数据和当前数据下的所有子数据）
 点击确认删除后直接删掉数据中该条数据的所有子数据
 * */
let delBtn = tools.$('#del')
let tanbox = tools.$('#tanbox')

delBtn.onclick = function(){
	let repid = breadNav.getElementsByTagName('span')[0].dataset.id;
	let reChildArr = t.getChild(repid)
	if(reChildArr == null){
		TipInfo('没有可删除项！')
		return;
	}
	if(reChildArr.some(e=>e.checked)){
		tanbox.style.display = 'block';
		let confBtn = tools.$('.conf-btn')[0]
		let aConf = confBtn.children;
		let closeIco = tools.$('.close-ico')[0]
		aConf[0].onclick =function(){
			reChildArr.forEach(e=>{
				if(e.checked){
					let removeArr =  t.getChild(e.id)
					if(t.getChild(e.id)){
						removeArr.forEach(e=>{
						delete data[e.id]
					})
					}
				
					delete data[e.id];
				}
			})
			
			tanbox.style.display = 'none';
			TipInfo('删除成功！')
			 
			breadMenu(repid)
			treeMenuBox.innerHTML = treeMenu(-1,-1)
			 render(repid)
			
		}
	closeIco.onclick = aConf[1].onclick = function(){
			tanbox.style.display = 'none';
		}
	}else{
		TipInfo('请选择需要删除的文件！')
	}
	

	
	
}
