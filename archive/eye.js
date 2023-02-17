//.eyeblackはopacity:0; position: absolute; 
//.eyewhiteの中身は.eyeblack1つだけにすること。
//.eyewhiteにposition:staticを設定するときはinitにtrueを渡す。
//（例）
//window.addEventListener('load',function(){EYE.init(true);},false);
//
window.onload = function(){
  EYE.init(true);
}

	var EYE = {
		data : {
			X : null,
			Y : null,
			count : 0,
			eyes : new Array(),
			oposi : 180*Math.PI/180,
			eLM: new Array(),
			eTM: new Array(),
			WW : new Array(),
			WH : new Array(),
			eCX : new Array(),
			eCY : new Array(),
			BW : new Array(),
			BH : new Array(),
		},
		
		init : function(swt){
			
			var whites = document.getElementsByClassName('eyewhite');
			for(i = 0;i < whites.length;i++){
				for(j = 0; j < whites[i].childNodes.length;j++){
					if(whites[i].childNodes[j].className == 'eyeblack'){
						EYE.data.eyes[i] = whites[i];
						EYE.data.eyes[i][1] = whites[i].childNodes[j];
					}
				}	
			}
			//黒目の初期化
			for(i=0;i<EYE.data.eyes.length;i++){
				EYE.data.eLM[i] = EYE.data.eyes[i].getBoundingClientRect().left;
				EYE.data.eTM[i] = EYE.data.eyes[i].getBoundingClientRect().top;
				EYE.data.WW[i] = EYE.data.eyes[i].clientWidth;
				EYE.data.WH[i] = EYE.data.eyes[i].clientHeight;
				EYE.data.BW[i] = EYE.data.eyes[i][1].clientWidth;
				EYE.data.BH[i] = EYE.data.eyes[i][1].clientHeight;
				EYE.data.eCX[i] = EYE.data.eLM[i] + EYE.data.WW[i]/2;
				EYE.data.eCY[i] = EYE.data.eTM[i] + EYE.data.WH[i]/2;
				if(!swt){
					EYE.data.eyes[i][1].style.left = EYE.data.eCX[i] - EYE.data.BW[i]/2 - EYE.data.eLM[i] + 'px';
					EYE.data.eyes[i][1].style.top = EYE.data.eCY[i] - EYE.data.BH[i]/2 - EYE.data.eTM[i] + 'px';
				}else{
					EYE.data.eyes[i][1].style.left = EYE.data.eCX[i] - EYE.data.BW[i]/2 + 'px';
					EYE.data.eyes[i][1].style.top = EYE.data.eCY[i] - EYE.data.BH[i]/2 + 'px';
				}
				EYE.data.eyes[i][1].style.opacity = 1;
						
			}
			
			window.addEventListener('mousemove',function(e){
				if(e){
					EYE.data.X = e.pageX;
					EYE.data.Y = e.pageY;
				}else{
					EYE.data.X = event.clientX + document.body.scrollLeft;
					EYE.data.Y = event.clientY + document.body.scrollTop;
				}
				for( i = 0,i < EYE.data.eyes.length; i < EYE.data.eyes.length; i++){
					if(swt == true){
						EYE.watch(EYE.data.eyes[i],EYE.data.eyes[i][1],i,swt);
					}else{
						EYE.watch(EYE.data.eyes[i],EYE.data.eyes[i][1],i);
					}
				}
			},false);
			
			window.addEventListener('touchmove',function(){
					event.preventDefault();
					e = event.touches[0];
					EYE.data.X = e.clientX;
					EYE.data.Y = e.clientY;
				
				for( i = 0,i < EYE.data.eyes.length; i < EYE.data.eyes.length; i++){
					EYE.watch(EYE.data.eyes[i],EYE.data.eyes[i][1],i);
				}
			},false);
			
			window.addEventListener('touchstart',function(){
					event.preventDefault();
					e = event.touches[0];
					EYE.data.X = e.clientX;
					EYE.data.Y = e.clientY;
				
				for( i = 0,i < EYE.data.eyes.length; i < EYE.data.eyes.length; i++){
					EYE.watch(EYE.data.eyes[i],EYE.data.eyes[i][1],i);
				}
			},false);
			
			if(swt){
				EYE.findMargin();
				window.addEventListener('resize',EYE.findMargin,false);
			}
			
		},
		
		//ウィンドウリサイズによって変わった.eyewhiteの位置情報の取得
		findMargin : function(){
				for(i = 0; i < EYE.data.eyes.length; i++){
					//eyes[i]の初期化時の値を保存
					var nowL = EYE.data.eLM[i];
					var nowT = EYE.data.eTM[i];
					
					var eB = EYE.data.eyes[i][1];
					//値を更新
					EYE.data.eLM[i] = EYE.data.eyes[i].getBoundingClientRect().left;
					EYE.data.eTM[i] = EYE.data.eyes[i].getBoundingClientRect().top;
					//eyes[i]のリサイズ前後の位置の変化量をeyeblackの値に反映する。
					eB.style.left = eB.offsetLeft + EYE.data.eLM[i] - nowL + 'px';
					eB.style.top = eB.offsetTop + EYE.data.eTM[i] - nowT + 'px';
				}
			},
			
		watch : function(eW,eB,num,swt){
			var eS = eB.style;
			var eWW = eW.clientWidth;
			var eWH = eW.clientHeight;
			var eBW = eB.clientWidth;
			var eBH = eB.clientHeight;
			
			//eyewhiteの中心位置からの距離
			//(現時点での値を計算するため、eCX,Yは使えない)
			var sX = EYE.data.X - (eW.getBoundingClientRect().left + EYE.data.WW[num]/2 + window.scrollX);
			var sY = EYE.data.Y - (eW.getBoundingClientRect().top + EYE.data.WH[num]/2 + window.scrollY);
			var DX = sX * sX ;
			var DY = sY * sY ;
			//blackがwhiteに内接するときのeyewhiteの中心からeyeblackの中心までの距離を半径rとする
			var r = eWW/2-eBW/2;;
			var Dr = r * r;
			//XとYから得る角度（ラジアン）
			var deg = Math.atan(sY/sX);
		
			//円周上の座標はXの二乗＋Yの二乗＝半径の二乗
			//X*X + Y*Y = r*r以内の場合
			if(DX + DY < Dr){
				if(!swt){
					eS.left = EYE.data.X - eBW/2 - (eW.getBoundingClientRect().left + window.scrollX) + 'px';
					eS.top = EYE.data.Y- eBH/2 - (eW.getBoundingClientRect().top + window.scrollY) + 'px';
				}else{
					eS.left = EYE.data.X - eBW/2 + 'px';
					eS.top = EYE.data.Y- eBH/2 + 'px';
				}
			}
			//X*X + Y*Y = r*r以上の場合
			//X、Yから得られる角度でeyewhite内にeyeblackを内接させる。
			if(DX + DY > Dr){
				if(sX > 0){
					if(!swt){
						eS.left = Math.cos(deg) * r + eWW/2 - eBW/2 +'px';	
						eS.top = Math.sin(deg) * r + eWH/2 - eBH/2 + 'px';
					}else{
						eS.left = Math.cos(deg) * r + eWW/2 - eBW/2 + eW.offsetLeft +'px';	
						eS.top = Math.sin(deg) * r + eWH/2 - eBH/2 + eW.offsetTop +'px';
					}
				}
				//X座標がマイナスの場合は角度に１８０度を加えて反転させる。
				if(sX < 0){
					if(!swt){
						eS.left = Math.cos(deg + EYE.data.oposi) * r + eWW/2 - eBW/2 + 'px';
						eS.top = Math.sin(deg + EYE.data.oposi) * r + eWH/2 - eBH/2 + 'px';
					}else{
						eS.left = Math.cos(deg + EYE.data.oposi) * r + eWW/2 - eBW/2 + eW.offsetLeft + 'px';
						eS.top = Math.sin(deg + EYE.data.oposi) * r + eWH/2 - eBH/2 + eW.offsetTop + 'px';	
					}
				}	
					
			}
		},
	}

