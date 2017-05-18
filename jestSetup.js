// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

window.matchMedia = window.matchMedia || function() {
    return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
    };
  };