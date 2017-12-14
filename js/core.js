var width = document.getElementById('element').innerWidth; //получаем ширину экрана
var height = document.getElementById('element').innerHeight; // получаем высоту экрана
var app; //создаем глобальную переменную нашей игры
var colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba]; //массив цветов
var randomF = [1,2,3,4];

var gravity = 3;
var figuresAmount = -1 //количество созданных фигур
var figure = []; //массив хранящий нашу фигуру
var AreaDrawRect = 50;

var MaxFiguresClick = 0;
var MaxFigures = 10;

$('#AreaDrawRect').on('stepperupdate', function(ev, data){
    AreaDrawRect = data.value
});
$('#MaxFigures').on('stepperupdate', function(ev, data){
    MaxFigures = data.value;
    MaxFiguresClick = 0;
});

app = new PIXI.Application(800, 600);

document.getElementById('element').appendChild(app.view);
// Create background image
var background = PIXI.Sprite.fromImage("../images/bg.jpg");
background.width = app.renderer.width;
background.height = app.renderer.height;
app.stage.addChild(background);
app.stage.interactive = true;



var core = {

    drawCircle: function(x,y) {
        rand = Math.floor(Math.random() * colors.length);
        randF = Math.floor(Math.random() * randomF.length);


        var graphics = new PIXI.Graphics();

        switch (randomF[randF]) {
            case 1:
                graphics.beginFill(colors[rand], 1);
                graphics.drawRect(x, y, AreaDrawRect, AreaDrawRect);
                graphics.endFill();
                break;
            case 2:
                graphics.beginFill(colors[rand], 1);
                graphics.drawCircle(x, y, AreaDrawRect / 2);
                graphics.endFill();
                break;
            case 3:
                graphics.beginFill(colors[rand], 1);
                graphics.drawEllipse(x, y, AreaDrawRect, AreaDrawRect/2);
                graphics.endFill();

                break;
            case 4:
                graphics.beginFill(colors[rand], 1);
                graphics.drawRoundedRect(x, y, AreaDrawRect, AreaDrawRect/2, AreaDrawRect/2);
                graphics.endFill();

                break;
            default:
                console.log( 'No Figure' );
        }


        graphics.interactive = true; //делаем круг интерактивным
        graphics.buttonMode = true; //меняем курсор при наведении
        graphics.live = true;

        figuresAmount++;
        graphics.num = figuresAmount;
        figure.push(graphics);

        app.stage.addChild(graphics);
        graphics.on('pointerdown', controller.clearFigure);

    }
};
var controller = {
    clearFigure: function() {
        console.log('clear');
        this.clear();
        figure[this.num].live = false;
    },
    getPosition: function () {
        MaxFiguresClick++;
        if (MaxFiguresClick <= MaxFigures) {
            var rect = event.target.getBoundingClientRect();
            var x = event.pageX - rect.left;
            var y = event.pageY - rect.top;
            core.drawCircle(x,y);
        }

    }
};

app.stage.on('click', controller.getPosition);


app.ticker.add(function() {
    figure.forEach(function(value, key) {
        value.position.y += gravity;
    });
});


