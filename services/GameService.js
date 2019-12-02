import uuid from "uuid/v4";
import {cloneDeep} from "lodash";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

export default class GameService {
  _games = {};
  _authService = null;
  _apiService = null;

  constructor(authService, apiService) {
    this._authService = authService;
    this._apiService = apiService;
  }

  static get alphabetLetters() {
    return letters.slice();
  }

  withAuth(then) {
    // if (!this._authService.currentAccessToken) {      
    //   return Promise.resolve({
    //     error: {
    //       message: "log in to start a game"
    //     }
    //   });
    // }

    return then();
  }

  startGame() {
    return this.withAuth(async () => {
      const words = await this._apiService.getWords();

      const roll = Math.floor(Math.random() * words.length);
      const word = words[roll];

      const newGame = {
        id: uuid(),
        word: word,
        characterGuesses: [],
        wordGuesses: [],
        won: false,
        realWord: word
      };

      this._games[newGame.id] = newGame;

      const responseGame = {
        ...newGame,
        word: newGame.word.replace(/[a-zA-Z]/g, "_")
      };

      return Promise.resolve(cloneDeep(responseGame));
    });
  }

  makeGuess({ gameId, guess }) {
    return this.withAuth(() => {
      // if (!gameId) {
      //   return Promise.resolve({
      //     error: {
      //       message: "game id required"
      //     }
      //   });
      // }

      if (!guess) {
        return Promise.resolve({
          error: {
            message: "guess required"
          }
        });
      }

      if (!guess.match(/[a-zA-Z]/)) {
        return Promise.resolve({
          error: {
            message: "must guess a letter A-Z"
          }
        });
      }

      const game = this._games[gameId];

      if (!game) {
        return Promise.resolve({
          error: {
            message: "game does not exist"
          }
        });
      }

      let word = game.word;
      
      if (guess.length === 1) {
        // character guess
        game.characterGuesses.push(guess.toLowerCase());

        const result = this.redactWord(game.word, game.characterGuesses);

        if (result.allGuessed === true) {
          game.won = true;          
        }

        word = result.word;
      } else {
        // word guess
        game.wordGuesses.push(guess);

        if (game.word.toLowerCase() !== guess.toLowerCase()) {
          // incorrect
          const result = this.redactWord(game.word, game.characterGuesses);
          word = result.word;
        } else {
          // correct
          game.won = true;
        }
      }

      return Promise.resolve({
        ...cloneDeep(game),
        word
      });
    });
  }

  getGames() {
    return Promise.resolve(Object.values(this._games));
  }

  redactWord(word, characterGuesses) {
    const characters = word.split("");

    let charCount = 0;
    let guessedCount = 0;

    for (let i = 0; i < characters.length; i++) {
      const c = characters[i];

      // skip non alpha
      if (!c.match(/[a-zA-Z]/)) {
        continue;
      }

      charCount++;

      if (characterGuesses.indexOf(c.toLowerCase()) === -1) {
        // haven't guessed character
        // redact from returned word
        characters[i] = "_";
      } else {
        guessedCount++;
      }
    }

    return {
      word: characters.join(""),
      allGuessed: charCount === guessedCount
    };
  }
}
