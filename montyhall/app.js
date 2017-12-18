/**
 * Class representing logic for Monty Hall paradox
 */
class MontyHall {
    /**
     * Init Monty Hall game
     * @param {number} doorsCount 
     */
    constructor(doorsCount) {
        this.doors = new Array(doorsCount).fill(0);
        this.doors[this.pickRandomDoor(doorsCount)] = 1;
    }

    /**
     * Pick random door
     * @param {number} doorsCount 
     * @returns {number} random door index
     */
    pickRandomDoor(doorsCount) {
        return Math.floor(Math.random() * doorsCount);
    }

    /**
     * Open game door
     * @param {number} doorsCount 
     * @param {number} myPick 
     * @returns {number} random door index that not selected yet and not a winner
     */
    openOtherDoor(doorsCount, myPick) {
        let otherDoor = this.pickRandomDoor(doorsCount);

        while (otherDoor === myPick || this.doors[otherDoor]) {
            otherDoor = this.pickRandomDoor(doorsCount);
        }

        return otherDoor;
    }

    /**
     * Repick door
     * @param {number} doorsCount - Doors count
     * @param {number} myPick - Player pick
     * @param {number} gamePick - Game pick
     * @returns {number} random door index that was not selected before by game or player
     */
    repick(doorsCount, myPick, gamePick) {
        return this.doors.findIndex((value, index) => !(index === gamePick || index === myPick));
    }
}

/**
 * Play logic of the game
 * @param {number} doorsCount - Doors count
 * @param {boolean} shouldSwitch - Should player switch the door
 * @returns {number} 0 - lose; 1 - win
 */
const run = (doorsCount, shouldSwitch) => {
    const game = new MontyHall(doorsCount);
    let myPick = game.pickRandomDoor(doorsCount);
    const gamePick = game.openOtherDoor(doorsCount, myPick);

    if (shouldSwitch) {
        myPick = game.repick(doorsCount, myPick, gamePick);
    }
    
    return game.doors[myPick];
};

/**
 * Start Monty Hall game
 * @param {number} doorsCount 
 * @param {boolean} shouldSwitch 
 * @param {number} iterations 
 */
const startGame = (doorsCount, shouldSwitch, iterations = 1) => {
    if (doorsCount < 3) {
        alert('Doors should be 3 or more');
        return;
    }
    const results = new Array(iterations).fill().map(() => run(doorsCount, shouldSwitch));
    const wins = results.filter(result => !!result).length;

    console.log(`Percentage of wins ${(wins / iterations) * 100}% if ${shouldSwitch ? 'switched' : 'not switched'}`);
};


document.querySelector('#start').addEventListener('click', () => {
    const doors = +document.getElementById('doors').value;
    const shouldSwitch = document.getElementById('shouldSwitch').checked;
    const tries = +document.getElementById('tries').value;

    startGame(doors, shouldSwitch, tries);
});
