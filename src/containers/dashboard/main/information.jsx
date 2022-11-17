import { Component } from 'react';
import { Badge ,Stack, Text} from '@mantine/core';

class Information extends Component {
  render() {
    return (
        <Stack>
          <Text size='lg' weight="bold">مشخصات حساب کاربری</Text>
          <Badge radius="xs" color="indigo" p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            نام :{this.props.user.firstname || ''}
          </Badge>
          <Badge radius="xs" color="indigo" p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            نام خانوادگی :{this.props.user.last_name || ''}
          </Badge>
          <Badge radius="xs" color="indigo" p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            شماره تلفن :{this.props.user.mobile || ''}
          </Badge>
          <Badge radius="xs" color={this.props.user.active ? 'indigo' : 'orange'} p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            وضعیت حساب :{this.props.user.active ? 'فعال' : 'غیر فعال'}
          </Badge>
          <Badge radius="xs" color={this.props.user.special ? 'indigo' : 'orange'} p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            اشتراک ویژه :{this.props.user.special ? 'بله' : 'خیر'}
          </Badge>
          {this.props.user.special && (
            <>
            <Badge radius="xs" color="indigo" p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            اعتبار اشتراک:{this.props.user.special_date || ''}
            </Badge>
            <Badge radius="xs" color="indigo" p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            نوع اعتبار : {this.props.user.special_name || ''}
            </Badge>
            </>
          )}
          <Badge radius="xs" color="indigo" p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}}>
            ساخته شده در :{this.props.user.created_at || ''}
          </Badge>
        </Stack>
    );
  }
}

export default Information;
