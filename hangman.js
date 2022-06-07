const word_el=document.getElementById('word');
const popup=document.getElementById('popup-container');
const message_el=document.getElementById('success-message');

const correctLetters=[];
const wrongLetters=[];
const selectedWord=getRandomWord();
const wrongLetters_el=document.getElementById('wrong-letters');
const items=document.querySelectorAll('.item');
const message=document.getElementById('message');
const PlayAgainbtn=document.getElementById('playAgain');


function getRandomWord(){
    const words=["javascript", "java", "phyton", "css", "html", "csharp", "aspnet"];

    return words[Math.floor(Math.random()*words.length)]
}

console.log(getRandomWord());

function displayWord(){


    word_el.innerHTML= `
    ${selectedWord.split('').map(letter=>`
        <div class="letter">
            ${correctLetters.includes(letter)? letter: ''}
        </div>
    `).join('')}
    `;
    
    const w=word_el.innerText.replace(/\n/g,'');
    if(w===selectedWord){
        popup.style.display='flex';
        message_el.innerText='TEBRİKLER KAZANDINIZ!';
    }

}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0?'<h3>Wrong Letters</h3>':''}
        ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;
    
    items.forEach((item,index)=> {
        const ErrorCount=wrongLetters.length;

        if(index<ErrorCount){
            item.style.display='block';
        }else{
            item.style.display='none';
        }
    })

    if(wrongLetters.length===items.length){    //if wrongLetters = item(Hangman). Hangman is die.
        popup.style.display='flex';
        message_el.innerText='GAME OVER!';
    }

}

function displayMessage(){
    message.classList.add('show');  //it was already added by you () bu harfi zaten eklediniz)
    
    setTimeout(function(){
        message.classList.remove('show');   

    },2000)

}

window.addEventListener('keydown',function(e){
    if(e.keyCode>=65&&e.keyCode<=90) /*from A letter to Z letter between 65-90 (keycode Event)*/
    {        
    const letter=e.key;


    if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)) /*YAZILAN HARF DAHA ÖNCE YOKSA DOĞRU HARF LİSTESİNE EKLER ONU*/
        {
            correctLetters.push(letter);
            displayWord(); 
        }
        else{
            displayMessage();
        }
    }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else{
                displayMessage();
            }
        }
    }
});

displayWord()