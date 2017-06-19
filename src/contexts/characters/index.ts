import CharacterView from "./_module_/components/CharacterViewContainer";
import reducers, { State } from "./_module_/reducers";
import sagas from "./_module_/sagas";

export type CharacterState = State;

export default {

  // public interface of the character context
  components: {
    CharacterView
  },

  // technical exports
  sagas,
  reducers
};
