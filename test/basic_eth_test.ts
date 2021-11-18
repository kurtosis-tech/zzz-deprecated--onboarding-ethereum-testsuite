import { EnclaveContext, ModuleID } from "kurtosis-core-api-lib";
import { KurtosisContext } from "kurtosis-engine-api-lib";
import * as log from "loglevel";
import { Result, ok, err } from "neverthrow";
import { ethers } from "ethers";
import { strict as assert } from "assert";

const ETH_MODULE_IMAGE: string = "kurtosistech/ethereum-kurtosis-module";
const ETH_MODULE_ID: ModuleID = "eth-module";

const IS_PARTITIONING_ENABLED: boolean = false;

describe("Ethereum", function() {
    describe('#basicTest', function() {
        const enclaveId: string = `basic-ethereum-test_${Date.now()}`;

        let kurtosisCtx: KurtosisContext;
        let enclaveCtx: EnclaveContext;
        before(async function() {
            const getKurtosisCtxResult: Result<KurtosisContext, Error> = KurtosisContext.newKurtosisContextFromLocalEngine();
            if (getKurtosisCtxResult.isErr()) {
                assert.fail(`Getting a Kurtosis context from the local engine threw an error: ${getKurtosisCtxResult.error}`)
            }
            kurtosisCtx = getKurtosisCtxResult.value;
            const createEnclaveResult: Result<EnclaveContext, Error> = await kurtosisCtx.createEnclave(enclaveId, IS_PARTITIONING_ENABLED)
            if (createEnclaveResult.isErr()) {
                assert.fail(`Creating enclave ${enclaveId} threw an error: ${createEnclaveResult.error}`)
            }
            enclaveCtx = createEnclaveResult.value;
        });

        it("should start the Ethereum cluster and verify it's producting blocks", async function() {
            // TODO Replace with Ethereum network setup

            // TODO Replace with block number check
        })

        before(async function() {
            if (kurtosisCtx !== undefined && enclaveCtx !== undefined) {
                const stopEnclaveResult: Result<null, Error> = await kurtosisCtx.stopEnclave(enclaveId)
                if (stopEnclaveResult.isErr()) {
                    log.error(`ACTION REQUIRED: An error occurred stopping test enclave ${enclaveId}; you'll need to clean this up manually!`)
                }
            }
        })
    })
});