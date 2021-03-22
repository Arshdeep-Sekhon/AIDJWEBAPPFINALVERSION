song ="";
leftWristX ="";
leftWristY ="";
rightWristX ="";
rightWristY ="";
scoreLeftWrist =0;
scoreRightWrist =0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "SPEED = 0.5X";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "SPEED = 1X";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "SPEED = 1.5X";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "SPEED = 2X";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "SPEED = 2.5X";
            song.rate(2.5);
        }
    }
     if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "VOLUME = " + volume;
        song.setVolume(volume);
    }

}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("POSENET IS INITIALISED! BOOP BEEP!");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY + " right wrist x = " + rightWristX + " right wrist y = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("THE SCORE OF THE LEFT WRIST IS = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("THE SCORE OF THE RIGHT WRIST IS = " + scoreRightWrist);
    }
}