
var tools = (function() {
		var toolsObj = {
			
			//获取元素函数
				$:function(el,context){
			/*

			 * #id
			 * .class
			 * 标签
			 * "#id li"
			 * ".class a"
			 * */
			//# . tagName
        // console.log(arguments[0])
        let strOne = arguments[0][0];
        let EleName = arguments[0].substring(1);
        //找到所有的标签
        let aEle = document.getElementsByTagName('*');
        let result = [];
        // console.log(aEle)
        switch(strOne){
            case '#':
                return document.getElementById(EleName);
                break;
            case '.':
                for(let i=0;i<aEle.length;i++){
                    // if(aEle[i].className == EleName){
                    //     result.push(aEle[i])
                    // }
                    let sClass = aEle[i].className.split(' ');
                    if(sClass){
                        for(let j=0;j<sClass.length;j++){
                            if(sClass[j] === EleName){
                                result.push(aEle[i]);
                            }
                        }
                    }
                    // console.log(sClass) 
                }
                return result;
                break;
            	default:
                return document.getElementsByTagName(arguments[0]);
                break;
        	 }
		},
			//获取和设置css样式工具函数
			css:function(el,attr,val){
				if(val == undefined){
				return getComputedStyle(el)[attr];
				}
				if(attr=='opacity'){
					el.style[attr] = val;
				}else{
				el.style[attr] = val+'px';
				}
			},
			//获取对象的子数据
			
			
		}
		return toolsObj;

	}
	());