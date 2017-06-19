import { connect } from "react-redux";
import { State } from "../reducers";
import CharacterDetails from "./CharacterDetails";

export default connect(
  (state: { characters: State }) => ({
    item: state.characters.selectedItem
  }),
  undefined,
  (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps
  }))(CharacterDetails);
