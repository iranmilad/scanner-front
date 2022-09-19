import {
  Center,
  Box,
  Grid,
  Card,
  Button,
  Text,
  Alert,
  Stack,
  Badge,
} from '@mantine/core';
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

class Subscription extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.setState({
      userAuthed: cookies.get('token') ? true : false,
    });
    this.state = {
      userAuthed: cookies.get('token') ? true : false,
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    this.setState({
      userAuthed: cookies.get('token') ? true : false,
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>تهیه اشتراک ویژه</title>
        </Helmet>
        <Box p="lg" sx={{ background: '#f5f5f5' }}>
          <Center>
            <Text size="lg" weight="bold">
              تهیه اشتراک ویژه
            </Text>
          </Center>
        </Box>
        <Grid>
          {this.props.subscription.map((item, id) => (
            <Grid.Col key={id} sm={12} md={6} lg={3}>
              <Card
                sx={{
                  height: '100%',
                }}
                shadow="md"
                className="space-y-7"
              >
                <Center>
                  <Text size="md">{item.title}</Text>
                </Center>
                <Center>
                  <Badge color="cyan" size="lg">
                    {item.time}
                    روزه
                  </Badge>
                </Center>
                <Center>
                  <Badge color="indigo" size="lg">
                    {item.price_discount !== '' ? (
                      <s>قیمت :{item.price}</s>
                    ) : (
                      <>قیمت : {item.price}</>
                    )}
                  </Badge>
                </Center>
                {id !== 0 && (
                  <Center>
                    <Badge color="pink">
                      قیمت هر ماه :{item.price_monthly}
                    </Badge>
                  </Center>
                )}
                {item.price_discount && (
                  <Center>
                    <Badge color="orange" size="lg" mb="lg">
                      قیمت با تخفیف :{item.price_discount}
                    </Badge>
                  </Center>
                )}
                <a
                  target={this.state.userAuthed ? "_blank" : "_self"}
                  href={this.state.userAuthed ? item.payment_link : '/login'}
                  className="w-full"
                >
                  <Button
                    size="sm"
                    fullWidth
                    sx={{ marginTop: id === 0 ? '122px' : '' }}
                  >
                    خرید
                  </Button>
                </a>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        <Alert
          variant="filled"
          mt="md"
          color="green"
          title="توجه داشته باشید که پس از پرداخت حتما گزینه برگشت به سایت پذیرنده را بزنید تا پرداخت شما نهایی شده و اشتراک شما فعال شود."
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  subscription: state.config.needs.plans,
});

export default withCookies(connect(mapStateToProps)(Subscription));
