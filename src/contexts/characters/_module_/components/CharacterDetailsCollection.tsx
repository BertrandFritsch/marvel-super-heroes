import * as React from "react";

interface Props {

  /**
   * Collection name
   */
  name: string;

  /**
   * The item
   */
  items: Array<{
    name: string,
  }>;
}

export default function CharacterDetailsCollection(props: Props) {
  const { name, items } = props;

  return (
    <div className="character-collection">
      <span className="character-collection-name">{name}</span>
      <div className="character-collection-items">
        { items.map((item, i) => (<span key={ i } className="character-collection-item">{ item.name }</span>)) }
      </div>
    </div>
  );
}
