import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dashboard from './dashboard';
import { fetchDataForDashboardDataTable } from './dashboardState';
import { Typography } from '../../components/Wrappers/Wrappers';


class DashboardController extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataForDashboardDataTable());
  }

  render() {
    const {
      isLoading, hasError, error, widgets, isFetched, isSidebarOpened,
    } = this.props;

    if (hasError) {
      return (
        <Typography variant="headline" color="warning" size="sm">
          { error && `An error has occurred in loading stats component: ${error}`}
        </Typography>
      );
    }
    if (isLoading) {
      return <CircularProgress />;
    }
    if (isFetched) {
      return <Dashboard data={widgets} isSidebarOpened={isSidebarOpened} />;
    }
    return (
      <Typography variant="headline" color="warning" size="sm">
        { error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }
}

function mapStateToProps(state) {
  const {
    isLoading, isFetched, hasError, error, widgets,
  } = state.dashboard;

  const { isSidebarOpened } = state.layout;
  return {
    isLoading,
    hasError,
    error,
    widgets,
    isFetched,
    isSidebarOpened,
  };
}

export default connect(mapStateToProps)(DashboardController);
