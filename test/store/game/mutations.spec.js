import { mutations, state as stateFunc } from "@/store/game";

describe("Game Mutations", () => {
  test("setSendingStartGame", () => {
    const state = stateFunc();
    mutations.setSendingStartGame(state, true);
    expect(state.sendingStartGame).toEqual(true);
  });

  test("setSendingStartGameError", () => {
    const state = stateFunc();
    mutations.setStartGameError(state, { error: { message: "Some Error" } });
    expect(state.startGameError).toEqual({ error: { message: "Some Error" } });
  });

  test("setSendingMakeGuess", () => {
    const state = stateFunc();
    mutations.setSendingMakeGuess(state, true);
    expect(state.sendingMakeGuess).toEqual(true);
  });

  test("setMakeGuessError", () => {
    const state = stateFunc();
    mutations.setMakeGuessError(state, { error: { message: "Some Error" } });
    expect(state.makeGuessError).toEqual({ error: { message: "Some Error" } });
  });

  test("setCurrentGame", () => {
    const state = stateFunc();

    mutations.setCurrentGame(state, {
      id: "123",
      word: "Some Word",
      characterGuesses: [],
      wordGuesses: [],
      won: false
    });

    expect(state.currentGame).toEqual({
      id: "123",
      word: "Some Word",
      characterGuesses: [],
      wordGuesses: [],
      won: false
    });
  });
});
