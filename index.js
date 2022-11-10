document.addEventListener("DOMContentLoaded", () => {
  let guessedWords = [[]];
  let availableSpace = 1;

  let word = "dariy";
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");
  function getCurrentWordArr() {
    const noOfGuessedWords = guessedWords.length;
    return guessedWords[noOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const CurrentWordArr = getCurrentWordArr();
    if (CurrentWordArr && CurrentWordArr.length < 5) {
      CurrentWordArr.push(letter);
      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

    function handleSubmitWord(){
        const CurrentWordArr=getCurrentWordArr()
        if(CurrentWordArr.length !==5 ){
            window.alert("word must be 5 letters")
        }
        const CurrentWord = CurrentWordArr.join('')
        if(CurrentWord == word){
            window.alert("Congratulations")
        }
        if(guessedWords.length===6){
            window.alert('You have no more guesses!')
        }
        guessedWords.push([])
    }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
      console.log(letter);
      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter);
    };
  }
});
