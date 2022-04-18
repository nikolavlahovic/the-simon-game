let topLeft = document.getElementById('TL');
let topRight = document.getElementById('TR');
let bottomRight = document.getElementById('BR');
let bottomLeft = document.getElementById('BL');

let boxes = [topLeft, topRight, bottomLeft, bottomRight];
let flashSequence = [
    getRandomBox(),
    getRandomBox(),
    getRandomBox()


];

function getRandomBox() {
    return boxes[parseInt(Math.random() * boxes.length)];
}
const flash = (box) => {
    return new Promise((resolve, reject) => {
        box.className += 'active';
        setTimeout(() => {
            box.className = box.className.replace(
                'active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250)

        }, 1000);

    });
};
let clickable = false;
let main = async () => {
    for (const box of flashSequence) {
        await flash(box);

    }
    clickable = true;
};
main();
let audio = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
let sadAudio = new Audio('https://www.fesliyanstudios.com/play-mp3/5638');
let checkSequence = [...flashSequence];
function handleClick(e) {
    if (clickable) {
        let check = checkSequence.shift();
        if (e === check) {
            audio.play();
            if (checkSequence.length === 0) {
                flashSequence.push(getRandomBox());
                checkSequence = [...flashSequence];
                main();
            }
        } else {
            sadAudio.play();
            alert('game over');
        }
    }
}