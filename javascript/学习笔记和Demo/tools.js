var tools = {

}
// 数组去重(原型链上编程)

	Array.prototype.unique = function() {
		var temp = {},
			arr = [],
			len = this.length;
		for(var i = 0; i < len; i ++) {
			if(!temp[this[i]]){
				temp[this[i]] = '已存在'; // = this[i]; 0会判断不通过
				arr.push([this[i]]);
			}
		}
		return arr;
	};


// 获取滚动条的滚动距离
	
	function getScrollOffset() {
		if(window.pageXOffset) {
			return {
				x : window.pageXOffset,
				y : window.pageYOffset
			}
		}else{
			return {
				x : document.body.scrollLeft + document.documentElement.scrollLeft,
				y : document.body.scrollTop + document.documentElement.scrollTop,

			}
		}
    }


/*
* 可视区窗口
*   window.innerHeight
*   window.innerWidth
*   */
function getViewportOffset() {
    if(0 && window.innerHeight){
        return {
            W : window.innerWidth,
            H : window.innerHeight
        }
    }else{
        if(document.compatMode === 'BackCompat'){ //判断是否是怪异模式
            return {
                W : document.body.clientWidth,
                H : document.body.clientHeight
            }
        }else{
            return {
                W : document.documentElement.clientWidth,
                H : document.documentElement.clientHeight
            }
        }
    }
}


//获取Style
function getStyle(elem, prop) {
    if(window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}

//事件处理函数
function addEvent(elem, type, headle) {
	if(elem.addEventListener) {
		elem.addEventListener(type, headle, false);
	}else if(elem.attachEvent){
        elem.attachEvent('on' + type, function () { //ie的事件处理中的this,默认指向window
            headle.call(elem);
        });
	}else{
		elem['on' +　type] = headle;
	}
}


//异步加载js
function loadScript(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
    if(script.readyState) {  //判断状态码
        script.onreadystatechange = function() {  //监听状态码
        	if(script.readyState == 'complete' || script.readyState == 'loaded') {
                callback();
			}
		}
        alert('loadScript函数不兼容IE');
    }else{
        script.onload = function () {
            callback();
        }
    }
    script.src = url; //放在这个位置确保监听事件生效
    document.head.appendChild(script);
}
//调用方式
// loadScript('xxx.js', function () {
// 	xxx();
// });

