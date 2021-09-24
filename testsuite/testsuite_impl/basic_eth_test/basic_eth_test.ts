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
        log.info("Setting up Ethereum network...")
        const loadEthLambdaResult: Result<LambdaContext, Error> = await networkCtx.loadLambda(ETH_LAMBDA_ID, ETH_LAMBDA_IMAGE, "{}");
        if (loadEthLambdaResult.isErr()) {
            return err(loadEthLambdaResult.error);
        }
        const ethLambdaCtx: LambdaContext = loadEthLambdaResult.value;
        
        const executeEthLambdaResult: Result<string, Error> = await ethLambdaCtx.execute("{}")
        if (executeEthLambdaResult.isErr()) {
            return err(executeEthLambdaResult.error);
        }
        this.executeEthLambdaResultObj = JSON.parse(executeEthLambdaResult.value);
        log.info("Ethereum network set up successfully");
        

        return ok(networkCtx)
    }

    public async run(network: Network): Promise<Result<null, Error>> {
        const networkCtx: NetworkContext = <NetworkContext>network;

        // TODO Replace with block number check
        log.info("Verifying block number is increasing...");
        const bootnodeServiceId: ServiceID = this.executeEthLambdaResultObj.bootnode_service_id;
        const bootnodeIp: string = this.executeEthLambdaResultObj.node_info[bootnodeServiceId].ip_addr_inside_network
        const bootnodeRpcProvider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(`http://${bootnodeIp}:8545`);
        const blockNumber: number = await bootnodeRpcProvider.getBlockNumber();
        if (blockNumber === 0) {
            return err(new Error(""))
        }
        log.info("Verified that block number is increasing");

        return ok(null);
    }
}