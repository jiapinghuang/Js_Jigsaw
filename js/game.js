	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	window.onload=function(){
		var grade=GetQueryString("grade");//关卡
		var flag;
		if(grade=="9"){
			createsimpDiv();
			flag="index_9";	
		}else{
			createDifDiv();
			flag="index_36";	
		}
		
	    addEventForImg(flag);							
//		var type=document.getElementById("type");
//		type.onmousedown=function(){
//			flag=flag=="index_9"?"index_36":"index_9";
//			//移除DOM结构
//			if(flag=="index_9"){
////					document.getElementById("type").children[0].innerHTML="9宫格(可点)";
//			  		document.getElementById('contain').removeChild(document.getElementById('main_36'));
//			  		createsimpDiv();
//			  	}else{
////			  		document.getElementById("type").children[0].innerHTML="36宫格(可点)";
//			  		document.getElementById('contain').removeChild(document.getElementById('main_9'));
//			  		createDifDiv();
//			  	}			
//			
//			addEventForImg(flag);		
//		}		
	}
	
	//通过传入flag，来判断是9宫格还是36宫格。
	function addEventForImg(flag){
					
				var image=document.getElementsByTagName("img");
				if(flag=="index_9"){
			  		var box=document.getElementsByClassName("box_9");	
			  	}else{
			  		var box=document.getElementsByClassName("box_36");	
			  	}
				
				image.draggable=true;
				
				var nowimage;
				var nowimagebox;
				var thenimage;
				var source="";
											
			  for(var i=0;i<image.length;i++){
			  			var img_alt=image[i].alt;
			  			
			  			if(flag=="index_9"){
			  				source="img/0"+img_alt+".png";
			  			}else{
			  				source="img/"+img_alt+".png";
			  			}
						
						image[i].setAttribute("src",source);
						
						
						image[i].onmousedown=function(){
							nowimage=this.alt;
							nowimagebox=this.parentNode;
							
						}
						box[i].ondragover=function(event){
							event.preventDefault();
						}
						box[i].ondrop=function(event){	
							thenimage=event.toElement.alt;//2							
							//新旧交换  对应的alt交换，而非image数组。
							
							//记录相应的下标
							var old_index;
							var new_index;
							//找到特定alt的image下标
							for(var j=0;j<image.length;j++){
								var j_alt=image[j].alt;
								if(j_alt==thenimage){
									new_index=j
								}
								if(j_alt==nowimage){
									old_index=j
								}
							}
							if(flag=="index_9"){
			  					image[new_index].setAttribute('src', 'img/0'+nowimage+".png");
								image[old_index].setAttribute('src', 'img/0'+thenimage+".png");
			  				}else{
			  					image[new_index].setAttribute('src', 'img/'+nowimage+".png");
								image[old_index].setAttribute('src', 'img/'+thenimage+".png");
			  				}
							
							
							
							image[new_index].setAttribute('alt', nowimage);
							image[old_index].setAttribute('alt', thenimage);
								
							if(flag=="index_9"){
			  					isChecksimp(document.getElementsByTagName("img"));
			  				}else{
			  					isCheckDif(document.getElementsByTagName("img"));
			  				}
							
						}										
			
			  }						
	}
	
	//检查复杂版
	function isCheckDif(img1){
			
		//成功
		var win= ["1","2","3","4","5","6","7","8","9","10",
		"11","12","13","14","15","16","17","18",
		"19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"];
		
		var now_arr=[];
		for(var i=0;i<img1.length;i++){
			now_arr.push(img1[i].alt);			
		}
		if(win.toString()==now_arr.toString()){
			var main_36=document.getElementById("main_36");
			main_36.innerHTML="";
			window.location.href="index.html?game=2&win=2";
		}
	
	}

	//自动生成36个div 复杂版
	function createDifDiv(){
		
		var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];	
		//将数组随机排序
		arr.sort(function(){
		return 0.5 - Math.random();
		})
		var html="";
		html+="<div id='main_36'>";
		for(var i=0;i<36;i++){
			html+="<div class='box_36'><img alt="+arr[i]+" /></div>";
		}
		html+="</div>";
		document.querySelector(".nav").insertAdjacentHTML("beforebegin",html);
		//如果用document.getElementsByClassName会报错，原因不明
	}
	
	//自动生成简单div
	function createsimpDiv(){
		
		var arr = [1,2,3,4,5,6,7,8,9];	
		//将数组随机排序
		arr.sort(function(){
		return 0.5 - Math.random();
		})
		var html="";
		html+="<div id='main_9'>";
		for(var i=0;i<9;i++){
			html+="<div class='box_9'><img alt="+arr[i]+" /></div>";
		}
		html+="</div>";
		document.querySelector(".nav").insertAdjacentHTML("beforebegin",html);
	}

	//检查简单版
	function isChecksimp(img1){
		//成功
			
		var win= ["1","2","3","4","5","6","7","8","9"];		
		var now_arr=[];
		for(var i=0;i<img1.length;i++){
			now_arr.push(img1[i].alt);			
		}
		if(win.toString()==now_arr.toString()){
			setTimeout(function(){
				var main_9=document.getElementById("main_9");
				main_9.innerHTML="";
				window.location.href="index.html?game=1&win=1";	
			},3000);
						
		}	
	}
	
