const proxy = [
    {
      context:'/estoque/api',
      target: 'http://localhost:8080'
    }
  ];

  module.exports = proxy;
