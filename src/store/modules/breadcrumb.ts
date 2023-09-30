import { Menus } from '@/types/breadcrumb';

export default {
  state: () => ({
    menus: [
      {
        name: 'Reader',
      },
    ] as Menus[],
  }),
  mutations: {
    SET_BREADCRUMB(state: any, payload: Menus[]) {
      state.menus = payload;
    },
  },
};
