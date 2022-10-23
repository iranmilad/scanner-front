import Mock from 'locmock';

Mock.onPost('/auth/login').reply(200, {
  message: 'با موفقیت وارد شدید.',
  data: {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdXNlci50c2VzaG93LmNvbVwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY2NjQwMDI5MCwiZXhwIjoxNjY2NDM2MjkwLCJuYmYiOjE2NjY0MDAyOTAsImp0aSI6IlhvSlhGT1ZFMk1Qd0VnOFgiLCJzdWIiOjgsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.biDmAdvBg805TWxp7-a8GCDVHZzzmp3aVd6CUFO8JUA',
    token_type: 'bearer',
    expires_in: 36000,
  },
  status: 'success',
});
