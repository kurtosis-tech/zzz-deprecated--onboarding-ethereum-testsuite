import { EthTestsuite } from "../testsuite_impl/eth_testsuite";
import { TestSuite } from "kurtosis-testsuite-api-lib";
import * as log from "loglevel";
import { Result, err, ok } from "neverthrow";
import { EthTestsuiteParams } from "./eth_testsuite_params";


export class EthTestsuiteConfigurator {

    private static safeJsonParse = Result.fromThrowable(JSON.parse, EthTestsuiteConfigurator.parseUnknownExceptionValueToError);
    
    constructor () {}
    
    public setLogLevel(logLevelStr: string): Result<null, Error> {
        log.setLevel(<log.LogLevelDesc>logLevelStr);

        return ok(null);
    }

    public parseParamsAndCreateSuite(paramsJsonStr: string): Result<TestSuite, Error> {       
        const argsResult: Result<EthTestsuiteParams, Error> = EthTestsuiteConfigurator.safeJsonParse(paramsJsonStr);
        if (argsResult.isErr()) {
            return err(argsResult.error);
        }
        const args: EthTestsuiteParams = argsResult.value;
        
        const validateArgsResult: Result<null, Error> = validateArgs(args);
        if (!validateArgsResult.isOk()) {
            return err(validateArgsResult.error);
        }
        
        const suite: EthTestsuite = new EthTestsuite();
        return ok(suite);
    }

    private static parseUnknownExceptionValueToError(value: unknown): Error {
        if (value instanceof Error) {
            return value;
        }
        return new Error("Received an unknown exception value that wasn't an error: " + value);
    }
}

function validateArgs(args: EthTestsuiteParams): Result<null, Error> {
    // TODO Arg validation logic goes here
    return ok(null);
}