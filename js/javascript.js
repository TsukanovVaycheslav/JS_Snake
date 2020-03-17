//Создадим поле
    var field = document.createElement('div');
    document.body.appendChild(field);
    field.classList.add('field');

//Разобъем поле на ячейки
    for (var i = 1; i < 101; i++) {
        var excel = document.createElement('div');
        field.appendChild(excel);
        excel.classList.add('excel');
    }

//Присвоим координаты каждой ячейки
    var excel = document.getElementsByClassName('excel');
    var x = 1;
        y = 10;

    for (var i = 0; i < excel.length; i++) {
        if (x > 10) {
            x = 1;
            y--;
        }
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        x++;
    }

//Создадим змею
    function generateSnake() {
        var posX = Math.round(Math.random() * (10 - 3) + 3);
        var posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }

    var coordinates = generateSnake();
    var snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

    for (var i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
    snakeBody[0].classList.add('head');


    //Создадим мышь
            var mouse;
            function createMouse() {
                function generateMouse() {
                    var posX = Math.round(Math.random() * (10 - 3) + 3);
                    var posY = Math.round(Math.random() * (10 - 1) + 1);
                    return [posX, posY];
                }

                var mouseCoordinates = generateMouse();
                mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

                while (mouse.classList.contains('snakeBody')) {
                    var mouseCoordinates = generateMouse();
                    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
                }

                mouse.classList.add('mouse');
            }

    createMouse();

var direction = 'right';
var steps = false;

//Отобразим количество очков
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.style.cssText = `
    margin: auto;
    margin-top: 40px;
    font-size: 30px;
    display: block
    `;

    var score = 0;
    input.value = `Ваши очки: ${score}`;


//Научим змею двигаться во всех направлениях
    function move() {

        var snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        snakeBody[0].classList.remove('head');
        snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        snakeBody.pop();

        if (direction == 'right') {
            if (snakeCoordinates[0] < 10) {
                snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
            } else {
                snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
            }
        } else if (direction == 'left') {
            if (snakeCoordinates[0] > 1) {
                snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
            } else {
                snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
            }
        } else if (direction == 'up') {
            if (snakeCoordinates[1] < 10) {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+ snakeCoordinates[1]+1) + '"]'));
            } else {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
            }
        } else if (direction == 'down') {
            if (snakeCoordinates[1] > 1) {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "'+ (+ snakeCoordinates[1]-1) +'"]'));
            } else {
                snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
            }
        }
        //Научим змею есть мышей
        if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
            mouse.classList.remove('mouse');
            var a = snakeBody[snakeBody.length - 1].getAttribute('posX');
            var b = snakeBody[snakeBody.length - 1].getAttribute('posY');
            snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
            createMouse();
            score++;
            input.value = `Ваши очки: ${score}`;
        }

        //Пропишем правила окончания игры
        if (snakeBody[0].classList.contains('snakeBody')) {

            setTimeout(() => {
                alert(`Игра окончена. Ваши очки: ${score}`);
            }, 200);

            clearInterval(interval);
            snakeBody[0].style.background = 'url(scream.jpg) center no-repeat';
            snakeBody[0].style.backgroundSize = "cover";
        }

        snakeBody[0].classList.add('head');
        for (var i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
        }

        steps = true;
    }

    var interval = setInterval(move,300);

    //Научим змею двигаться во всех направлениях
    window.addEventListener('keydown', function (e) {
        if (steps == true) {
            if (e.keyCode == 37 && direction != 'right') {
                direction = 'left';
                steps = false;
            } else if (e.keyCode == 38 && direction != 'down') {
                direction = 'up';
                steps = false;
            } else if (e.keyCode == 39 && direction != 'left') {
                direction = 'right';
                steps = false;
            } else if (e.keyCode == 40 && direction != 'up') {
                direction = 'down';
                steps = false;
            }
        }
    });
