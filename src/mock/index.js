import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import feeder from './feeders.json';
import { pathToRegexp } from 'path-to-regexp';
import config from './config.json';

function MockRunner() {
  let mock = new MockAdapter(axios);

  mock.onGet('/home/data').reply(200, config);

  mock.onPost('/auth/login').reply(200, {
    message: 'با موفقیت وارد شدید.',
    data: {
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdXNlci50c2VzaG93LmNvbVwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY2NjQwMDI5MCwiZXhwIjoxNjY2NDM2MjkwLCJuYmYiOjE2NjY0MDAyOTAsImp0aSI6IlhvSlhGT1ZFMk1Qd0VnOFgiLCJzdWIiOjgsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.biDmAdvBg805TWxp7-a8GCDVHZzzmp3aVd6CUFO8JUA',
      token_type: 'bearer',
      expires_in: 36000,
    },
    status: 'success',
  });

  mock.onGet('/auth/logout').reply(200, {
    message: 'با موفقیت خارج شدید.',
    data: null,
    status: 'success',
  });

  mock.onGet('/notifications').reply(200, {
    message: '',
    data: [
      {
        id: 39,
        title: 'THUNDERBIRD',
        text: 'a supernational power',
        type: 'private',
        seen_at: null,
        created_at: '1401/08/05',
      },
      {
        id: 40,
        title: 'Ace',
        text: 'small cards',
        type: 'private',
        seen_at: null,
        created_at: '1401/08/05',
      },
      {
        id: 41,
        title: 'Kapkan',
        text: 'a best player of that team',
        type: 'private',
        seen_at: null,
        created_at: '1401/08/05',
      },
      {
        id: 42,
        title: 'Blackbeard',
        text: 'bake a cake for your girlfriend',
        type: 'private',
        seen_at: null,
        created_at: '1401/08/05',
      },
    ],
    status: 'success',
  });

  let notificationsSeenAddr = '/notifications/seen/:id';
  mock.onPut(pathToRegexp(notificationsSeenAddr)).reply(200, {
    status: 'OK',
  });

  mock.onPut('/user/change-password').reply(function (config) {
    /**
     * result of validate
     */
    let fields = JSON.parse(config.data);
    if (
      fields.current_password !== '' &&
      fields.password !== '' &&
      fields.password_confirmation !== ''
    ) {
      return [
        200,
        {
          message: 'رمز عبور شما با موفقیت تغییر یافت.',
          data: null,
          status: 'success',
        },
      ];
    } else {
      return [
        200,
        {
          message: 'مقادیر وارد شده را بررسی کنید',
          data: null,
          status: 'success',
        },
      ];
    }
  });

  mock.onPost('/question').reply(200, {
    message: 'پرسش شما با موفقیت ثبت گردید. در اولین فرست پاسخ داده خواهد شد.',
    data: null,
    status: 'success',
  });

  mock.onGet('/user/member-lists').reply(function (config) {
    if (config.headers.Authorization !== '') {
      return [
        200,
        {
          message: null,
          data: [
            {
              id: 39,
              user_id: '8',
              member_list_id: '7',
              title: 'S44891482026867833',
              description: 'support_SMA_200',
              created_at: '1401/08/22',
            },
            {
              id: 40,
              user_id: '8',
              member_list_id: '8',
              title: 'S44891482026867833',
              description: 'support_SMA_5',
              created_at: '1401/08/22',
            },
            {
              id: 41,
              user_id: '8',
              member_list_id: '9',
              title: 'S44891482026867833',
              description: 'resistant_SMA_200',
              created_at: '1401/08/22',
            },
          ],
          status: 'success',
        },
      ];
    } else {
      return [
        200,
        {
          message: null,
          data: [],
          status: 'success',
        },
      ];
    }
  });

  mock.onGet('/member-lists').reply(200, {
    message: [
      {
        id: 1,
        title: 'S35366681030756042',
        description: 'support_SMA_5',
        active: true,
      },
      {
        id: 3,
        title: 'S35425587644337450',
        description: 'support_SMA_200',
        active: false,
      },
      {
        id: 4,
        title: 'S408934423224097',
        description: 'support_SMA_200',
        active: true,
      },
      {
        id: 5,
        title: 'S35366681030756042',
        description: 'resistant_SMA_200',
        active: true,
      },
      {
        id: 6,
        title: 'S35366681030756042',
        description: 'support_SMA_200',
        active: true,
      },
      {
        id: 7,
        title: 'S44891482026867833',
        description: 'support_SMA_200',
        active: true,
      },
      {
        id: 8,
        title: 'S44891482026867833',
        description: 'support_SMA_5',
        active: true,
      },
      {
        id: 9,
        title: 'S44891482026867833',
        description: 'resistant_SMA_200',
        active: true,
      },
    ],
    data: null,
    status: 'success',
  });

  mock.onPost('/user/member-lists/create').reply(function (config) {
    // console.log(JSON.parse(config.data).length)
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (Math.random() > 0.1) {
          resolve([200, { id: 4, name: 'foo' }]);
        } else {
          // reject() reason will be passed as-is.
          // Use HTTP error status code to simulate server failure.
          resolve([500, { success: false }]);
        }
      }, 1000);
    });
  });

  mock.onPost('/user/member-lists/delete').reply(function (config) {
    return new Promise(function(resolve,reject){
      setTimeout(() => {
        return [200, { message: 'ok' }];
      }, 1000);
    })
  });

  let feeds = feeder.item;
  /**
   * @type {array}
   */
  let items = feeds.find((item) => item.name === 'data').item;

  items.map((item) => {
    if ('item' in item) {
      item.item.map((children) => {
        if (children.response.length > 0) {
          let url = children.request.url.raw.replace(
            children.request.url.host[0],
            ''
          );
          url = `/api${url}`;
          url = pathToRegexp(url);
          mock[
            (() => {
              switch (children.request.method) {
                case 'GET' || 'get':
                  return 'onGet';
                case 'POST' || 'post':
                  return 'onPost';
                case 'PUT' || 'put':
                  return 'onPut';
                case 'PATCH' || 'patch':
                  return 'onPatch';
                case 'DELETE' || 'delete':
                  return 'onDelete';
                default:
                  return 'onAny';
              }
            })()
          ](url).reply(200, JSON.parse(children.response[0]?.body));
        }
        return children;
      });
    } else {
      if (item.response.length > 0) {
        let url = item.request.url.raw.replace(item.request.url.host[0], '');
        url = `/api${url}`;
        url = pathToRegexp(url);
        mock[
          (() => {
            switch (item.request.method) {
              case 'GET' || 'get':
                return 'onGet';
              case 'POST' || 'post':
                return 'onPost';
              case 'PUT' || 'put':
                return 'onPut';
              case 'PATCH' || 'patch':
                return 'onPatch';
              case 'DELETE' || 'delete':
                return 'onDelete';
              default:
                return 'onAny';
            }
          })()
        ](url).reply(item.response[0].code, JSON.parse(item.response[0]?.body));
      }
    }
    return item;
  });
}

export default MockRunner;
