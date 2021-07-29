export default process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://snippet-manager-noder-server.herokuapp.com/';
