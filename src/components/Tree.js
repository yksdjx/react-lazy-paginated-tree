// @flow

import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import type { Node, TreeState, TreeProps, Event } from '../types';
import { hasChildren, isFullyFetched } from '../util';
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
  // initialize state and allow for loadChildren override (for pagination)
  constructor(props: TreeProps) {
    super(props);
    const { nodes, parse } = props;
    this.state = {
      nodes: parse ? parse(nodes) : nodes,
    };
    this.loadChildren = props.loadChildren || this.loadChildren;
  }

  // ensure that deep updates to the tree nodes trigger a re-render
  componentDidUpdate = (prevProps: TreeProps) => {
    const { nodes, parse } = this.props;
    if (!deepEqual(prevProps.nodes, nodes)) {
      this.setState({
        nodes: parse ? parse(nodes) : nodes,
      });
    }
  };

  // set the state but also broadcast the updated state via onUpdate
  setBroadcastedState = (state: TreeState) => {
    this.setState(state);
    const { onUpdate } = this.props;
    if (onUpdate) {
      onUpdate(state);
    }
  };

  // default loadChildren implementation to be overridden via props
  loadChildren = async (
    node: Node,
    pageLimit?: number, // eslint-disable-line
  ): Promise<Array<Node>> => node.children;

  // handler for paginating on a list of siblings. Determine if more siblings need to be
  // loaded and append them to the end of the list
  loadMore = async (e: Event, node: Node) => {
    const { pageLimit, parse } = this.props;
    const state: TreeState = { ...this.state };
    if (!isFullyFetched(node) && pageLimit) {
      node.page += 1;
      const loadedChildren = await this.loadChildren(node, pageLimit);
      node.children = node.children.concat(
        parse ? parse(loadedChildren) : loadedChildren,
      );
    }
    this.setBroadcastedState(state);
  };

  onKeyLoadMore = async (e: Event, node: Node): Promise<void> => {
    if (e.key === 'Enter') {
      await this.loadMore(e, node);
    }
  };

  // handler for expanding / collapsing a node. Determine if children need to be
  // loaded and set expanded state.
  // fires toggleCallback() prop with event and node
  toggle = async (e: Event, node: Node): Promise<void> => {
    const { pageLimit, parse } = this.props;
    const state: TreeState = { ...this.state };
    if (node.children.length === 0 && hasChildren(node)) {
      node.page += 1;
      const loadedChildren = await this.loadChildren(node, pageLimit);
      node.children = parse ? parse(loadedChildren) : loadedChildren;
    }
    node.expanded = !node.expanded;
    this.setBroadcastedState(state);
    const { toggleCallback } = this.props;
    if (toggleCallback) {
      toggleCallback(e, node);
    }
  };

  onKeyToggle = async (e: Event, node: Node): Promise<void> => {
    if (e.key === 'Enter') {
      await this.toggle(e, node);
    }
  };

  // handler for selecting a node.
  // fires selectCallback() prop with event and node
  select = (e: Event, node: Node): void => {
    const state: TreeState = { ...this.state };
    node.selected = !node.selected;
    this.setBroadcastedState(state);
    const { selectCallback } = this.props;
    if (selectCallback) {
      selectCallback(e, node);
    }
  };

  onKeySelect = (e: Event, node: Node): void => {
    if (e.key === 'Enter') {
      this.select(e, node);
    }
  };

  render() {
    const {
      style,
      className,
      theme = defaultTheme,
      indentWidth,
      toggle,
      onKeyToggle,
      select,
      onKeySelect,
      List,
      ListItem,
      Expander,
      Checkbox,
      Body,
      Paginator,
      Loading,
      DepthPadding,
    } = this.props;

    const { nodes } = this.state;

    return (
      <ul style={{ ...theme.treeStyle, ...style }} className={className}>
        {nodes.map((node: Node, index: number) => (
          <TreeNode
            key={node.id || index}
            depth={DEFAULT_DEPTH}
            node={node}
            theme={theme}
            indentWidth={indentWidth || DEFAULT_INDENT_WIDTH}
            loadMore={this.loadMore}
            onKeyLoadMore={this.onKeyLoadMore}
            toggle={toggle || this.toggle}
            onKeyToggle={onKeyToggle || this.onKeyToggle}
            select={select || this.select}
            onKeySelect={onKeySelect || this.onKeySelect}
            List={List || DefaultList}
            ListItem={ListItem || DefaultListItem}
            Expander={Expander || DefaultExpander}
            Checkbox={Checkbox || DefaultCheckbox}
            Body={Body || DefaultBody}
            Paginator={Paginator || DefaultPaginator}
            Loading={Loading || DefaultLoading}
            DepthPadding={DepthPadding || DefaultDepthPadding}
          />
        ))}
      </ul>
    );
  }
}

export default Tree;
