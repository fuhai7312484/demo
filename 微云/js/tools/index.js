let t = {
	//获取子数据

	getChild: function(id) {
		let childArr = [];
		for(let attr in data) {
			if(data[attr].pid == id) {
				childArr.push(data[attr])
			}
		}
		if(childArr.length > 0) {
			return childArr;
		} else {
			return null;

		}
	},
	Allarr:[],
	getDataAll:function(id){
		let childArr = t.getChild(id)
		if(childArr){
		childArr.forEach(e=>{
			
				t.Allarr.push(e)
				t.getDataAll(e.id);
				
				})
			}

		return t.Allarr;
	},
	getParents: function(id) {
		let arr = []
		fun(data[id])
		arr.push(data[id])
		function fun(a){
			if(a.pid!=-1){
				fun(data[a.pid])
				arr.push(data[a.pid])
			}
		}
		return arr;
	},
	//碰撞
	   bong:function(box1,box2){
        let bl = box1.offsetLeft;
        let bt = box1.offsetTop;
        let br = bl + box1.offsetWidth;
        let bb = bt + box1.offsetHeight;
    
        let cl = box2.offsetLeft + box.offsetLeft;
        let ct = box2.offsetTop + box.offsetTop;
        let cr = cl + box2.offsetWidth;
        let cb = ct + box2.offsetHeight;
    
        if(br < cl || bb < ct || bl > cr || bt > cb){
            return false;
        }else{
            //碰到了
            return true;
        }
    },

}