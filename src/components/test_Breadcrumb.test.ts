import { shallowMount } from '@vue/test-utils';
import Breadcrumb from './Breadcrumb.vue';
import { createRouter, createWebHistory } from 'vue-router';

jest.mock('vue-router', () => ({
  createWebHistory: jest.fn(),
}));

describe('Breadcrumb', () => {
  it('renders correctly with menus', () => {
    const menus = [
      { name: 'Home', route: '/' },
      { name: 'Products', route: '/products' },
      { name: 'Category', route: '/products/category' },
      { name: 'Product', route: '/products/category/product' },
    ];

    const router = createRouter({
      history: createWebHistory(),
      routes: menus.map((menu) => ({
        path: menu.route,
        name: menu.name,
        redirect: '',
      })),
    });

    const wrapper = shallowMount(Breadcrumb, {
      props: { menus },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findAll('.breadcrumb-label')).toHaveLength(menus.length);
    expect(wrapper.findAll('.breadcrumb-separator')).toHaveLength(
      menus.length - 1
    );
  });

  it('renders correctly without menus', () => {
    const wrapper = shallowMount(Breadcrumb);

    expect(wrapper.findAll('.breadcrumb-label')).toHaveLength(0);
    expect(wrapper.findAll('.breadcrumb-separator')).toHaveLength(0);
  });
});
