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
import { getEveryUser } from '../../../apis/main';
import { withCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';

// class Dashboard extends Component {
//   state = {
//     privateMessages: [],
//     loading: false,
//   };
//   async getPrivateMessages() {
//     this.setState({ loading: true });

//     try {
//       let response = await getEveryUser('/notifications', {
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${Cookies.get('token')}`,
//         },
//       });
//       this.setState({
//         privateMessages: response.data.data,
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({ loading: false });
//       console.log(error);
//     }
//   }


//   componentWillUnmount() {
//     console.log(this);
//     this.clearInterval();
//   }
//   render() {
//     return (
//       <>
//         <Helmet>
//           <title>حساب کاربری</title>
//         </Helmet>
//         <Grid>
//           <Grid.Col sm={12} md={6}>
//             <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
//               <Information user={this.props.user} />
//             </Paper>
//           </Grid.Col>
//           <Grid.Col sm={12} md={6}>
//             <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
//               <Subscription subscription={this.props.subscription} />
//             </Paper>
//           </Grid.Col>
//           <Grid.Col sm={12} md={6}>
//             <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
//               <PublicMessages messages={this.props.publicMessages} />
//             </Paper>
//           </Grid.Col>
//           <Grid.Col sm={12} md={6}>
//             <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
//               <PrivateMessages
//                 setAllMessagesToState={this.setAllMessagesToState}
//                 loading={this.state.loading}
//                 messages={this.separateMessages(this.state.privateMessages)}
//               />
//             </Paper>
//           </Grid.Col>
//           <Grid.Col sm={12} md={6}>
//             <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
//               <Question />
//             </Paper>
//           </Grid.Col>
//           <Grid.Col sm={12} md={6}>
//             <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
//               <ChangePassword />
//             </Paper>
//           </Grid.Col>
//           <Grid.Col sm={12} md={6}>
//             <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
//               <Notifications />
//             </Paper>
//           </Grid.Col>
//         </Grid>
//       </>
//     );
//   }
// }

const Dashboard = (props) => {
  const separateMessages = (messages) => {
    let seen = [];
    let unseen = [];
    if(messages.lenght === 0) return [];
    messages.map((item, index) => {
      if (item.seen_at === null) {
        unseen.push(item);
      } else {
        seen.push(item);
      }
    });
    return [...unseen, ...seen];
  };

  const {isLoading,data} = useQuery({
    queryKey: 'getPrivateMessages',
    queryFn: () => getEveryUser('/notifications', {
      token: true
    }),
  });


  return (
    <>
    <Helmet>
      <title>حساب کاربری</title>
    </Helmet>
    <Grid>
      <Grid.Col sm={12} md={6}>
        <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
          <Information user={props.user} />
        </Paper>
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
          <Subscription subscription={props.subscription} />
        </Paper>
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
          <PublicMessages messages={props.publicMessages} />
        </Paper>
      </Grid.Col>
      <Grid.Col sm={12} md={6}>
        <Paper shadow="xs" p="md" sx={{ height: '100%' }}>
          <PrivateMessages
            loading={isLoading}
            messages={isLoading ? [] : separateMessages(data.data.data)}
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
  )
}

const maptStateToProps = (state) => ({
  user: state.config.needs.profile,
  subscription: state.config.needs.subscribes,
  publicMessages: state.config.needs.public_message,
});

export default withCookies(connect(maptStateToProps)(Dashboard));
