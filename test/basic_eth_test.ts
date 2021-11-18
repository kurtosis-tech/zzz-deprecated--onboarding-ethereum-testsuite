import { Network, NetworkContext, ModuleContext, ModuleID, ServiceID,  ServiceContext, PortBinding } from "kurtosis-core-api-lib";
import { TestConfigurationBuilder } from "kurtosis-testsuite-api-lib";
import * as log from "loglevel";
import { Result, ok, err } from "neverthrow";
import { ethers } from "ethers";

const ETH_MODULE_IMAGE: string = "kurtosistech/ethereum-kurtosis-module";
const ETH_MODULE_ID: ModuleID = "eth-module";

export class BasicEthTest {
    private executeEthModuleResultObj: any;

    constructor() {}

    public configure(builder: TestConfigurationBuilder) {
        builder.withSetupTimeoutSeconds(60).withRunTimeoutSeconds(60);
    }

    // Set up an Ethereum network using the module
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