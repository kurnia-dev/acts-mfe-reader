import { mount } from '@vue/test-utils';
import Button from './FilterButton.vue';

describe('Button', () => {
  it('emits toggleFilter event and toggles active state when clicked', async () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'ri-filter-line',
        severity: 'secondary',
        outlined: true,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('toggleFilter');
  });
});
