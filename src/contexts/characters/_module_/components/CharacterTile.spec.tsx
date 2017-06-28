import { mount } from 'enzyme';
import * as React from 'react';
import CharacterTile from './CharacterTile';

describe('CharacterTile', () => {
  const character = {
    id: 'id1',
    name: 'name1',
    description: 'desc 1',
    thumbnail: 'http://.../standard_xlarge.jpg',
    thumbnail_details: 'http://.../portrait_incredible.jpg',
    comics: {
      items: []
    },
    series: {
      items: []
    },
    urls: [
      {
        type: 'details',
        url: 'http://...'
      },
    ],
  };

  it('should render correctly', () => {
    const props = {
      item: character,
      onTileDetailsRequested: () => {}
    };

    const wrapper = mount(
      <CharacterTile { ...props } />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should notify about the click on the tile', () => {
    const props = {
      item: character,
      onTileDetailsRequested: jest.fn()
    };

    const component = mount(
      <CharacterTile { ...props } />
    );

    component.find('a').at(0).simulate('click', {});
    expect(props.onTileDetailsRequested).toBeCalledWith(props.item);
  });
});
