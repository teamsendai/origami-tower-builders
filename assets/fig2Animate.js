
        
        //---------変数初期化-----------
            
        var displayMode = 3;
        // 0:表開閉, 1:裏開閉, 2:open回転, 3:close回転?
        
        var blockOpened = false;
        // false:close, true: open
        
        //トランジション中はドラッグを無効化
        var inTransition = false;
        

        
        
        //ドラッグ状態の判定
        var dragmode = false;
        
        //現在のフレーム番号
        var currentFrame = 0;
        
        
        //現在のトランジションフレーム番号
        var currentTransitionFrame = 0;
                        
        //カーソル座標
        var pX=0;
        var pY=0;



        //プレロード
        img_array = [];
        for (var i = 1; i <= 240; i++){
            img_array.push('./assets/seq' + i + '.gif');
        }
        pl_file = new Array();
        for (i=0; i<img_array.length; i++){
            pl_file[i] = new Image();
            pl_file[i].src=img_array[i];
        }
        
        
        
        //画像を配列に格納
        var arrayOfRotationClose = [];
        for (var i = 181; i <= 240; i++) {
            var j = ("000" + i).substr(-4);
            arrayOfRotationClose.unshift('./assets/seq/' + j + '.gif');
        }
        
        var arrayOfRotationOpen = [];
        for (var i = 121; i <= 180; i++) {
            var j = ("000" + i).substr(-4);
            arrayOfRotationOpen.unshift('./assets/seq/' + j + '.gif');
        }
        
        
        //閉じる->開く
        var arrayOfTransitionFront = [];
        for (var i = 1; i <= 60; i++) {
            var j = ("000" + i).substr(-4);
            arrayOfTransitionFront.push('./assets/seq/' + j + '.gif');
        }
        
        //閉じる->開く
        var arrayOfTransitionBack = [];
        for (var i = 61; i <= 120; i++) {
            var j = ("000" + i).substr(-4);
            arrayOfTransitionBack.push('./assets/seq/' + j + '.gif');
        }
        
        
        
        
        //--------トリガーアクション-----------
        
        
        function clickOpenButton(){
        showTransition();
        }
        
        
        function dragTrigger(){
            //console.log('drag!')
            dragmode = true;    
        }
        
        function toggleDisplayMode(){
            if (displayMode == 3){
                displayMode = 2;
            } else if (displayMode == 2){
                displayMode = 3;
            }
            drawFrame();
        }
        
        
        
        
        //---------呼び出し関数-----------
        
        
        //フレーム描画の更新
        function drawFrame(){
            var frame = document.getElementById("frame");
            
            //displayModeで表示モードの判定
            switch (displayMode){
                
                case 0:
                    frame.src = arrayOfTransitionFront[currentTransitionFrame];
                    break;
                
                case 1:
                    frame.src = arrayOfTransitionBack[currentTransitionFrame];
                    break;
                    
                case 2:
                    frame.src = arrayOfRotationOpen[currentFrame];
                    break;
                    
                case 3:
                    frame.src = arrayOfRotationClose[currentFrame];
                    break;
                    
                default:
                    break;  
            }
            refleshStatus();
        }
        
        
        
        //displayMode 0:表開閉, 1:裏開閉, 2:open回転, 3:close回転?
        
        //名前がよくない
        function showTransition2(){
            
            //closeのとき
            if (displayMode == 3) {
                
                
                if (currentFrame == 30){
                //裏 閉->開
                    displayMode=1;
                    currentTransitionFrame = 0;
                    
                    var timerId5 = setInterval(function(){                

                    if (currentTransitionFrame == 59){
                        clearInterval(timerId5);
                        displayMode = 2;

                        inTransition = false;

                        var buttonControl=document.getElementById("fig2Button");
                        buttonControl.innerText = 'close';
                        
                    }else{
                        currentTransitionFrame ++;
                        drawFrame();
                    }
                }, 33);
                
                
                }else if (currentFrame == 0){
                //表 閉->開
                    
                    displayMode=0;
                    currentTransitionFrame = 0;
                    
                    var timerId6 = setInterval(function(){                

                    if (currentTransitionFrame == 59){
                        clearInterval(timerId6);
                        displayMode = 2;
                        inTransition = false;
                        var buttonControl=document.getElementById("fig2Button");
                        buttonControl.innerText = 'close';
                        
                    }else{
                        currentTransitionFrame ++;
                        drawFrame();
                    }
                }, 33);


                }
            
            }
            
            //openのとき
            else if (displayMode == 2) {
                
                if (currentFrame == 30){
                //裏 開->閉
                    
                    displayMode=1;
                    currentTransitionFrame = 59;
                    
                    var timerId7 = setInterval(function(){                

                    if (currentTransitionFrame == 0){
                        clearInterval(timerId7);
                        displayMode = 3;
                        inTransition = false;
                        var buttonControl=document.getElementById("fig2Button");
                        buttonControl.innerText = 'open';
                        
                    }else{
                        currentTransitionFrame --;
                        drawFrame();
                    }
                }, 33);
                
                
                
                }else if (currentFrame == 0){
                //表 開->閉
                    
                displayMode=0;
                    currentTransitionFrame = 59;
                    
                    var timerId8 = setInterval(function(){                

                    if (currentTransitionFrame == 0){
                        clearInterval(timerId8);
                        displayMode = 3;
                        inTransition = false;
                        var buttonControl=document.getElementById("fig2Button");
                        buttonControl.innerText = 'open';
                        
                    }else{
                        currentTransitionFrame --;
                        drawFrame();
                    }
                }, 33);


                }
            
            }
     
            
        }
        
        
        //状態遷移アニメーション
        //ここはよくない
        function showTransition(){
            inTransition = true;
            if ((currentFrame >= 0) && (currentFrame <=15)){
                var timerId1 = setInterval(function(){                
 
                    if (currentFrame == 0){
                        clearInterval(timerId1);
                        showTransition2();
                        
                    }else{
                        incCurrentFrame(-1);
                        drawFrame();
                    }
                }, 33);
                //このあとが実行されちゃう なんで?

                
            } else if ((currentFrame >= 16) && (currentFrame <= 30)){
                var timerId2 = setInterval(function(){                
 
                    if (currentFrame == 30){
                        clearInterval(timerId2);
                        showTransition2();
                    }else{
                        incCurrentFrame(1);
                        drawFrame();
                    }
                }, 33);

            } else if ((currentFrame >= 31) && (currentFrame <= 45)){ 
                var timerId3 = setInterval(function(){                

                    if (currentFrame == 30){
                        clearInterval(timerId3);
                        showTransition2();
                    }else {
                        incCurrentFrame(-1);
                        drawFrame();
                    }
                }, 33);
            } else if ((currentFrame >= 46) && (currentFrame <= 59)){
                var timerId4 = setInterval(function(){                

                    if (currentFrame == 0){
                        clearInterval(timerId4);
                        showTransition2();
                    }else{
                        incCurrentFrame(1);
                        drawFrame();
                    }
                }, 33);

            }
    
            
        }
        
        
        //ループを考慮したcurrentFrameの増減
        function incCurrentFrame(i){
    
            var n = currentFrame + i;
            //画像のループ処理
            while (n > 59){
                n -= 60;
            }
            while (n< 0 ){
                n += 60;
            }
            currentFrame = n;
        }
        
        
        
        //情報表示の更新
        function refleshStatus(){
            var cf = document.getElementById("currentf");
            cf.innerText= currentFrame;
            var srcpath = document.getElementById("source");
            srcpath.innerText = arrayOfRotationClose[currentFrame];
            var dragframe = document.getElementById("drag");
            dragframe.innerText = dragmode;
            
            var showDisplayMode = document.getElementById("showDisplayMode");
            showDisplayMode.innerText = displayMode;
            var showBlockOpened = document.getElementById("showBlockOpened");
            showBlockOpened.innerText = blockOpened;
        }
        
        
        
        //--------------------------------------

        (function(){
            
            //マウス座標の取得
            //source: http://www.xmisao.com/2014/02/09/how-to-track-mouse-position-in-javascript.html
            window.onmousemove = handleMouseMove;
            function handleMouseMove(event){
                event = event || window.event; //IE対応
            
                var pos = document.getElementById("pos");
                var dif = document.getElementById("dX");
                pos.innerText = pX
                var dX = event.clientX - pX;
                dif.innerText = dX;
                pX = event.clientX;
                pY = event.clientY;

                
                //ドラッグ時の処理
                if ((dragmode == true)&&(inTransition == false)){
                    
                    incCurrentFrame(dX);

                    drawFrame();
                }else{
                refleshStatus();
                }
                
            
            }
            
            window.onmouseup = handleMouseUp;
            window.onmouseout = handleMouseUp;
            function handleMouseUp(){
                if (dragmode == true){
                dragmode = false;
                    
                }
                
            }

        })();
        
        

