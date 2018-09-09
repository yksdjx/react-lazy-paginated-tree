// @flow

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import type { Node, TreeNodeProps, TreeNodeState } from '../types';
import { hasChildren, hasLoadedChildren, shouldShowMore } from '../util';

class TreeNode extends Component<TreeNodeProps, TreeNodeState> {
  state = {
    expanderLoading: false,
    paginatorLoading: false,
  };

  // node "toggle" handler to set expander loading states and prevent
  // multiple "toggle" actions from being triggered simultaneously.
  // currently relies on stopPropagation so that toggling doesn't trigger
  // parent level select handler but this may change in future versions
  handleToggle = async (
    e: Event,
    node: Node,
    callable: Function,
    disabled: boolean,
  ) => {
    e.stopPropagation();
    if (!disabled) {
      if (!node.expanded && !hasLoadedChildren(node)) {
        this.setState({ expanderLoading: true });
        await callable(e, node);
        this.setState({ expanderLoading: false });
      } else {
        await callable(e, node);
      }
    }
  };

  // pagination "load more" handler to set paginator loading states and
  // prevent multiple "load more" actions from being triggered simultaneously.
  handleLoadMore = async (
    e: Event,
    node: Node,
    callable: Function,
    disabled: boolean,
  ) => {
    if (!disabled) {
      this.setState({ paginatorLoading: true });
      await callable(e, node);
      this.setState({ paginatorLoading: false });
    }
  };

  // render children if they exist and the node is expanded
  // ensure that depth is incremented for hierarchical indentation
  renderChildren() {
    const { depth, node }: TreeNodeProps = this.props;
    let children = [];
    if (node.expanded && hasChildren(node)) {
      children = node.children.map((childNode: Node) => (
        <TreeNode
          {...this.props}
          key={childNode.id}
          depth={depth + 1}
          node={childNode}
        />
      ));
    }
    return children;
  }

  render() {
    const {
      depth,
      node,
      theme,
      indentWidth,
      loadMore,
      onKeyLoadMore,
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
    }: TreeNodeProps = this.props;
    const { expanderLoading, paginatorLoading } = this.state;

    const children = this.renderChildren();

    return (
      <React.Fragment>
        {/* ListItem: Overridable container component */}
        <ListItem
          theme={theme}
          node={node}
          onClick={e => select(e, node)}
          onKeyPress={e => onKeySelect(e, node)}
        >
          {/* DepthPadding: Overridable Component for hierarchical indentation */}
          <DepthPadding indentWidth={indentWidth} depth={depth} />
          {/* Expander: Overridable Component for toggling expanded/collapsed state */}
          {hasChildren(node) ? (
            <Expander
              theme={theme}
              node={node}
              onClick={e => this.handleToggle(e, node, toggle, expanderLoading)}
              onKeyPress={e =>
                this.handleToggle(e, node, onKeyToggle, expanderLoading)
              }
            />
          ) : (
            <span style={theme.expanderStyle} />
          )}
          {/* CheckBox: Overridable Component for visualizing selection state */}
          <Checkbox theme={theme} node={node} />
          {/* Body: Overridable node body  */}
          <Body theme={theme} node={node} />
        </ListItem>
        {/* List: Overridable container component for node children */}
        <List theme={theme}>
          {/* Animation for node expand / collapse */}
          <ReactCSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {/* Loading: Overridable loading bar for pagination */}
            {expanderLoading && <Loading theme={theme} node={node} />}
            {children.length > 0 && (
              <div key={node.id}>
                {/* render children here */}
                {children}
                {/* Loading: Overridable loading bar for pagination */}
                {paginatorLoading && <Loading theme={theme} node={node} />}
                {/* Paginator: Overridable "load more" pagination button */}
                {!paginatorLoading &&
                  shouldShowMore(node) && (
                    <Paginator
                      theme={theme}
                      node={node}
                      onClick={e =>
                        this.handleLoadMore(e, node, loadMore, paginatorLoading)
                      }
                      onKeyPress={e =>
                        this.handleLoadMore(
                          e,
                          node,
                          onKeyLoadMore,
                          paginatorLoading,
                        )
                      }
                    />
                  )}
              </div>
            )}
          </ReactCSSTransitionGroup>
        </List>
      </React.Fragment>
    );
  }
}

export default TreeNode;
