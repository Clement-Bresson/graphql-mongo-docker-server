// import our production apollo-server instance
const { server } = require('../../server');
const gql = require('graphql-tag');

const { startTestServer, toPromise } = require('../__utils');

const GET_USERS = gql`
  query getUsers {
    users {
      _id
      email
      name
      age
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $age: Int!) {
    createUser(user: { name: $name, email: $email, age: $age }) {
      _id
      name
      email
      age
    }
  }
`;

describe('Acceptance - Users', () => {
  let stop, graphql;

  beforeEach(async () => {
    const testServer = await startTestServer(server);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(() => stop());

  describe('CREATE/UPDATE/DELETE a User', () => {
    const newUser = {
      name: 'Tom Sawyer',
      email: 'tom.sawyer@gmail.com',
      age: 12
    };
    it('1 - Get initial list of users', async () => {
      const getUsersResponse = await toPromise(
        graphql({
          query: GET_USERS
        })
      );
      expect(getUsersResponse).toEqual({ data: { users: [] } });
    });
    it('2 - Creates a user', async () => {
      const createUserResponse = await toPromise(
        graphql({
          query: CREATE_USER,
          variables: newUser
        })
      );
      expect(createUserResponse).toEqual({
        data: {
          createUser: {
            _id: expect.stringMatching(/^[a-zA-Z0-9]*$/),
            ...newUser
          }
        }
      });
    });
    it('3 - Checks new user is in users list', async () => {
      const getUsersResponse = await toPromise(
        graphql({
          query: GET_USERS
        })
      );
      expect(getUsersResponse).toEqual({
        data: {
          users: [
            {
              _id: expect.stringMatching(/^[a-zA-Z0-9]*$/),
              ...newUser
            }
          ]
        }
      });
    });
  });
});
