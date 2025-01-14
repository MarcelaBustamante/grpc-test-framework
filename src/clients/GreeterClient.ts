import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

//Load the hello.proto file
const PROTO_PATH = path.resolve(__dirname, '../../proto/helloworld.proto');

//Load the package definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

//Load the package definition
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld as any;

export class GreeterClient {
    private client: any;

    constructor() {
        this.client = new helloProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
    }

    public sayHello(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.client.sayHello({ name }, (err: any, response: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response.message);
                }
            });
        });
    }
}