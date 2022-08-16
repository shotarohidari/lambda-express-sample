import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
export class LambdaExpressSandboxStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const lambda = new NodejsFunction(this,"express-sample-handler", {
      entry: `${__dirname}/../src/handler.ts`
    });
    
    const api = new RestApi(this,"expressApi", {
      deployOptions: {
        stageName: "dev",
        metricsEnabled: true,
      }
    });

    api.root.addProxy({defaultIntegration: new LambdaIntegration(lambda)});
  }
}
