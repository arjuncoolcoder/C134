img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('pexels-simon-robbin-614810.jpg');
}




function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Humans";
}


function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}



function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}



function draw()
{
    image(video, 0, 0, 380, 380);
        if(status != "")
        {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);
            for (i = 0; i < objects.length; i++ )
            {
                document.getElementById("status").innerHTML = "Status : Human Detected";
                document.getElementById("number_of_objects").innerHTML = "Number of Humans detected are : "+ objects.length;
                
                
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }

}