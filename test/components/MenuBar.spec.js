import MenuBar from "@/components/MenuBar.vue";
import { makeVueMock } from "@/test/utils";

describe("MenuBar", () => {
  const { wrapper } = makeVueMock(MenuBar, {
    shallow: true
  });

  test("is vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders regular", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test("no user - signing up", () => {
    const { wrapper, store } = makeVueMock(MenuBar, {
      shallow: true
    });
    store.commit("auth/setSigningUp", true);
    expect(wrapper.element).toMatchSnapshot();
  });

  test("no user - signing in", () => {
    const { wrapper, store } = makeVueMock(MenuBar, {
      shallow: true
    });
    store.commit("auth/setSigningIn", true);
    expect(wrapper.element).toMatchSnapshot();
  });

  test("has user", () => {
    const { wrapper, store } = makeVueMock(MenuBar, {
      shallow: true
    });
    store.commit("auth/setCurrentUser", { id: "123", username: "PandaBear" });
    expect(wrapper.element).toMatchSnapshot();
  });

  test("has user - signing out", () => {
    const { wrapper, store } = makeVueMock(MenuBar, {
      shallow: true
    });
    store.commit("auth/setCurrentUser", { id: "123", username: "PandaBear" });
    store.commit("auth/setSendingSignOut", true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
