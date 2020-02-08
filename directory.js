function CreateList() {
	this.oWrap = document.createElement("div");//创建了一个div
	this.copyright = document.createElement("div");
	this.initialize.apply(this, arguments);//appy将所有参数放在一个数组里
	this.click.call(this)//call将所有参数罗列出来
}
CreateList.prototype = {//对createlist函数进行定义,protatype就是定义所有的实例对象共享的属性和方法
	initialize: function(aData) {//这个函数的目的是初始化，把dl dt dd是数量结构层次弄好		
		var oDl, oElem, project, i;
		while(aData[0]) {//当aDate[0]为真时，循环执行，代码往后走一个aDate.shift(),shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
			oDl = document.createElement("dl");
			project = aData[0].project;	
			for(i = 0; i < project.length; i++) {//从project遍历出新建dl下的dt和dd
				if(project[i].href) {//有href属性的为dd
					oElem = document.createElement("dd");
					oElem.innerHTML = i + ") <a href=\"" + project[i].href + "\" target=\"_blank\">" + project[i].text + "</a>"
				}
				else {//反之为dt
					oElem = document.createElement("dt");
					oElem.innerHTML = project[i].text + " (" + (project.length - 1) + ")"	
				}
				oDl.appendChild(oElem);//将dt dd放在dl里面
				oDl.style.height = "41px"//将dl的高度设为31px；
			}
			this.oWrap.appendChild(oDl);
			aData.shift()//删除原来的aDate[0],以前的aDate[1]就会变成现在的aDate[0]
		}
		this.oWrap.id = "wrap";//为this.oWrap这个div加一个id wrap
		this.copyright.id = "copyright";
		this.copyright.innerHTML = "soukaの練習";
		document.body.appendChild(this.oWrap);
		document.body.appendChild(this.copyright)
	},
	click: function() {//点击事件
		var that = this;
		this.oWrap.onclick = function(event) {//点击事件的绑定
			var oEv, oTarget, oParent, i;
			oEv = event || window.event;
			oTarget = oEv.target || oEv.srcElement;
			oParent = oTarget.parentElement || oTarget.parentNode;//事件慕白哦节点的父节点
			oParent.height = function() {//获取dl的总高度
				var iHeight = 0;
				for(i = 0;i < oParent.children.length; i++) iHeight += oParent.children[i].offsetHeight;
				return iHeight//iHeight=dt像素高度+所有dd像素高度
			}();
			if(oTarget.tagName.toUpperCase() == "DT") {//如果是dt，当你的菜单时伸展时，点dd就不会执行这段代码
				var aSiblings = that.siblings(oParent), count, i;//siblings（）往下翻，代码最后一个函数
                for(count = i = 0; i < aSiblings.length; i++) {//对非点击的dl元素进行遍历，记住这里有一个循环，也就是为什么会有++count==aSibings.length的原因
                    //第一个参数是dl，第二个是点击元素dt的像素高度，第三个是运动类型，第四个是匿名函数
                    //这个startmove是检测其他dl是否展开，如果展开就要对其进行收拢的操作
                    //匿名函数！=自执行匿名函数，匿名函数作为参数，在调用（将匿名函数作为参数的）函数里被调用执行了。
					that.startMove(aSiblings[i], oTarget.offsetHeight, "buffer", function() {
						this.children[0].className = "";//这里的this代表的是aSiblings[i],也就是dl
						if(++count == aSiblings.length) {//当除点击事件的dl所有的dl的类名都为空时
							if(oParent.offsetHeight == oTarget.offsetHeight) {//当点击事件所在的菜单没有展开时
                                oTarget.className = "current";
                                //这个startmove是把点击事件所在菜单被展开
                                //看清第二个是传的参数是oparent.height

								that.startMove(oParent, oParent.height, "flex")
							}
							else {//当点击事件所在菜单展开时，这个startmove就把它收拢
								that.startMove(oParent, oTarget.offsetHeight, "buffer", function() {
									oTarget.className = ""	
								})
							}								
						}	
					})
				}
			}
		}
	},
	startMove: function(obj, iTarget, type, callback) {
		var that = this;//这里的this是指cratelist{哦Wrap：div#wrap}
		clearInterval(obj.timer);
		obj.iSpeed = 0;
		obj.timer = setInterval(function() {
			that[type].call(that, obj, iTarget, callback)
		}, 30)
	},
	buffer: function(obj, iTarget, callback) {//菜单的收拢
        obj.iSpeed = (iTarget - obj.offsetHeight) / 5;//1当前没有任何菜单展开或点击的是菜单展开事件的dt时，iTarget==obj,offsetHeight
        //2有菜单的话，（不为点击事件本来菜单），当循环到展开的那个菜单时iTarget 0？math.ceil(obj.ispeed):math.floor(obj.ispeed)
		obj.iSpeed = obj.iSpeed > 0 ? Math.ceil(obj.iSpeed) : Math.floor(obj.iSpeed);
		obj.offsetHeight == iTarget ? (clearInterval(obj.timer), callback && callback.call(obj)) : obj.style.height = obj.offsetHeight + obj.iSpeed + "px"
        //是1的情况，clear interval(obj.timer)被调用，if(callback){callback.call(obj)}
        //是2的情况，就一直到obj.offsetHeight==iTarget,也就是另一个菜单被收拢，clearinterval(obj.timer)才会被调用，并if(callback){callback.call(obj)}
    },
    
	flex: function(obj, iTarget, callback) {//打开菜单
		obj.iSpeed += (iTarget - obj.offsetHeight) / 6;
		obj.iSpeed *= 0.75;
		if(Math.abs(iTarget - obj.offsetHeight) <= 1 && Math.abs(obj.iSpeed) <= 1) {
            //abs()方法可返回数的绝对值
			clearInterval(obj.timer);
			obj.style.height = iTarget + "px";
			callback && callback.call(obj)//不要这一句程序也是正确的，不知道这句拿来做什么
		}
		else {
			obj.style.height = obj.offsetHeight + obj.iSpeed + "px"
		}
	},
	siblings: function(element) {//这个函数就是找到所有同级元素，并且返回一个数组
        var aTmp = [], oParent = element.parentElement || element.parentNode, i;
        //这个for语句的意思是遍历，id为wrap的div的子类一边，如果element！=Opanrent.children[i]，然后就把它方进atmp[]中，最后返回aTmp[]
		for(i = 0; i < oParent.children.length; i++) element != oParent.children[i] && aTmp.push(oParent.children[i]);
		return aTmp
	}
};