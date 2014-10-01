cc.DrawNode.prototype.drawRoundRect = function(origin, destination, radius, color, lineWidth, lineColor) {
    var coef     = 0.5 * Math.PI / segments,
        vertices = [],
        segments =  radius* 2;
    for(var i = 0; i <= segments; ++i) {
        var rads = (segments - i)*coef;
        vertices.push(cc.p(radius*Math.sin(rads), radius*Math.cos(rads)));
    }

    var tagCenter = cc.p(0, 0),
        minX    = Math.min(origin.x, destination.x),
        maxX    = Math.max(origin.x, destination.x),
        minY    = Math.min(origin.y, destination.y),
        maxY    = Math.max(origin.y, destination.y),
        polygons= [];

    //left-top
    tagCenter.x     = minX + radius;
    tagCenter.y     = maxY - radius;
    for(var i = 0; i <= segments; ++i){
        polygons.push(cc.p(tagCenter.x - vertices[i].x, tagCenter.y + vertices[i].y));
    }

    //right-top
    tagCenter.x        = maxX - radius;
    tagCenter.y        = maxY - radius;
    for(var j=segments; j!=0; --j){
        polygons.push(cc.p(tagCenter.x + vertices[j].x, tagCenter.y + vertices[j].y));
    }

    //right-bottom
    tagCenter.x        = maxX - radius;
    tagCenter.y        = minY + radius;
    thisVertices    = vertices;
    for(var i = 0; i <= segments; ++i){
        polygons.push(cc.p(tagCenter.x + vertices[i].x, tagCenter.y - vertices[i].y));
    }

    //left-bottom
    tagCenter.x        = minX + radius;
    tagCenter.y        = minY + radius;
    thisVertices    = vertices + segments;
    for(var j=segments; j!=0 ; --j){
        polygons.push(cc.p(tagCenter.x - vertices[j].x, tagCenter.y - vertices[j].y));
    }

    if(!lineWidth) {
        var lineColor = cc.color(color.r, color.g, color.b, 0);
        this.drawPoly(polygons, color, 1, lineColor);
    }else
        this.drawPoly(polygons, color, lineWidth, lineColor);
}