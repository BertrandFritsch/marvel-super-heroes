declare module 'react-stonecutter' {

  import * as React from 'react';

  export class CSSGrid extends React.Component<any, any> {}

  export function makeResponsive(Grid: React.ComponentClass<any>): React.ComponentClass<any>;
}
