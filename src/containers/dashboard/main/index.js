import { Grid, Paper } from '@mantine/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import ChangePassword from './changePassword';
import Information from './information';
import Notifications from './notifications';
import PrivateMessages from './privateMessages';
import PublicMessages from './publicMessages';
import Question from './question';
import Subscription from './subscription';

class Dashboard extends Component {
  state = {
    privateMessages: [],
    loading: false,
  };
  async getPrivateMessages() {
    this.setState({ loading: true });
    try {
      let response = await axios.get(
        'https://user.tseshow.com/api/notifications',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      this.setState({
        privateMessages: response.data.data,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }

    this.privateMessagesInterval = setInterval(async () => {
      this.setState({ loading: true });
      try {
        let response = await axios.get(
          'https://user.tseshow.com/api/notifications',
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
        this.setState({
          privateMessages: response.data.data,
          loading: false,
        });
      } catch (error) {
        this.setState({ loading: false });
        console.log(error);
      }
    }, 60 * 5 * 1000);
  }
  setAllMessagesToState = () => {
    this.getPrivateMessages();
  };
  separateMessages = (messages) => {
    let seen = [];
    let unseen = [];
    messages.map((item, index) => {
      if (item.seen_at === null) {
        unseen.push(item);
      } else {
        seen.push(item);
      }
    });
    return [...unseen, ...seen];
  };
  componentDidMount() {
    this.getPrivateMessages();
  }
  componentWillUnmount(){
    this.clearInterval();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>حساب کاربری</title>
        </Helmet>
        <Grid>
          <Grid.Col sm={12} md={6}>
            <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
              <Information user={this.props.user} />
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
              <Subscription subscription={this.props.subscription} />
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
              <PublicMessages messages={this.props.publicMessages} />
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
              <PrivateMessages
                setAllMessagesToState={this.setAllMessagesToState}
                loading={this.state.loading}
                messages={this.separateMessages(this.state.privateMessages)}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
              <Question />
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
              <ChangePassword />
            </Paper>
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
              <Notifications />
            </Paper>
          </Grid.Col>
        </Grid>
      </>
    );
  }
}

const maptStateToProps = (state) => ({
  user: state.config.needs.profile,
  subscription: state.config.needs.subscribes,
  publicMessages: state.config.needs.public_message,
});

export default connect(maptStateToProps)(Dashboard);
