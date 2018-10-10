// @flow

import { Tree, TreeNode } from './components';
import SampleTree from './sample/SimpleTree';

export { Tree, TreeNode, SampleTree };

export type {
  TreeProps,
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
} from './types';

export { defaultTheme, minimalTheme } from './theme';

export default Tree;
