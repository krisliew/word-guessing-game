import { makeActions } from "@/store/game";
import { testAction } from "@/test/store/utils";

const actions = makeActions({
  startGame: () => {
    return Promise.resolve({
      id: "123",
      word: "Some Word",
      characterGuesses: [],
      wordGuesses: []
    });
  },
  makeGuess: ({ gameId, guess }) => {
    return Promise.resolve({
      id: "123",
      word: "Some Word",
      characterGuesses: [guess],
      wordGuesses: []
    });
  }
});

describe("Game Actions", () => {
  test("startGame - Success", done => {
    testAction(
      actions.startGame,
      null,
      {},
      [
        { type: "setSendingStartGame", payload: true },
        {
          type: "setCurrentGame",
          payload: {
            id: "123",
            word: "Some Word",
            characterGuesses: [],
            wordGuesses: []
          }
        },
        { type: "setSendingStartGame", payload: false }
      ],
      done
    );
  });

  test("startGame - Error", done => {
    const actions = makeActions({
      startGame: () => {
        return Promise.resolve({
          error: {
            message: "Some Error"
          }
        });
      }
    });

    testAction(
      actions.startGame,
      null,
      {},
      [
        { type: "setSendingStartGame", payload: true },
        {
          type: "setStartGameError",
          payload: {
            error: {
              message: "Some Error"
            }
          }
        },
        { type: "setSendingStartGame", payload: false }
      ],
      done
    );
  });

  test("makeGuess - Success", done => {
    testAction(
      actions.makeGuess,
      { guess: "b" },
      {
        currentGame: {
          id: "123"
        }
      },
      [
        { type: "setSendingMakeGuess", payload: true },
        {
          type: "setCurrentGame",
          payload: {
            id: "123",
            word: "Some Word",
            characterGuesses: ["b"],
            wordGuesses: []
          }
        },
        { type: "setSendingMakeGuess", payload: false }
      ],
      done
    );
  });

  test("makeGuess - Error", done => {
    const actions = makeActions({
      makeGuess: () => {
        return Promise.resolve({
          error: {
            message: "Some Error"
          }
        });
      }
    });

    testAction(
      actions.makeGuess,
      { guess: "b" },
      {
        currentGame: {
          id: "123"
        }
      },
      [
        { type: "setSendingMakeGuess", payload: true },
        {
          type: "setMakeGuessError",
          payload: {
            error: {
              message: "Some Error"
            }
          }
        },
        { type: "setSendingMakeGuess", payload: false }
      ],
      done
    );
  });
});
