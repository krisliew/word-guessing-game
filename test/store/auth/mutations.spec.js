import { mutations } from "@/store/auth";

describe("Auth Mutations", () => {
  test("setSigningUp", () => {
    const state = { signingUp: true };
    mutations.setSigningUp(state, false);

    expect(state.signingUp).toBe(false);

    mutations.setSigningUp(state, true);

    expect(state.signingUp).toBe(true);
  });

  test("setSigningIn", () => {
    const state = { signingIn: true };
    mutations.setSigningIn(state, false);

    expect(state.signingIn).toBe(false);

    mutations.setSigningIn(state, true);

    expect(state.signingIn).toBe(true);
  });

  test("clearErrors", () => {
    const state = {
      signUpError: { error: { message: "not ok" } },
      signInError: { error: { message: "not ok" } },
      signOutError: { error: { message: "not ok" } }
    };

    mutations.clearErrors(state);

    expect(state.signUpError).toBeNull();
    expect(state.signInError).toBeNull();
    expect(state.signOutError).toBeNull();
  });

  test("setSendingSignUp", () => {
    const state = { sendingSignUp: false };
    mutations.setSendingSignUp(state, true);

    expect(state.sendingSignUp).toBe(true);

    mutations.setSendingSignUp(state, false);

    expect(state.sendingSignUp).toBe(false);
  });

  test("setSendingSignOut", () => {
    const state = { sendingSignOut: false };
    mutations.setSendingSignOut(state, true);

    expect(state.sendingSignOut).toBe(true);

    mutations.setSendingSignOut(state, false);

    expect(state.sendingSignOut).toBe(false);
  });

  test("setCurrentUser", () => {
    const state = { currentUser: null, signUpError: null };

    mutations.setCurrentUser(state, { id: "123", username: "PandaBear" });

    expect(state.currentUser).toEqual({ id: "123", username: "PandaBear" });
    expect(state.signUpError).toBeNull();
  });

  test("setSignUpError", () => {
    const state = { currentUser: null, signUpError: null };

    mutations.setSignUpError(state, { error: "not ok" });

    expect(state.currentUser).toBeNull();
    expect(state.signUpError).toEqual({ error: "not ok" });
  });

  test("setSignInError", () => {
    const state = { currentUser: null, signInError: null };

    mutations.setSignInError(state, { error: { message: "not ok" } });

    expect(state.currentUser).toBeNull();
    expect(state.signInError).toEqual({ error: { message: "not ok" } });
  });

  test("setSignOutError", () => {
    const state = { currentUser: null, signOutError: null };

    mutations.setSignOutError(state, { error: { message: "not ok" } });

    expect(state.currentUser).toBeNull();
    expect(state.signOutError).toEqual({ error: { message: "not ok" } });
  });
});
