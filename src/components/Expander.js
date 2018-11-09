// @flow

import React from 'react';
import MUIListItemIcon from '@material-ui/core/ListItemIcon';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import type { ExpanderProps } from '../types';

const Expander = ({ theme, onClick, onKeyPress, expanded }: ExpanderProps) => (
  <MUIListItemIcon
    style={theme.expanderStyle}
    className={theme.expanderClassName}
    onClick={onClick}
    onKeyPress={onKeyPress}
    tabIndex={0}
    type="button"
  >
    {expanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
  </MUIListItemIcon>
);

export default Expander;
