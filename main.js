var song="";
var leftWristX=0;
var leftWristY=0;
var rightWirstX=0;
var rightWristY=0;
var scoreLeftWrist=0;
var scoreRightWrist=0;

function preload() {
    song=loadSound("sound.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.position(600,100);
    posenetVar=ml5.poseNet(video,playSound);
    posenetVar.on('pose',showDot);
}

function draw() {
    image(video,0,0,600,500);
    video.hide();
    fill("#6a85b0");
    stroke("#6a85b0");

    if(scoreLeftWrist>0.1){
    circle(leftWristX,leftWristY,35);
    WithDecVolume=Number(leftWristY);
    WithoutDecVolume=floor(WithDecVolume);
    Volume=WithoutDecVolume/500;
    document.getElementById("volume").innerHTML="Volume : "+Volume;
    song.setVolume(Volume);}

    if(scoreRightWrist>0.1){
        circle(rightWristX,rightWristY,35);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="speed=0.5 x";
            song.rate(0.5);
        }

        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="speed=1.0 x";
            song.rate(1);
        }

        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="speed=1.5 x";
            song.rate(1.5)
        }

        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="speed=2.0 x";
            song.rate(2.0)
        }


        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="speed=3.0 x";
            song.rate(3.0)
        }

    }


}



function music() {
    song.play();
    song.setVolume(0.5);
    song.rate(0.5);
}

function playSound() {
    console.log("model is loaded.");
}

function showDot(results) {
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;

        rightWirstX=results[0].pose.rightWirst.x;
        rightWristY=results[0].pose.rightWirst.y;

    }
}