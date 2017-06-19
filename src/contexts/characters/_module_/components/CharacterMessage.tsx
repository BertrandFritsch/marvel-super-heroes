import * as React from "react";

interface Props {

  /**
   * The message to show to the user
   */
  message: string;
}

/**
 * Character message
 */
export default function CharacterMessage(props: Props) {
  const { message } = props;

  return (
    <p className="character-message">{ message }</p>
  );
}
