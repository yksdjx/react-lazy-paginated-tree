# React Lazy Paginated Tree

React tree-view component built for performance, customizability and large data sets. This library provides:

* A base theme built on top of material UI
* Flexible styling (provide a theme or override the default theme)
* The ability to plug in your own custom components
* Lazy loading (i.e. load children when expanding a node)
* Pagination for long lists of child nodes
* Animations when expanding and collapsing nodes
* The ability to override default methods for expanding/collapsing/selecting nodes
* Keyboard accessibility

<img src="./img.png" width="600px"/>

## Install

```
npm install react-lazy-paginated-tree --save
```

## Dependencies

This library depends on:

* [babel-preset-react](https://www.npmjs.com/package/babel-preset-react)

Please ensure that these are included in your project.

## Quick Start

```javascript
'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree } from 'react-lazy-paginated-tree';

class ReactLazyPaginatedTree extends Component {
  render() {
    return <Tree nodes={SampleTree} useLocalState={true} />;
  }
}

const content = document.getElementById('content');
ReactDOM.render(<ReactLazyPaginatedTree />, content);
```

## [Demo](https://boweihan.github.io/rlpt-example/)

An online demo for the quick start, theming, lazy loading and pagination can be found [Here](https://boweihan.github.io/rlpt-example/).

## API

### &lt;Tree />

The component accepts the following props:

##### Data Props

* `nodes: Array<Node>`: (**required**) A list of nodes that represent the top level of the tree

Format (one node with one child):

```
{
  id: 5,
  name: '2018',
  description: 'Current Year',
  children: [
    {
      id: 6,
      name: 'Q1',
      description: 'Current Quarter',
      children: [],
      numChildren: 0,
      expanded: false,
      selected: false,
    },
  ],
  numChildren: 1,
  expanded: false,
  selected: false,
},
```

##### State Props

* `useLocalState: boolean`: boolean that if set to TRUE will leverage local tree state only and not reflect prop changes. If you are using a state management framework such as Redux do NOT set this property to true.

##### Lazy Loading Props

* `loadChildren: Function`: function to load children of a node, called with `(node: Node, pageLimit?: number)`. A parse method must be specified if the structure of children returned from this method doesn't match `Array<Node>`.
* `parse: Function`: function that accepts a list of children (via loadChildren) and returns a list of `Array<Node>`. This must be provided if loadChildren doesn't return `Array<Node>`.

##### Pagination Props

* `paginated: boolean`: If true the tree will attempt to paginate by concatenating existing nodes with nodes returned by loadChildren.
* `pageLimit: number`: pagination page limit.

##### Change Tracking Props

* `onUpdate: Function`: function called with `(state: TreeState)` whenever the tree state changes. Can be used to hook into external data providers (i.e. with Redux).

##### Callback Props

* `toggleCallback: Function`: function called with `(e: Event, node: Node)` as a callback to node expand/collapse event.
* `selectCallback: Function`: function called with `(e: Event, node: Node)` as a callback to node selection event.

##### Style Overrides

* `theme: Theme`: The easiest way to add custom styling. Simply provide a `theme: Theme` javascript styles object override the default theme.
* `indentWidth: number`: The padding depth for each level of nesting within the tree.

##### Component Overrides

The component tree looks like this:

```
<List>
  <Loading />
  <ListItem>
    <DepthPadding />
    <Expander />
    <Checkbox />
    <Body />
  </ListItem>
  <Paginator />
</List>
```

Each of these components can be substituted with your own custom component. The default theme is built on Material-UI. The components are:

* `List: <React.Component />`
* `ListItem: <React.Component />`
* `Expander: <React.Component />`
* `Checkbox: <React.Component />`
* `Body: <React.Component />`
* `Paginator: <React.Component />`
* `Loading: <React.Component />`
* `DepthPadding: <React.Component />`

## Package Exports

##### Tree Component

`import { Tree } from 'react-lazy-paginated-tree'`

##### Themes

`import { defaultTheme, minimalTheme } from 'react-lazy-paginated-tree'`

##### Sample Nodes

`import { SampleTree } from 'react-lazy-paginated-tree'`

##### Flow Types

```
import type {
  TreeProps,
  TreeState,
  TreeNodeProps,
  TreeNodeState,
  Node,
  Theme,
  CheckboxProps,
  BodyProps,
  ExpanderProps,
  ListItemProps,
  ListProps,
  LoadingProps,
  DepthPaddingProps,
} from 'react-lazy-paginated-tree'
```

## Flow-Type Definitions

##### : TreeProps

```
export type TreeProps = {
  nodes: Array<Node>,
  pageLimit?: number,
  parse?: Function,
  style?: Object, // equivalent to overriding theme.treeStyle
  className?: string | Object,
  theme?: Theme,
  indentWidth?: number,
  List?: any,
  ListItem?: any,
  Expander?: any,
  Checkbox?: any,
  Body?: any,
  Paginator?: any,
  Loading?: any,
  DepthPadding?: any,
  toggle?: Function,
  onKeyToggle?: Function,
  select?: Function,
  onKeySelect?: Function,
  loadChildren?: Function,
  selectCallback?: Function,
  toggleCallback?: Function,
  useLocalState?: boolean,
  paginated?: boolean,
};
```

##### : TreeState

```
export type TreeState = {
  nodes: Array<Node>,
};
```

##### : TreeNodeProps

```
export type TreeNodeProps = {
  depth: number,
  node: Node,
  theme: Theme,
  indentWidth: number,
  List: any,
  ListItem: any,
  Expander: any,
  Checkbox: any,
  Body: any,
  Paginator: any,
  Loading: any,
  DepthPadding: any,
  loadChildren: Function,
  parse: ?Function,
  pageLimit: ?number,
  selectCallback?: Function,
  toggleCallback?: Function,
  useLocalState?: boolean,
  paginated?: boolean,
};
```

##### : TreeNodeState

```
export type TreeNodeState = {
  expanderLoading: boolean,
  paginatorLoading: boolean,
  expanded: boolean,
  selected: boolean,
  children: Array<Node>,
  page: number,
};
```

##### : Node

```
export type Node = {
  id: string,
  name: string,
  description: string,
  children: Array<Node>,
  numChildren: number,
  page: number,
  expanded: boolean,
  selected: boolean,
};
```

##### : Theme

```
export type Theme = {
  treeStyle: Object,
  bodyStyle: Object,
  bodyTextStyle: Object,
  checkboxStyle: Object,
  checkboxIconStyle: Object,
  checkboxIconCheckedStyle: Object,
  expanderStyle: Object,
  listItemStyle: Object,
  paginatorStyle: Object,
  paginatorTextStyle: Object,
  loadingStyle: Object,
  loadingTextStyle: Object,
  listStyle: Object,
};
```

##### : CheckboxProps

```
export type CheckboxProps = {
  checked: boolean,
  theme: Theme,
  node: Node,
  onChange: Function,
  onKeyPress: Function,
  selected: boolean,
};
```

##### : BodyProps

```
export type BodyProps = {
  theme: Theme,
  node: Node,
  onClick: Function,
  onKeyPress: Function,
};
```

##### : ExpanderProps

```
export type ExpanderProps = {
  theme: Theme,
  node: Node,
  onClick: Function,
  onKeyPress: Function,
  expanded: boolean,
};
```

##### : ListItemProps

```
export type ListItemProps = {
  theme: Theme,
  node: Node,
  children: any,
  onClick: Function,
  onKeyPress: Function,
};
```

##### : ListProps

```
export type ListProps = {
  theme: Theme,
  node: Node,
  children: any,
};
```

##### : PaginatorProps

```
export type PaginatorProps = {
  theme: Theme,
  node: Node,
  onClick: Function,
  onKeyPress: Function,
  indentWidth: number,
  depth: number,
};
```

##### : LoadingProps

```
export type LoadingProps = {
  theme: Theme,
  node: Node,
  indentWidth: number,
  depth: number,
};
```

##### : DepthPaddingProps

```
export type DepthPaddingProps = {
  indentWidth: number,
  depth: number,
  children: any,
};
```

## License

MIT.
