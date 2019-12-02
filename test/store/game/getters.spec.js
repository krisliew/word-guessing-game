import {getters, state as stateFunc} from "@/store/game";

describe("Game Getters", () => {
  const state = stateFunc();

  test("sendingStartGame", () => {
    expect(getters.sendingStartGame(state)).toEqual(false);
  });

  test("startGameError", () => {
    expect(getters.startGameError(state)).toBeNull();
  });

  test("currentGame", () => {
    expect(getters.currentGame(state)).toBeNull();
  });

  test("sendingMakeGuess", () => {
    expect(getters.sendingMakeGuess(state)).toEqual(false);
  });

  test("makeGuessError", () => {
    expect(getters.makeGuessError(state)).toBeNull();
  });

  test("gameWon - game exists", () => {
    const state = stateFunc();
    state.currentGame = {
      won: true
    };

    expect(getters.gameWon(state)).toEqual(true);
  });

  test("gameWon - game doesn't exist", () => {
    expect(getters.gameWon(state)).toEqual(false);
  });
});
