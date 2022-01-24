const proxy = [
    {
      context: '/auth',
      target: 'http://localhost:8080'
    },
    {
      context: '/usuario',
      target: 'http://localhost:8080'
    },
    {
      context: '/equipamento',
      target: 'http://localhost:8080'
    }
  ];

  module.exports = proxy;
