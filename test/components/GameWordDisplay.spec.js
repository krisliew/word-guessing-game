import GameWordDisplay from "@/components/GameWordDisplay.vue";
import { makeVueMock } from "@/test/utils";

describe("GameWordDisplay", () => {
  test("is vue instance", () => {
    const { wrapper } = makeVueMock(GameWordDisplay);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  /**
   * Snapshots
   */

  test("without word", () => {
    const { wrapper } = makeVueMock(GameWordDisplay);
    expect(wrapper.element).toMatchSnapshot();
  });

  test("with word", () => {
    const { wrapper, store } = makeVueMock(GameWordDisplay);

    store.commit("game/setCurrentGame", {
      id: "123",
      word: "_o__r B__r",
      characterGuesses: ["o", "r", "b"],
      wordGuesses: [],
      won: false
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
