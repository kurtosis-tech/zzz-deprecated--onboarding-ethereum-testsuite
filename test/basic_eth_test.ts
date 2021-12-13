import { EnclaveContext, ModuleContext, ModuleID, ServiceID } from "kurtosis-core-api-lib";
import { KurtosisContext } from "kurtosis-engine-api-lib";
import * as log from "loglevel";
import { Result, ok, err } from "neverthrow";
import { ethers } from "ethers";
import { strict as assert } from "assert";

const TEST_NAME = "basic-ethereum-test"
const ETH_MODULE_IMAGE: string = "kurtosistech/ethereum-kurtosis-module";
const ETH_MODULE_ID: ModuleID = "eth-module";

const IS_PARTITIONING_ENABLED: boolean = false;

describe("Ethereum", function() {
    describe('#basicTest', function() {
        it("should start the Ethereum cluster and verify it's producting blocks", async function() {
            // --------------------------------- SETUP ENCLAVE ------------------------------------
            const getKurtosisCtxResult: Result<KurtosisContext, Error> = await KurtosisContext.newKurtosisContextFromLocalEngine();
            if (getKurtosisCtxResult.isErr()) {
                assert.fail(`Getting a Kurtosis context from the local engine threw an error: ${getKurtosisCtxResult.error}`)
            }
            const kurtosisCtx = getKurtosisCtxResult.value;

            const enclaveId = `${TEST_NAME}_${Date.now()}`;
            const createEnclaveResult: Result<EnclaveContext, Error> = await kurtosisCtx.createEnclave(enclaveId, IS_PARTITIONING_ENABLED)
            if (createEnclaveResult.isErr()) {
                assert.fail(`Creating enclave ${enclaveId} threw an error: ${createEnclaveResult.error}`)
            }
            const enclaveCtx = createEnclaveResult.value;

            try {
                // --------------------------------- SETUP TEST ------------------------------------

                // TODO Replace with Ethereum network setup

                // --------------------------------- RUN TEST ------------------------------------
                
                // TODO Replace with block number check

            } finally {
                // --------------------------------- TEARDOWN ENCLAVE ------------------------------------
                const stopEnclaveResult: Result<null, Error> = await kurtosisCtx.stopEnclave(enclaveId)
                if (stopEnclaveResult.isErr()) {
                    log.error(`ACTION REQUIRED: An error occurred stopping test enclave ${enclaveId}; you'll need to clean this up manually!`)
                }
            }
            
        })
    })
});