padle_2=10
padle_1=10

padle_1_x=10
padle_2_y=685

padle_1_heigt=110
padle_2_heigt=70

score_1=0
score_2=0

padle_1_y=0
player_score=0

pc_score=0

ball={
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

rigt_wrist_x=0
rigt_wrist_y=0

score_rigt_wrist=0

game_satus=""

function preload(){


}

function setup(){

 canvas=createCanvas(700,600)
 canvas.parent("canvas")
 video=createVideo(VIDEO)
 video.size(700,600)
 video.hide()
 posenet=ml5.poseNet(video,modelLoaded)
 posenet.on("pose",gotPose)

}

function modelLoaded(){
console.log("modelo cargado correctamente")

}

function gotPose(error,results){
if(error){
    console.error(error)
}
console.log(results)

if(results.length>0){
rigt_wrist_y=results[0].pose.rigt_wrist.y
rigt_wrist_x=results[0].pose.rigt_wrist.x
score_rigt_wrist=results[0].pose.keypoints[10].score
}
}

function startGame(){
    game_satus="start"
    document.getElementById("status").innerHTML="el juego esta cargado"
}

function draw (){
    if(game_satus=="start"){
        image(video,0,0,700,600)
        fill("black")
        stroke("black")
        rect(680,0,20,700)

        fill("black")
        stroke("black")
        rect(0,0,20,700)
    }

    if(score_rigt_wrist>0.2){
        fill("lightgreen")
        stroke("lightgreen")
        circle(rigt_wrist_x,rigt_wrist_y,30)
    }
    paddle_in_canvas()

    fill("white")
    stroke("white")

    padle_2_Y=ball.y-padle_2_heigt/2
    rect(padle_2_Y,padle_2_y,padle_2,padle_2_heigt,100)
    midline()
    draw_score()
    models()
    moves()
}

function paddle_in_canvas(){
    if(mouseY+padle_1_heigt>height){
        mouseY=height-padle_1_heigt
    }

    if(mouseY<0){
        mouseY=0
    }
}

function midline(){
    for(i=0;i<480;i+=10){
    y=0
    stroke("white")
    fill("white")
    rect(width/2,y+i,10,480)
    }
}

function draw_score(){
    textAlign(CENTER)
    textSize(20)
    fill("white")
    stroke("yellow")
    text("player:",100,50)
    text(player_score,140,50)
    text("pc",500,50)
    text(pc_score,555,50)
}

function models(){
textSize(18)
fill("black")
noStroke()
text("ancho"+width,135,15)
text("velocidad"+ball.dx,50,15)
text("alto"+height,235,15)

}

function moves(){
    fill("white")
    stroke("black")
    strokeWeight(0.5)
    ellipse(ball.x,ball.y,ball.r,20)
    ball.x=ball.x+ball.dx
    ball.y=ball.y+ball.dy
    if(ball.x+ball.r>width-ball.r/2){
    ball.dx=-ball.dx-0.5
    }
    if(ball.x-2.5*ball.r/2<0){
    if(ball.y>=padle_1_y&& padle_1_y+padle_1_heigt){
    ball.dx=-ball.dx+0.5
    ball_touch_paddel.play()
    player_score++
    }
    else{
    pc_score++
    missed.play()
    reset()
    navegator.vebrate(100)
    }
    }
    if(pc_score==4){
    fill("green")
    stroke("blue")
    rect(0,0,width,height-1)
    
    fill("white")
    stroke("white")
    textSize(25)
    text("fin del juego",width/2,height/2)
    text("presiona el boton de renicio para jugar de nuevo",width/2,height/2)
    noLoop()
    pc_score=0
    }
    if(ball.y+ball.r>height||ball.y-ball.r<0){
    ball.dy=-ball.dy
    }
}

function reset(){
    ball.x=width/2+100
    ball.y=height/2+100
    ball.dx=3
    ball.dy=3
}

function restart(){
    loop()
    pc_score=0
    player_score=0
}




