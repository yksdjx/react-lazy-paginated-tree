// @flow

import React from 'react';
import MUIListItemText from '@material-ui/core/ListItemText';
import type { BodyProps, Node, Theme } from '../types';

const BodyText = ({ node, theme }: { node: Node, theme: Theme }) => (
  <p style={theme.bodyTextStyle} className={theme.bodyTextClassName}>
    {node.name}
    &nbsp;
    {node.description ? <i>({node.description})</i> : ''}
  </p>
);

const Body = ({ theme, node, onClick, onKeyPress }: BodyProps) => (
  <MUIListItemText
    style={theme.bodyStyle}
    className={theme.bodyClassName}
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyPress={onKeyPress}
    primary={<BodyText node={node} theme={theme} />}
  />
);

export default Body;
