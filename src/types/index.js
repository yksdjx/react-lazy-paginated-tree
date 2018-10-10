// @flow

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

export type Cache = Object;

export type Event = Object;

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
};

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
};

export type TreeNodeState = {
  expanderLoading: boolean,
  paginatorLoading: boolean,
  expanded: boolean,
  selected: boolean,
  children: Array<Node>,
  page: number,
};

export type CheckboxProps = {
  checked: boolean,
  theme: Theme,
  node: Node,
  onChange: Function,
  onKeyPress: Function,
  selected: boolean,
};

export type BodyProps = {
  theme: Theme,
  node: Node,
  onClick: Function,
  onKeyPress: Function,
};

export type ExpanderProps = {
  theme: Theme,
  node: Node,
  onClick: Function,
  onKeyPress: Function,
  expanded: boolean,
};

export type ListItemProps = {
  theme: Theme,
  node: Node,
  children: any,
  onClick: Function,
  onKeyPress: Function,
};

export type ListProps = {
  theme: Theme,
  node: Node,
  children: any,
};

export type LoadingProps = {
  theme: Theme,
  node: Node,
};

export type DepthPaddingProps = {
  indentWidth: number,
  depth: number,
  children: any,
};
