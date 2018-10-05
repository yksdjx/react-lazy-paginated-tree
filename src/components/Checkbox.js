// @flow

import React from 'react';
import MUICheckbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import type { CheckboxProps } from '../types';

const Checkbox = ({ theme, selected }: CheckboxProps) => (
  <MUICheckbox
    style={theme.checkboxStyle}
    type="checkbox"
    tabIndex={0}
    checked={Boolean(selected)}
    onChange={() => {}}
    color="primary"
    icon={<CheckBoxOutlineBlankIcon style={theme.checkboxIconStyle} />}
    checkedIcon={<CheckBoxIcon style={theme.checkboxIconCheckedStyle} />}
  />
);

export default Checkbox;
