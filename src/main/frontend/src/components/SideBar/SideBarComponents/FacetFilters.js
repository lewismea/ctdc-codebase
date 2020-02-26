import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { toggleCheckBox } from '../../../pages/dashboard/dashboardState';


const FacetPanel = (classes) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboard
    && state.dashboard.checkbox
      ? state.dashboard.checkbox : {
        data: [],
        defaultPanel: false,
      }));

  // redux use actions
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!expanded || !(expanded === `${sideBarContent.defaultPanel}false` || expanded !== false)) {
      setExpanded(sideBarContent.defaultPanel);
    }
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : `${panel}false`);

    // set height of filters.
  };

  const handleToggle = (value) => () => {
    const valueList = value.split('$$');
    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: valueList[1],
      name: valueList[0],
      datafield: valueList[2],
      isChecked: !(valueList[3] === 'true'),
    }]));
  };

  return (
    <>
      {sideBarContent.data.map((sideBarItem) => {
        if (sideBarItem.show) {
          return (
            <>
              <ExpansionPanel
                expanded={expanded === sideBarItem.groupName}
                onChange={handleChange(sideBarItem.groupName)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ArrowDropDownIcon style={{ fill: '#3695A9' }} />}
                  aria-controls={sideBarItem.groupName}
                  id={sideBarItem.groupName}
                  classes={{ root: classes.expansionPanelSummaryRoot }}
                >
                  <ListItemText primary={sideBarItem.groupName} />
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <List component="div" disablePadding dense>
                    {
            sideBarItem.checkboxItems.map((checkboxItem) => {
              if (checkboxItem.cases === 0 && !checkboxItem.isChecked) {
                return '';
              }
              return (
                <ListItem button onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}`)} className={classes.nested}>
                  <Checkbox id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`} checked={checkboxItem.isChecked} tabIndex={-1} disableRipple color="secondary" />
                  <ListItemText primary={`${checkboxItem.name}  (${checkboxItem.cases})`} />
                </ListItem>
              );
            })
          }
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </>
          );
        }
        return '';
      })}
    </>
  );
};


const styles = () => ({
  expansionPanelSummaryRoot: {
    padding: '0 24px 0 35px',
  },
});

export default withStyles(styles)(FacetPanel);
