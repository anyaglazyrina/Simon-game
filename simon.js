let red = document.querySelector('.red');
let yellow = document.querySelector('.yellow');
let green = document.querySelector('.green');
let blue = document.querySelector('.blue');

let getRandom = () => {
    let panels = [red, yellow, green, blue];
    return panels[parseInt(Math.random() * panels.length)];
};

let sequence = [ getRandom() ];
let sequenceToGuess = [...sequence]; //'...' оператор spread

let time = 600;

let flash = panel => { return new Promise((resolve) => {
    panel.className += ' active';
    setTimeout(() => {
        panel.className = panel.className.replace(
            ' active', '');
        (setTimeout(() => {
            resolve();
        }, 250))
    }, time);
});
};

let canClick = false;
let panelClick = panelClick => {
    if (!canClick) return;    
    let expectedPanel = sequenceToGuess.shift(); 
    if (expectedPanel === panelClick) {
       if (sequenceToGuess.length === 0) {
           sequence.push(getRandom());
           sequenceToGuess = [...sequence];
           startFlashing();
       } 
    } else {
           let restart = confirm('Game over!\nDo u want to replay?');
           if (!restart) return;
           document.location.reload(false);
       }
}

let startFlashing = async () => {
    canClick = false;
    for (let panel of sequence) {
    await flash(panel);
    console.log(panel);
    }
    canClick = true;
}

