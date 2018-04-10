
const localStorageMock = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
  token: 'adasd'
}
global.localStorage = localStorageMock;
