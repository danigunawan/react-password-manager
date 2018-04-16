import { localStorageMock } from './setupFiles'

describe('setupFiles test', () => {
  it('should have localStorage mock', () => { 
    expect(localStorageMock).toHaveProperty('token')
    expect(localStorageMock).toHaveProperty('setItem')
    expect(localStorageMock).toHaveProperty('getItem')
    expect(localStorageMock).toHaveProperty('removeItem')
    expect(localStorageMock).toHaveProperty('clear')
    
  })
})
