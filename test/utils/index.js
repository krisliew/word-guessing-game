import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import * as authStoreModule from "@/store/auth";
import * as gameStoreModule from "@/store/game";

export const makeVueMock = (
  C,
  { shallow = false, propsData, stubs, mocks } = {}
) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const nuxtLinkMock = {
    props: ["to"],
    template: "<a :href='to'>\n<slot></slot>\n</a>"
  };

  localVue.component("nuxt-link", nuxtLinkMock);

  const store = new Vuex.Store({
    modules: {
      auth: {
        namespaced: true,
        ...authStoreModule
      },
      game: {
        namespaced: true,
        ...gameStoreModule
      }
    }
  });

  let wrapper;

  const options = {
    localVue,
    store,
    propsData,
    stubs,
    mocks
  };

  if (shallow) {
    wrapper = shallowMount(C, options);
  } else {
    wrapper = mount(C, options);
  }

  return { wrapper, store };
};
