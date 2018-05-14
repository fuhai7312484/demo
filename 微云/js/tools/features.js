 const onRemove = tools.$('#remove');
 const modalTree = tools.$('.modal-tree')[0]
 const iconClose = tools.$('.icon_close')[0]
 const cancel = tools.$('.cancel')[0]
 const content = tools.$('.content')[0]
// console.log(onRemove)
 onRemove.onclick = function(){
 	let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
	let ChildArr = t.getChild(pid)
 if( ChildArr.some(e=>e.checked) ){
        content.innerHTML = treeMenu(-1,-1);
        let contentTreeChilds = content.querySelectorAll('.tree-title');
        for(let i=0;i<contentTreeChilds.length;i++){
            contentTreeChilds[i].onclick = function(){
                for(let i=0;i<contentTreeChilds.length;i++){
                    contentTreeChilds[i].style.background = '';
                }
                this.style.background = 'rgba(204, 204,204,1)';
                checkedId = this.children[0].dataset.id;
            }
        }
        let ok = modalTree.querySelector('.ok');
        ok.onclick = function(){
            let checkedData = ChildArr.filter(e=>e.checked);
            let dataLine = [];
            checkedData.forEach(e=>{
                let arr = t.getChild(e.id).concat(data[e.id])
                dataLine.push(...arr);
            });
            if(!dataLine.some(e=>e.id == checkedId)){
                checkedData.forEach(ee=>{
                    ee.pid = checkedId*1;
                    ee.checked = false;
                });
            }else{
                TipInfo('操作不正确!');
            }
            render(pid);
            treeMenu.innerHTML = treeMenu(-1,-1);
            modalTree.style.display = 'none';
  
        }
        modalTree.style.display = 'block';
    }else{
        TipInfo('请选择文件!');
    }
 	modalTree.style.display = 'block';
 }
 cancel.onclick = iconClose.onclick = function(){
 	modalTree.style.display = 'none';
 	
 }
 
content.innerHTML = treeMenu(-1,-1);
//modalTree