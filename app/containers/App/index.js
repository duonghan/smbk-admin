/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { compose } from 'redux';

// Import decode token package
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

// Import pages
import Landing from 'components/pages/Landing/Loadable';
import MyHeader from 'components/layout/MyHeader';
import MyFooter from 'components/layout/MyFooter';
import RegisterPage from 'components/auth/Register/Loadable';
import NotFoundPage from 'components/pages/NotFoundPage/Loadable';
// import AdminPage from 'modules/admin/components/DashBoardPage';

import QuestionGroup from 'components/pages/survey/QuestionGroup/Loadable';
import AdminPage from 'modules/admin/components/AdminPage/Loadable';
// import Survey from 'components/pages/survey/Survey';
import ResultPage from 'components/pages/survey/ResultPage/Loadable';
import Survey from 'containers/ResponseContainer/Loadable';
import ForgotPassword from 'components/auth/ForgotPassword/Loadable';
import ResetPassword from 'components/auth/ResetPassword/Loadable';
import Setting from 'components/pages/Setting/Loadable';
import HistoryPage from 'components/pages/UserResponseHistory/Loadable';
import HomePage from 'containers/HomePageContainer/Loadable';
import LoginPage from 'containers/Authentication/Loadable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Authentication/saga';
import reducer from 'containers/Authentication/reducer';

import PrivateRouter from './PrivateRouter';
import './styles.css';

const { Content } = Layout;

const Container = styled.div`
  margin: 15px 15px;
`;

class App extends React.Component {
  isLogged = () => Cookies.get('token');

  isAdmin = () => {
    if (Cookies.get('token')) {
      const userInfo = jwtDecode(Cookies.get('token'));
      return userInfo.role === 'ADMIN';
    }

    return false;
  };

  render() {
    return (
      <Layout>
        <MyHeader />
        <Content style={{ minHeight: window.innerHeight - 64 }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (this.isAdmin()) {
                  return <Redirect to="/admin" />;
                }
                if (this.isLogged()) {
                  return <HomePage />;
                }
                return <Landing />;
              }}
            />
            <Route
              path="/admin"
              render={() => {
                if (this.isAdmin()) {
                  return <AdminPage />;
                }
                return <Landing />;
              }}
            />
            <Container>
              <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route
                  exact
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Route path="/auth/reset-password" component={ResetPassword} />
                <PrivateRouter exact path="/test" component={QuestionGroup} />
                <PrivateRouter
                  exact
                  path="/take-survey/:name"
                  component={Survey}
                />
                <PrivateRouter exact path="/setting" component={Setting} />

                {!this.isAdmin() && (
                  <PrivateRouter
                    exact
                    path="/show-history"
                    component={HistoryPage}
                  />
                )}

                <PrivateRouter
                  exact
                  path="/survey-result"
                  component={ResultPage}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </Switch>
        </Content>
        <MyFooter />
      </Layout>
    );
  }
}

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
)(withRouter(App));
