document.addEventListener("DOMContentLoaded", () => {
  let guessedWords = [[]];
  let availableSpace = 1;

  let word = words[Math.floor(Math.random() * words.length)];
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

  function getTileColor(letter, index) {
    const iscorrectLetter = word.includes(letter);
    buttons = document.getElementsByTagName('button')
    
    
    
    if (!iscorrectLetter) {
      for(i=0;i<28;i++){
        if(document.getElementsByTagName('button')[i].getAttribute("data-key")===letter)
      document.getElementsByTagName('button')[i].style.background="rgb(58, 58, 60)" 
      }
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      for(i=0;i<28;i++){
        if(document.getElementsByTagName('button')[i].getAttribute("data-key")===letter)
      document.getElementsByTagName('button')[i].style.background="rgb(83, 141, 78)"
      }
      return "rgb(83, 141, 78)";
    }
    for(i=0;i<28;i++){
      if(document.getElementsByTagName('button')[i].getAttribute("data-key")===letter)
    document.getElementsByTagName('button')[i].style.background="rgb(181, 159, 59)" 
    }
    return "rgb(181, 159, 59)";
  }

  //------------Delete----------------------------
  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));
    if (lastLetterEl.getAttribute("data-empty") === "true") {
      lastLetterEl.textContent = "";
      availableSpace = availableSpace - 1;
    }
  }
  //-----------------------------------------------

  //------------enter------------------------------
  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 letters");
    }

    const currentWord = currentWordArr.join("");


    if (currentWord == word) {
      window.alert("Congratulations");
    }
    if (guessedWords.length === 6) {
      window.alert(
        `You have no more guesses!,the word was ${word}.Do you want to reload???`
      );
      document.location.reload();
    }

    if (currentWord.length === 5) {
      if(words.includes(currentWord)){
      //--------------animations----------------------
      const firstLetterId = guessedWordCount * 5 + 1;
      const interval = 200;
      currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
          const tileColor = getTileColor(letter, index);
          const letterId = firstLetterId + index;
          const letterEl = document.getElementById(letterId);
          letterEl.classList.add("animate__flipInX");
          letterEl.setAttribute("data-empty", false);
          letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
        }, interval * index);
      });
      guessedWordCount += 1;
      //-----------------------------------------------
      guessedWords.push([]);
    }
    else{
      window.alert("Enter a new word")
    }
  }
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
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
