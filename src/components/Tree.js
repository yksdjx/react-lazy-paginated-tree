// @flow

import React, { Component } from 'react';
import type { Node, TreeProps } from '../types';
import TreeNode from './TreeNode';

// default components and theme
import { defaultTheme as DEFAULT_THEME } from '../theme';
import DEFAULT_LIST from './List';
import DEFAULT_LIST_ITEM from './ListItem';
import DEFAULT_EXPANDER from './Expander';
import DEFAULT_CHECKBOX from './Checkbox';
import DEFAULT_BODY from './Body';
import DEFAULT_PAGINATOR from './Paginator';
import DEFAULT_LOADING from './Loading';
import DEFAULT_DEPTH_PADDING from './DepthPadding';

// open/close animation for ReactCSSTransitionGroup
import '../animations/index.css';

// depth and indent width determine hierarchical indentation
import { DEFAULT_INDENT_WIDTH, DEFAULT_DEPTH } from '../util/constants';

class Tree extends Component<TreeProps> {
  // default loadChildren implementation to be overridden via props
  loadChildren = async (
    node: Node,
    pageLimit?: number, // eslint-disable-line
  ): Promise<Array<Node>> => node.children;

  render() {
    const {
      depth = DEFAULT_DEPTH,
      style,
      className,
      nodes,
      theme = DEFAULT_THEME,
      indentWidth = DEFAULT_INDENT_WIDTH,
      List = DEFAULT_LIST,
      ListItem = DEFAULT_LIST_ITEM,
      Expander = DEFAULT_EXPANDER,
      Checkbox = DEFAULT_CHECKBOX,
      Body = DEFAULT_BODY,
      Paginator = DEFAULT_PAGINATOR,
      Loading = DEFAULT_LOADING,
      DepthPadding = DEFAULT_DEPTH_PADDING,
      loadChildren = this.loadChildren,
      parse,
      pageLimit,
      toggleCallback,
      selectCallback,
      useLocalState,
      paginated,
      doubleClickSelect,
    } = this.props;

    const parsedNodes = parse ? parse(nodes) : nodes;

    return (
      <ul style={{ ...theme.treeStyle, ...style }} className={className}>
        {parsedNodes.map((node: Node, index: number) => (
          <TreeNode
            key={node.id || index}
            depth={depth}
            node={node}
            theme={theme}
            indentWidth={indentWidth}
            List={List}
            ListItem={ListItem}
            Expander={Expander}
            Checkbox={Checkbox}
            Body={Body}
            Paginator={Paginator}
            Loading={Loading}
            DepthPadding={DepthPadding}
            loadChildren={loadChildren}
            parse={parse}
            pageLimit={pageLimit}
            toggleCallback={toggleCallback}
            selectCallback={selectCallback}
            useLocalState={useLocalState}
            paginated={paginated}
            doubleClickSelect={doubleClickSelect}
          />
        ))}
      </ul>
    );
  }
}

export default Tree;
