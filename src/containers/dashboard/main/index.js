import { Grid, Paper } from '@mantine/core';
import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import lodash from 'lodash';
import { Helmet } from 'react-helmet';
import Information from './information';
import Subscription from './subscription';
import PublicMessages from './publicMessages';
import PrivateMessages from './privateMessages';
import Question from './question';
import ChangePassword from './changePassword';
import GridSystem from './gridSystem';

class Dashboard extends Component {
  state = {
    privateMessages: [],
    loading: false
  }
  async getPrivateMessages(){
    this.setState({loading: true})
    try {
      let response = await axios.get('https://user.tseshow.com/api/notifications',{
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      this.setState({
        privateMessages: response.data.data,
        loading: false
      })
    } catch (error) {
      this.setState({loading: false})
      console.log(error)
    }
  }
  setAllMessagesToState = ()=>{
    this.getPrivateMessages();
  }
  separateMessages = (messages) => {
    let seen = [];
    let unseen = [];
    messages.map((item, index) => {
      if (item.seen_at === null) {
        unseen.push(item);
      } else {
        seen.push(item);
      }
    }
    );
    return [...unseen, ...seen];
  }
  componentDidMount() {
    this.getPrivateMessages();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>حساب کاربری</title>
        </Helmet>
            <Grid >
        <Grid.Col span={2} sm={12} md={6}>
          <Paper shadow="xs" p="md" sx={{height: "100%"}}>
            <Information user={this.props.user} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={2} sm={12} md={6}>
          <Paper shadow="xs" p="md" sx={{height: "100%"}}>
            <Subscription subscription={this.props.subscription} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={2} sm={12} md={6}>
          <Paper shadow="xs" p="md" sx={{height: "100%"}}>
            <PublicMessages messages={this.props.publicMessages} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={2} sm={12} md={6}>
          <Paper shadow="xs" p="md" sx={{height: "100%"}}>
            <PrivateMessages setAllMessagesToState={this.setAllMessagesToState} loading={this.state.loading} messages={this.separateMessages(this.state.privateMessages)} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={2} sm={12} md={6}>
          <Paper shadow="xs" p="md" sx={{height: "100%"}}>
            <Question />
          </Paper>
        </Grid.Col>
        <Grid.Col span={2} sm={12} md={6}>
          <Paper shadow="xs" p="md" sx={{height: "100%"}}>
            <ChangePassword />
          </Paper>
        </Grid.Col>
        <Grid.Col span={2} sm={12} md={6}>
          <Paper shadow="xs" p="md" sx={{height: "100%"}}>
            <GridSystem />
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
  publicMessages: state.config.needs.public_message
});

export default connect(maptStateToProps)(Dashboard);
