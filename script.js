var background = new Shape.Rectangle({
    rectangle: view.bounds,
    fillColor: "black"
});

var divider = new Path.Line({
    from: [view.bounds.width/2, 0],
    to: [view.bounds.width/2, view.bounds.height],
    strokeColor: 'green'
});

var textItem = new PointText(new Point(30, 30));
textItem.fillColor = 'white';

var houghText = new PointText(new Point(30, 40));
houghText.fillColor = 'white';

var drawBounds = new Rectangle(0, 0, view.bounds.width/2, view.bounds.height);
var houghBounds = new Rectangle(drawBounds.width, 0, drawBounds.width, drawBounds.height);
var rhoMax;

var cosTable;
var sinTable;

var drawPath;
function onMouseDown(event) {
    if(drawBounds.contains(event.point)) {
        drawPath = new Path();
        drawPath.strokeColor = 'white';
        drawPath.strokeWidth = 0.5;
        drawPath.add(event.point);
    }
}

drawTool = new Tool();
drawTool.onMouseDown = onMouseDown;

drawTool.onMouseDrag = function(event) {
    if(drawBounds.contains(event.point)) {
        drawPath.add(event.point);
        houghAcc(event.point.x, event.point.y, false);
    }
}

drawTool.activate();


function onMouseUp(event) {
    //drawPath.reduce();
}

drawTool.onMouseUp = onMouseUp;

onResize = function(event) {
    background.bounds = view.bounds;
    if(view.bounds.width > view.bounds.height) {
        divider.segments[0].point = new Point(view.bounds.width/2, 0);
        divider.segments[1].point = new Point(view.bounds.width/2, view.bounds.height);
        drawBounds = new Rectangle(0, 0, view.bounds.width/2, view.bounds.height);
        houghBounds = new Rectangle(drawBounds.width, 0, drawBounds.width, drawBounds.height);
    } else {
        divider.segments[0].point = new Point(0, view.bounds.height/2);
        divider.segments[1].point = new Point(view.bounds.width, view.bounds.height/2);
        drawBounds = new Rectangle(0, 0, view.bounds.width, view.bounds.height/2);
        houghBounds = new Rectangle(0, drawBounds.height, drawBounds.width, drawBounds.height);
    }

    rhoMax = Math.sqrt(drawBounds.width * drawBounds.width + drawBounds.height * drawBounds.height);

    cosTable = new Array(drawBounds.width);
    sinTable = new Array(drawBounds.width);
    for (var theta = 0, thetaIndex = 0; thetaIndex < drawBounds.width; theta += Math.PI / drawBounds.width, thetaIndex++) {
        cosTable[thetaIndex] = Math.cos(theta);
        sinTable[thetaIndex] = Math.sin(theta);
    }
}


var houghPreviewPath = new Path();
houghPreviewPath.strokeWidth = 0.5;
houghPreviewPath.strokeColor = 'red';

drawTool.onMouseMove = function(event) {
    if(drawBounds.contains(event.point)) {
        houghPreviewPath.visible = true;
        houghAcc(event.point.x, event.point.y, true);

        canvasLinePath.visible = false;
        canvasRhoPath.visible = false;
        canvasThetaPath.visible = false;
        houghRhoPath.visible = false;
        houghThetaPath.visible = false;
    } else {
        houghPreviewPath.visible = false;
    }
    if(houghBounds.contains(event.point)) {
        canvasLinePath.visible = true;
        canvasRhoPath.visible = true;
        canvasThetaPath.visible = true;
        houghRhoPath.visible = true;
        houghThetaPath.visible = true;
        drawInfoLines(event.point.x, event.point.y);
    }
}

var count = 0;
function houghAcc(x, y, preview) {
    x -= drawBounds.width / 2;
    y -= drawBounds.height / 2;
    var path;
    if(preview) {
        path = houghPreviewPath;
        path.segments = [];
    } else {
        houghPreviewPath.segments = [];
        path = new Path();
        path.strokeWidth = 0.05;
        path.strokeColor = 'white';
    }

    var segments = 15;
    var segmentLength = Math.floor(drawBounds.width / segments)

    for (var thetaIndex = 0; thetaIndex < drawBounds.width; thetaIndex += segmentLength) {
        var rho = rhoMax + x * cosTable[thetaIndex] + y * sinTable[thetaIndex];
        rho >>= 1;

        path.add(new Point(thetaIndex + drawBounds.width, rho - drawBounds.height/4));
    }
    var rho = rhoMax + x * cosTable[drawBounds.width - 1] + y * sinTable[drawBounds.width - 1];
    rho >>= 1;
    path.add(new Point(drawBounds.width - 1 + drawBounds.width, rho - drawBounds.height/4));

    var segmentCount = path.segments.length;
    path.reduce();
    var newSegmentCount = path.segments.length;
    var difference = segmentCount - newSegmentCount;
    count += difference;
    var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
    textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
    path.smooth({type:'continuous'});//({ type: 'catmull-rom', factor: 0.5 });
    //count += path.segments.length;
    houghText.content = count;
}

var canvasThetaPath =  new Path.Arc({
    from: [0, 0],
    through: [0, 0],
    to: [0, 0],
    strokeColor: 'yellow'
});
var canvasRhoPath =  new Path.Line({
    from: [0, 0],
    to: [0, 0],
    strokeColor: 'green'
});
var canvasLinePath =  new Path.Line({
    from: [0, 0],
    to: [0, 0],
    strokeColor: 'blue'
});
var houghThetaPath =  new Path.Line({
    from: [0, 0],
    to: [0, 0],
    strokeColor: 'yellow'
});
var houghRhoPath =  new Path.Line({
    from: [0, 0],
    to: [0, 0],
    strokeColor: 'green'
});
var thetaEpsilon = 0.0001;
function drawInfoLines(x, y) {
    var originalX = x - houghBounds.x;
    var arcSize = 50;
    var theta = originalX * (Math.PI / drawBounds.width) - Math.PI;
    var thetaDest = drawBounds.center + [Math.cos(theta) * arcSize, Math.sin(theta) * arcSize];
    canvasThetaPath.remove();
    canvasThetaPath = new Path.Arc({
        from: drawBounds.center - [arcSize, 0],
        through: drawBounds.center + [Math.cos(theta - thetaEpsilon) * arcSize, Math.sin(theta - thetaEpsilon) * arcSize],
        to: drawBounds.center + [Math.cos(theta) * arcSize, Math.sin(theta) * arcSize],
        strokeColor: 'yellow'
    });
    houghThetaPath.segments[0].point = new Point(houghBounds.x, y);
    houghThetaPath.segments[1].point = new Point(x, y);
    houghRhoPath.segments[0].point = new Point(x, houghBounds.height / 2);
    houghRhoPath.segments[1].point = new Point(x, y);
    
    var rhoMag = houghRhoPath.segments[1].point.getDistance(houghRhoPath.segments[0].point);
    canvasRhoPath.segments[0].point = drawBounds.center;
    canvasRhoPath.segments[1].point = drawBounds.center + [Math.cos(theta) * rhoMag, Math.sin(theta) * rhoMag];
}

function onFrame(event) {
    
}