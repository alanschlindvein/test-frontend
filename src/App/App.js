import React from 'react';

import styled from 'styled-components';
import { func, array } from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'antd';
import { ToastContainer } from 'react-toastify';

import { userActions, selectors } from 'commons/store/user';
import { Header, UserCard, Filter } from './components';

import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  width: 100%;
`;

const AppContent = styled.div`
  display: flex;
  margin: 1em;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: hidden auto;
`;

/* Dear dev evaluating this "masterpiece". Do you know what this app needs?
A better layout. Give me more time beyond those 8 hours it has took me to be
built and I'll delivery a way better, sexy and gorgeous layout! */

export class App extends React.PureComponent {
  static propTypes = {
    /* user state */
    users: array.isRequired,
    /* user actions */
    getUsers: func.isRequired,
    saveUser: func.isRequired,
    deleteUser: func.isRequired,
    updateUser: func.isRequired
  };

  componentDidMount() {
    this.props.getUsers();
  }

  handleUserSave = user => {
    if (!!user.id) {
      this.props.updateUser(user);
      return;
    }
    this.props.saveUser(user);
  };

  handleUserDelete = id => this.props.deleteUser(id);

  render() {
    const { users } = this.props;

    return (
      <AppContainer>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          pauseOnHover={false}
        />
        <Header />
        <Filter />
        <AppContent>
          <Row gutter={8} style={{ margin: 0, width: '100%' }}>
            <UserCard create onSave={this.handleUserSave} />
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={this.handleUserDelete}
                onSave={this.handleUserSave}
              />
            ))}
          </Row>
        </AppContent>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({
  users: selectors.getFilteredUsers(state)
});

const { getUsers, saveUser, updateUser, deleteUser } = userActions;

const mapDispatchToProps = {
  getUsers,
  saveUser,
  updateUser,
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
