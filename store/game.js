import { gameService } from "@/services";

export const state = () => ({
  sendingStartGame: false,
  sendingMakeGuess: false,
  startGameError: null,
  makeGuessError: null,
  currentGame: null
});

export const getters = {
  sendingStartGame: state => state.sendingStartGame,
  sendingMakeGuess: state => state.sendingMakeGuess,
  startGameError: state => state.startGameError,
  makeGuessError: state => state.makeGuessError,
  currentGame: state => state.currentGame,
  gameWon: state => (state.currentGame ? state.currentGame.won : false)
};

export const mutations = {  
  setSendingStartGame: (state, val) => {
    state.sendingStartGame = val;
  },
  setSendingMakeGuess: (state, val) => {
    state.sendingMakeGuess = val;
  },
  setStartGameError: (state, error) => {
    state.startGameError = error;
  },
  setMakeGuessError: (state, error) => {
    state.makeGuessError = error;
  },
  setCurrentGame: (state, game) => {
    state.currentGame = game;
  }
};

export const makeActions = gameService => {
  return {
    startGame: async ({ commit }) => {
      commit("setSendingStartGame", true);

      const startGameResponse = await gameService.startGame();

      if (startGameResponse.error) {
        commit("setStartGameError", startGameResponse);
      } else {
        commit("setCurrentGame", startGameResponse);
      }

      commit("setSendingStartGame", false);
    },
    makeGuess: async ({ commit, state }, { guess }) => {
      commit("setSendingMakeGuess", true);

      const makeGuessResponse = await gameService.makeGuess({
        gameId: state.currentGame.id,
        guess
      });

      if (makeGuessResponse.error) {
        commit("setMakeGuessError", makeGuessResponse);
      } else {
        commit("setCurrentGame", makeGuessResponse);
      }

      commit("setSendingMakeGuess", false);
    }
  };
};

export const actions = makeActions(gameService);
