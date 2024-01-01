import { shallowMount } from '@vue/test-utils';
import HelloWord from '../../src/components/HelloWord.vue';

describe('HelloWord', () => {
  it('renders the correct message', () => {
    const msg = 'Hello, World!';
    const wrapper = shallowMount(HelloWord, {
      props: {
        msg,
      },
    });

    expect(wrapper.find('h1').text()).toBe(msg);
  });
});
