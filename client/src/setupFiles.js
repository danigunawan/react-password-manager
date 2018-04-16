export const localStorageMock = {
  setItem: (token, newToken) => this.token = newToken ,
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  token: 'adasd'
}

global.localStorage = localStorageMock;
