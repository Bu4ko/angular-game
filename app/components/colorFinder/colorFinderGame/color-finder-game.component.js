'use strict';

function ColorFinderGameController($q, colorFinderGameService) {
    let ctrl = this;

    ctrl.$onInit = function () {
        ctrl.setupGame();
        ctrl.fieldSize = colorFinderGameService.getFieldSize();
    };

    ctrl.setupGame = function () {
        paper.install(window);
        paper.setup('colorFinder');
        ctrl.drawGameField();
        paper.view.draw();
    };

    ctrl.drawGameField = function () {
        colorFinderGameService.calculateGameColors();
        let defaultColor = colorFinderGameService.getDefaultColor();
        let changedColor = colorFinderGameService.getChangedColor();
        let elementsInRow = colorFinderGameService.getCurrentElementsInRow();
        let elementSize = colorFinderGameService.getCurrentElementSize();
        let fieldElements = [];
        let [choosenElementI, choosenElementJ] =
            ctrl.chooseChangedElement(elementsInRow);
        for (let i = 0; i < elementsInRow; i++) {
            fieldElements[i] = [];
            for (let j = 0; j < elementsInRow; j ++) {
                fieldElements[i][j] = new paper.Path.Rectangle(
                    new paper.Point(i * elementSize, j * elementSize), elementSize);
                fieldElements[i][j].strokeColor = 'black';
                if (i !== choosenElementI || j !== choosenElementJ) {
                    fieldElements[i][j].fillColor = defaultColor;
                } else {
                    fieldElements[i][j].fillColor = changedColor;
                    console.log(`size: ${elementsInRow} i: ${i} j: ${j}`);
                    fieldElements[i][j].onMouseDown = function (event) {
                        ctrl.successClick();
                    }
                }
            }
        }
    };

    ctrl.successClick = function () {
        colorFinderGameService.setCurrentElementsInRow(
            colorFinderGameService.getCurrentElementsInRow() + 1);
        ctrl.drawGameField();
    };

    ctrl.failClick = function () {

    };

    ctrl.chooseChangedElement = function (elementsInRow) {
        //up size to use last element in rand
        //size = size++;
        return [Math.floor(Math.random() * (elementsInRow - 0)),
            Math.floor(Math.random() * (elementsInRow - 0))];
    }

}

app.component('colorFinderGame', {
    controller: ['$q', 'colorFinderGameService', ColorFinderGameController],
    templateUrl: '/app/components/colorFinder/colorFinderGame/color-finder-game.html',
    require: {
        colorFinderPage: '^colorFinder'
    },
    bind: {

    }
});