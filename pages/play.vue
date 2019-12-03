<template>
  <section class="container">
    <h1 class="title has-text-centered">
      {{ titleText }}
    </h1>    
    <section class="game-area">
      <img v-show="startGameCheck" class="text-center" alt="wordguessingPicture" src="../static/wordguess.jpeg" /> 
      <game-word-display></game-word-display>
      <section v-show="currentGame">
        <h2  v-show="hider==false">
          Guess made: {{wordGuessCount}} time(s) <br />
          Character hinted: {{charGuessCount}} time(s) <br />
         {{ definition }}
          
        </h2>        
        <div v-show="hider" class="letter-buttons">
          <button v-show="hasShown2==false" class="button is-info" @click="showDefinition">Hint synonym</button>
          <button v-show="hasShown==false"  class="button is-info" @click="showVowel">Hint vowel</button>
          <p v-show="hasShown2" id="definition">{{ definition }} </p>              
          <h1>Click the buttons below for character hint!</h1>
          <button             
            v-for="letter of letters"
            v-show="characterDisabled(letter) == false"
            :key="letter"
            class="button is-info is-large is-letter-button"
            :disabled="characterDisabled(letter)"            
            @click="makeGuess({ guess: letter })"
          >
            {{ letter }}
          </button>
        </div>

        <div v-show="hider" class="field has-addons">
          <div class="control is-expanded">
            <input
              v-model="guessText"
              class="input is-large has-text-centered"
              type="text"
              placeholder="Guess word"
              @keyup.enter="submitWordGuess"
            />
          </div>
          <div class="control">
            <button class="button is-info is-large" @click="submitWordGuess">
              Guess
            </button>
          </div>
        </div>        
        <p  v-show="hider" class="text-error text-danger">{{ errorGuess }}</p>

      </section>
      <button
        class="button is-primary is-large is-fullwidth"
        @click="btnStartGame()"
      >
        {{ startGameText }}
      </button>
      <br />
      <nuxt-link to="/faq" class="button is-primary is-large is-fullwidth">
        Read Instruction
      </nuxt-link>
    </section>
  </section>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
import GameService from "@/services/GameService";
import GameWordDisplay from "@/components/GameWordDisplay";
import axios from "axios";

export default {
  components: { GameWordDisplay },
  data: () => ({    
    definition:"",
    guessText: "",
    startGameCheck: true,
    hasShown:false,
    hasShown2:false,
    wordGuessCount: 0,
    charGuessCount: 0,
    hider:true,
    errorGuess:""
  }),
  computed: {
    ...mapGetters("game", ["currentGame"]),    
    letters() {
      return GameService.alphabetLetters;
    },
    gameEnded() {
      return this.currentGame ? this.currentGame.won : false;
    },
    titleText() {
      if(this.gameEnded){
        this.charGuessCount = this.currentGame.characterGuesses.length;
        this.wordGuessCount = this.currentGame.wordGuesses.length;
        this.hider = false; //Hide componenet after win to display result
        this.hasShown = true;
        this.showDefinition();
        
        var arrWordGuessed = this.currentGame.wordGuesses;
        for (var i = 0; i < arrWordGuessed.length; i++) {
            arrWordGuessed[i] = (arrWordGuessed[i].toLowerCase());
        }

        if(arrWordGuessed.indexOf(this.$store.state.game.currentGame.word.toLowerCase())== -1){
            this.speak("The word is " 
              + this.currentGame.word 
              + ". You can play again by clicking the restart button below" 
              );
          return "Better luck next time!"
        }else{
            this.speak("Congrats! The word is " 
              + this.currentGame.word 
              + ". You can play again by clicking the restart button below" 
              );
          return "You Won!!";
        }
      }else{
        if(this.currentGame){
          return "Guess the word";
        }else{
          return "Word Guessing Game";
        }        
      }      
    },
    startGameText() {
      if (this.currentGame) {
        this.startGameCheck = false;
        return "Click to restart game!";
      }
      return "Start Game";
    }
  },
  methods: {
    ...mapActions("game", ["startGame", "makeGuess"]),
    btnStartGame(){
      this.hider = true;
      this.hasShown = false;
      this.hasShown2 = false;
      this.errorGuess = "";
      this.startGame();
    },
    showDefinition(){
      // Make a request for a user with a given ID            
      var searchWord = this.currentGame.realWord;
      console.log(searchWord);
      var apiKey = "dict.1.1.20191201T085906Z.2ddc23773b712eb3.ccbcd122c4a615c76c0fa9b7bb6bfd65d15122be";
      var self = this;
      self.definition = "Loading hint...";
      axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + apiKey + '&lang=en-en&text=' + searchWord)
        .then(function (response) {
          console.log(response);
          // console.log(response.data.def[0].tr);
          if(response.data.def.length > 0){
            var responseArr = response.data.def[0].tr;          
            var msg = "";

            for(var i = 0; i < responseArr.length; i++){
              if(i > 0){
                msg = msg + ", " + responseArr[i].text;
              }else{
                msg = " Synonym(s): " + responseArr[i].text;
              }              
            } 
            self.definition = msg;
          }else{
             self.definition = "Error: Unable to retrieve hint from API dictionary."
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        this.hasShown2 = true;
    },
    showVowel(){      
      this.makeGuess({ guess: 'a'});
      this.makeGuess({ guess: 'e'});
      this.makeGuess({ guess: 'i'});
      this.makeGuess({ guess: 'o'});
      this.makeGuess({ guess: 'u'});
      this.charGuessCount = this.currentGame.characterGuesses.length;
      this.wordGuessCount = this.currentGame.wordGuesses.length;
      this.hasShown = true;
    },
    characterDisabled(letter) {      
      if (this.gameEnded) {        
        return true;
      }
      const chosen = this.currentGame ? this.currentGame.characterGuesses : [];
      return chosen.indexOf(letter) !== -1;
    },
    submitWordGuess() {
      if(this.guessText.length>0){
        if(this.guessText.match(/[a-zA-Z]/)){
          var self = this;

          this.makeGuess({ guess: this.guessText }).then(function(){ //Sync the method 
            console.log(self.currentGame);
            if(self.currentGame.won == false && self.currentGame.wordGuesses.length > 0){
              self.speak("Wrong guess, try again!");
              self.errorGuess = "Wrong guess, try again!";
            }else{            
              self.errorGuess = "";
            }
          });
          this.guessText = "";
        }else{
          this.speak("Please input character from A to Z only!")
          this.errorGuess = "Error: Please input character from A-Z only!"
        }
      }else{
        this.speak("Please input the guess word before guessing!")
        this.errorGuess = "Error: Cannot guess empty guess!"
      }
    },
    speak(str){
      //https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
      let msg = new SpeechSynthesisUtterance(str);      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
      return 0;
    }
  }
};
</script>

<style scoped>
.button{
  font-family:'Comic Sans MS';
}
.has-addons{
  margin:0;
  padding:0;
}
/* Error msg text */
.text-error{
  color: #fa4848;  
  font-size: 12px;
  max-width: 100%;
  margin:0;
  padding:0;
}

#definition{
  text-align:center;
}
.container{  
  width:960px;
  font-family:'Comic Sans MS';
  padding-top:30px;
  padding-bottom:20px;
}
.game-area {  
  width: 70%;
  margin: auto;
}

.game-area > button,
.game-area > section > div.field {
  margin-top: 3rem;
}

.letter-buttons {
  text-align: center;
}

.is-letter-button {
  margin: 0.25em;
  width: 3em;
  height: 3em;
}

.game-area a{
  text-decoration: none;
}
</style>
