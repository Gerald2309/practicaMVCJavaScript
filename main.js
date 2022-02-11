(function(){
    self.Board = function(width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }
    self.Board.prototype = {
        get elements()
        {
            var elements = this.bars;
            elements.push(this.ball);
            return elements;

        }
    }

})();

(function()
{
    self.Bar = function(x,y,width,height,board) 
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;

        this.board.bars.push(this); //Agrega este elemento en el arreglo bars
        this.kind = "rectangle"; // para decirle al canvas que este elemento es un rectángulo
        this.speed = 10;
    }

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;

        },
        up: function(){
            this.y -= this.speed;

        },
        toString: function(){
            return "x: "+ this.x + "y: "+this.y ;
        }
    }

})();

(function()
{
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");

    }

    self.BoardView.prototype = {
        draw: function()
        {
            for (var i = this.board.elements.length - 1; i >= 0; i--){
                var el = this.board.elements[i];

                draw(this.ctx,el)
            };
        }
    }

    function draw(ctx, element){

        if (element !== null && element.hasOwnProperty("kind"))
        {
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height)
                    break;
            }
    

        } 
        
    }

})();

document.addEventListener("keydown", function(ev)
{
    console.log(ev.keyCode);
    if(ev.keyCode == 38)
    {
        bar1.up();
        bar2.up();

    }
    else if (ev.keyCode == 40)
    {
        bar1.down();
        bar2.down();

    }

    console.log(" bar1: "+bar1);
});

self.addEventListener("load", main);




function main(){

    var canvas = document.getElementById('canvas');
    var board = new Board(800,400);
    var board_view = new BoardView(canvas, board);
    
    window.bar1 = new Bar(20,100,40,100, board); 
    window.bar2 = new Bar(740,100,40,100, board);
 //   document.createElement("")
    board_view.draw();

}