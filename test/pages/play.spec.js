import PlayView from "@/pages/play.vue";
import { makeVueMock } from "@/test/utils";

describe("Play View", () => {
  const { wrapper } = makeVueMock(PlayView, { shallow: true });

  test("is vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders regular", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("renders with game", () => {
    const { wrapper, store } = makeVueMock(PlayView, { shallow: true });

    store.commit("game/setCurrentGame", {
      id: "123",
      word: "_o__r B__r",
      characterGuesses: ["o", "r", "b"],
      wordGuesses: [],
      won: false
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("renders with game won", () => {
    const { wrapper, store } = makeVueMock(PlayView, { shallow: true });

    store.commit("game/setCurrentGame", {
      id: "123",
      word: "Polar Bear",
      characterGuesses: ["p", "o", "l", "a", "r", "b", "e"],
      wordGuesses: [],
      won: true
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
