import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import { expect } from 'chai';  

// Load the helloworld proto file
const PROTO_PATH = path.join(__dirname, '../../../proto/helloworld.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const helloProto = grpc.loadPackageDefinition(packageDefinition) as any;

const client = new helloProto.helloworld.Greeter('localhost:50051', grpc.credentials.createInsecure());

const sayHello = async (name: string) => {
  return new Promise<string>((resolve, reject) => {
    client.SayHello({ name: name }, (error: grpc.ServiceError | null, response: { message: string }) => {
      if (!error) {
        resolve(response.message);
      } else {
        reject(error);
      }
    });
  });
};

describe('Greeter', () => {
  it('should say hello to Alice', async () => {
    const message = await sayHello('Alice');
    expect(message).to.equal('Hello Alice');
  });

  it('should say hello without name', async () => {
    const message = await sayHello('');
    expect(message).to.equal('Hello ');
  });
});