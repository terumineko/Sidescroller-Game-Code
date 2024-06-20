function resetCards() {
    document.getElementById('cardRanger').classList.remove('selected-ranger')
    document.getElementById('cardPirate').classList.remove('selected-pirate')
    document.getElementById('cardValk').classList.remove('selected-valk')
    document.getElementById('playButton').classList.remove('selected-ranger')
    document.getElementById('playButton').classList.remove('selected-pirate')
    document.getElementById('playButton').classList.remove('selected-valk')
    document.getElementById('cardRanger').classList.remove('selected')
    document.getElementById('cardPirate').classList.remove('selected')
    document.getElementById('cardValk').classList.remove('selected')


}

function classSelection(element, class_to_add) {
    resetCards()
    element.classList.add(class_to_add);
    document.getElementById("playButton").classList.add(class_to_add);
    element.classList.add("selected");
}



document.addEventListener('DOMContentLoaded', function() {
    const cardRanger = document.getElementById('cardRanger');
    cardRanger.addEventListener('click', function() {
        classSelection(this, 'selected-ranger');
        document.getElementById("playButton").disabled = false;
    });

    const cardPirate = document.getElementById('cardPirate');
    cardPirate.addEventListener('click', function() {
        classSelection(this, 'selected-pirate');
        document.getElementById("playButton").disabled = true;
    });

    const cardValk = document.getElementById('cardValk');
    cardValk.addEventListener('click', function() {
        classSelection(this, 'selected-valk');
        document.getElementById("playButton").disabled = true;
    });

    document.getElementById('playButton').onclick = function() {
        window.location.href = '../Game/index.html';
    };

})

