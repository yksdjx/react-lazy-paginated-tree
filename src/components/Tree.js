// @flow

import React, { Component } from 'react';
import deepEquals from 'fast-deep-equal';
import type { Node, TreeState, TreeProps } from '../types';
import TreeNode from './TreeNode';

// default components and theme
import { defaultTheme } from '../theme';
import DefaultList from './List';
import DefaultListItem from './ListItem';
import DefaultExpander from './Expander';
import DefaultCheckbox from './Checkbox';
import DefaultBody from './Body';
import DefaultPaginator from './Paginator';
import DefaultLoading from './Loading';
import DefaultDepthPadding from './DepthPadding';

// open/close animation for ReactCSSTransitionGroup
import '../animations/index.css';

// depth and indent width determine hierarchical indentation
const DEFAULT_INDENT_WIDTH = 20;
const DEFAULT_DEPTH = 0;

class Tree extends Component<TreeProps, TreeState> {
  static getDerivedStateFromProps(
    { nodes, parse }: TreeProps,
    state: TreeState,
  ) {
    if (!deepEquals(state.nodes, nodes)) {
      return {
        nodes: parse ? parse(nodes) : nodes,
      };
    }
    return null;
  }

  // initialize state and allow for loadChildren override (for pagination)
  constructor(props: TreeProps) {
    super(props);
    const { nodes, parse } = props;
    this.state = {
      nodes: parse ? parse(nodes) : nodes,
    };
  }

  // default loadChildren implementation to be overridden via props
  loadChildren = async (
    node: Node,
    pageLimit?: number, // eslint-disable-line
  ): Promise<Array<Node>> => node.children;

  renderChildren = () => {
    const {
      theme = defaultTheme,
      indentWidth,
      List,
      ListItem,
      Expander,
      Checkbox,
      Body,
      Paginator,
      Loading,
      DepthPadding,
      loadChildren,
      parse,
      pageLimit,
      toggleCallback,
      selectCallback,
    } = this.props;
    const { nodes } = this.state;

    return nodes.map((node: Node, index: number) => (
      <TreeNode
        key={node.id || index}
        depth={DEFAULT_DEPTH}
        node={node}
        theme={theme}
        indentWidth={indentWidth || DEFAULT_INDENT_WIDTH}
        List={List || DefaultList}
        ListItem={ListItem || DefaultListItem}
        Expander={Expander || DefaultExpander}
        Checkbox={Checkbox || DefaultCheckbox}
        Body={Body || DefaultBody}
        Paginator={Paginator || DefaultPaginator}
        Loading={Loading || DefaultLoading}
        DepthPadding={DepthPadding || DefaultDepthPadding}
        loadChildren={loadChildren || this.loadChildren}
        parse={parse}
        pageLimit={pageLimit}
        toggleCallback={toggleCallback}
        selectCallback={selectCallback}
      />
    ));
  };

  render() {
    const { style, className, theme = defaultTheme } = this.props;
    const children = this.renderChildren();

    return (
      <ul style={{ ...theme.treeStyle, ...style }} className={className}>
        {children}
      </ul>
    );
  }
}

export default Tree;
