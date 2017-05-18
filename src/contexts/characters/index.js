// @flow

import sagas from './_module_/sagas';
import reducers from './_module_/reducers';
import CharacterView from './_module_/components/CharacterViewContainer';

export default {

  // public interface of the character context
  components: {
    CharacterView
  },

  // technical exports
  sagas,
  reducers
};
