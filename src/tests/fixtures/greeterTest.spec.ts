import { GreeterClient } from '../../clients/GreeterClient';
import { expect } from 'chai';

describe('Greeter Service', () => {
  let greeterClient: GreeterClient;

  before(() => {
    greeterClient = new GreeterClient();
  });

  it('should say hello to Alice', async () => {
    const message = await greeterClient.sayHello('Alice');
    expect(message).to.equal('Hello Alice');
  });

  it('should say hello without name', async () => {
    const message = await greeterClient.sayHello('');
    expect(message).to.equal('Hello ');
  });
});