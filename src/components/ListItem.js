// @flow

import React from 'react';
import MUIListItem from '@material-ui/core/ListItem';
import type { ListItemProps } from '../types';

const ListItem = ({
  theme,
  onClick,
  onKeyPress,
  children,
  onDoubleClick,
}: ListItemProps) => (
  <MUIListItem
    button
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    onKeyPress={onKeyPress}
    style={theme.listItemStyle}
    className={theme.listItemClassName}
  >
    {children}
  </MUIListItem>
);

export default ListItem;
