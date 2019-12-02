import AuthModal from "@/components/AuthModal.vue";
import { makeVueMock } from "@/test/utils";

describe("SignUpModal", () => {
  test("is vue instance", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit"
      }
    });

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  /**
   * Snapshots
   */

  test("renders regular", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit"
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("renders active", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit",
        active: true
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("custom cancel text", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit",
        cancelText: "Don't Submit"
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("loading", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit",
        cancelText: "Don't Submit",
        loading: true
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("error message", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit",
        cancelText: "Don't Submit",
        errorMessage: "This is an error"
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  /**
   * Event Testing
   */

  test("submit clicked", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit"
      }
    });

    wrapper.find(".modal-card-foot > button:first-child").trigger("click");

    const submitEmission = wrapper.emitted().submit;

    expect(submitEmission).toBeTruthy();
  });

  test("submit event with data", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit"
      }
    });

    wrapper.vm.$data.username = "Panda Bear";
    wrapper.vm.$data.password = "bamboo123";

    wrapper.find(".modal-card-foot > button:first-child").trigger("click");

    const submitEmission = wrapper.emitted().submit;

    expect(submitEmission[0]).toEqual([
      { username: "Panda Bear", password: "bamboo123" }
    ]);
  });

  test("cancel event - 'x' button", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit"
      }
    });

    wrapper.find(".modal-card-head > button.delete").trigger("click");

    const submitEmission = wrapper.emitted().cancel;

    expect(submitEmission).toBeTruthy();
  });

  test("cancel event - cancel button", () => {
    const { wrapper } = makeVueMock(AuthModal, {
      propsData: {
        title: "Auth Modal",
        submitText: "Submit"
      }
    });

    wrapper.find(".modal-card-foot > button:last-child").trigger("click");

    const submitEmission = wrapper.emitted().cancel;

    expect(submitEmission).toBeTruthy();
  });
});
