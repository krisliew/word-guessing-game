import GameService from "@/services/GameService";

const gameServiceWithAccess = () => {
  return new GameService({
    get currentAccessToken() {
      return "123";
    }
  }, {
    getWords() {
      return Promise.resolve([
        "Polar Bear"
      ]);
    }
  });
};

describe("GameService", () => {
  test("startGame", async () => {
    const gameService = gameServiceWithAccess();

    const startGameResponse = await gameService.startGame();

    expect(startGameResponse.id).toBeTruthy();
    expect(startGameResponse.word).toEqual("_____ ____");
    expect(startGameResponse.characterGuesses).toEqual([]);
    expect(startGameResponse.wordGuesses).toEqual([]);
    expect(startGameResponse.won).toEqual(false);
  });

  test("startGame - no access", async () => {
    const gameService = new GameService({});

    const startGameResponse = await gameService.startGame();

    expect(startGameResponse.error.message).toEqual("log in to start a game");
  });

  test("makeGuess - correct", async () => {
    const gameService = gameServiceWithAccess();

    const { id } = await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      gameId: id,
      guess: "b"
    });

    expect(guessResponse.id).toBeTruthy();
    expect(guessResponse.word).toEqual("_____ B___");
    expect(guessResponse.characterGuesses).toEqual(["b"]);
    expect(guessResponse.wordGuesses).toEqual([]);
    expect(guessResponse.won).toEqual(false);
  });

  test("makeGuess - incorrect", async () => {
    const gameService = gameServiceWithAccess();

    const { id } = await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      gameId: id,
      guess: "z"
    });

    expect(guessResponse.id).toBeTruthy();
    expect(guessResponse.word).toEqual("_____ ____");
    expect(guessResponse.characterGuesses).toEqual(["z"]);
    expect(guessResponse.wordGuesses).toEqual([]);
    expect(guessResponse.won).toEqual(false);
  });

  test("makeGuess - all letters", async () => {
    const gameService = gameServiceWithAccess();

    const { id } = await gameService.startGame();

    await gameService.makeGuess({
      gameId: id,
      guess: "p"
    });
    await gameService.makeGuess({
      gameId: id,
      guess: "o"
    });
    await gameService.makeGuess({
      gameId: id,
      guess: "l"
    });
    await gameService.makeGuess({
      gameId: id,
      guess: "a"
    });
    await gameService.makeGuess({
      gameId: id,
      guess: "r"
    });

    await gameService.makeGuess({
      gameId: id,
      guess: "b"
    });
    const guessResponse = await gameService.makeGuess({
      gameId: id,
      guess: "e"
    });

    expect(guessResponse.id).toBeTruthy();
    expect(guessResponse.word).toEqual("Polar Bear");
    expect(guessResponse.characterGuesses).toEqual([
      "p",
      "o",
      "l",
      "a",
      "r",
      "b",
      "e"
    ]);
    expect(guessResponse.wordGuesses).toEqual([]);
    expect(guessResponse.won).toEqual(true);
  });

  test("makeGuess - correct word", async () => {
    const gameService = gameServiceWithAccess();

    const { id } = await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      gameId: id,
      guess: "polar bear"
    });

    expect(guessResponse.id).toBeTruthy();
    expect(guessResponse.word).toEqual("Polar Bear");
    expect(guessResponse.characterGuesses).toEqual([]);
    expect(guessResponse.wordGuesses).toEqual(["polar bear"]);
    expect(guessResponse.won).toEqual(true);
  });

  test("makeGuess - incorrect word", async () => {
    const gameService = gameServiceWithAccess();

    const { id } = await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      gameId: id,
      guess: "panda bear"
    });

    expect(guessResponse.id).toBeTruthy();
    expect(guessResponse.word).toEqual("_____ ____");
    expect(guessResponse.characterGuesses).toEqual([]);
    expect(guessResponse.wordGuesses).toEqual(["panda bear"]);
    expect(guessResponse.won).toEqual(false);
  });

  test("makeGuess - no game id", async () => {
    const gameService = gameServiceWithAccess();

    await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      guess: "b"
    });

    expect(guessResponse.error.message).toEqual("game id required");
  });

  test("makeGuess - no guess", async () => {
    const gameService = gameServiceWithAccess();

    const { id } = await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      gameId: id
    });

    expect(guessResponse.error.message).toEqual("guess required");
  });

  test("makeGuess - invalid game id", async () => {
    const gameService = gameServiceWithAccess();

    await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      gameId: "456",
      guess: "b"
    });

    expect(guessResponse.error.message).toEqual("game does not exist");
  });

  test("makeGuess - invalid guess", async () => {
    const gameService = gameServiceWithAccess();

    const { id } = await gameService.startGame();

    const guessResponse = await gameService.makeGuess({
      gameId: id,
      guess: ","
    });

    expect(guessResponse.error.message).toEqual("must guess a letter A-Z");
  });

  test("getGames - no games", async () => {
    const gameService = gameServiceWithAccess();

    const getGamesResponse = await gameService.getGames();

    expect(getGamesResponse).toEqual([]);
  });

  test("getGames - have games", async () => {
    const gameService = gameServiceWithAccess();

    const start1 = await gameService.startGame();
    const start2 = await gameService.startGame();
    const start3 = await gameService.startGame();

    const getGamesResponse = await gameService.getGames();

    const findGame = toFind =>
      getGamesResponse.find(game => game.id === toFind.id);

    expect(findGame(start1)).toBeTruthy();
    expect(findGame(start2)).toBeTruthy();
    expect(findGame(start3)).toBeTruthy();
  });
});
