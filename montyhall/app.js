class MontyHall {
    constructor(doorsCount) {
        this.doors = new Array(doorsCount).fill(0);
        this.doors[this.pickRandomDoor(doorsCount)] = 1;
    }

    pickRandomDoor(doorsCount) {
        return Math.floor(Math.random() * doorsCount);
    }

    pickOtherDoor(doorsCount, myPick) {
        let otherDoor = this.pickRandomDoor(doorsCount);

        while (otherDoor === myPick || this.doors[otherDoor]) {
            otherDoor = this.pickRandomDoor(doorsCount);
        }

        return otherDoor;
    }

    repick(doorsCount, myPick, gamePick) {
        return this.doors.findIndex((value, index) => !(index === gamePick || index === myPick));
    }
}

const run = (doorsCount, shouldSwitch) => {
    const game = new MontyHall(doorsCount);
    let myPick = game.pickRandomDoor(doorsCount);
    const gamePick = game.pickOtherDoor(doorsCount, myPick);

    if (shouldSwitch) {
        myPick = game.repick(doorsCount, myPick, gamePick);
    }
    
    return game.doors[myPick];
};

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
