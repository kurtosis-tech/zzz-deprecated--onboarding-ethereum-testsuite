import { Network, NetworkContext, LambdaContext, LambdaID, ServiceID, ContainerCreationConfig, ContainerCreationConfigBuilder, ContainerRunConfig, StaticFileID, ContainerRunConfigBuilder, ServiceContext, PortBinding } from "kurtosis-core-api-lib";
import { TestConfigurationBuilder } from "kurtosis-testsuite-api-lib";
import * as log from "loglevel";
import { Result, ok, err } from "neverthrow";
import { ethers } from "ethers";

const ETH_LAMBDA_IMAGE: string = "kurtosistech/ethereum-kurtosis-lambda:0.2.3";
const ETH_LAMBDA_ID: LambdaID = "eth-lambda";

export class BasicEthTest {
    private executeEthLambdaResultObj: any;

    constructor() {}

    public configure(builder: TestConfigurationBuilder) {
        builder.withSetupTimeoutSeconds(60).withRunTimeoutSeconds(60);
    }

    // Set up an Ethereum network using the Lambda
    public async setup(networkCtx: NetworkContext): Promise<Result<Network, Error>> {

        // TODO Replace with Ethereum network setup

        return ok(networkCtx)
    }

    public async run(network: Network): Promise<Result<null, Error>> {
        const networkCtx: NetworkContext = <NetworkContext>network;

        // TODO Replace with block number check

        return ok(null);
    }
}