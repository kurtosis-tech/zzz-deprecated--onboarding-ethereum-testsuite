import { EthTestsuiteConfigurator } from "./execution_impl/eth_testsuite_configurator";
import { TestSuiteExecutor } from "kurtosis-testsuite-api-lib";
import * as log from "loglevel";

const SUCCESS_EXIT_CODE: number = 0;
const FAILURE_EXIT_CODE: number = 1;

const configurator: EthTestsuiteConfigurator = new EthTestsuiteConfigurator();
const suiteExecutor: TestSuiteExecutor = new TestSuiteExecutor(configurator);
suiteExecutor.run().then(suiteExecutorResult => {
    let exitCode: number = SUCCESS_EXIT_CODE;
    if (!suiteExecutorResult.isOk()) {
        log.error("An error occurred running the test suite executor:");
        console.log(suiteExecutorResult.error);
        exitCode = FAILURE_EXIT_CODE;
    }
    process.exit(exitCode)
}).catch(reason => {
    console.log("An uncaught exception occurred running the test suite executor:");
    console.log(reason);
    process.exit(FAILURE_EXIT_CODE);
});

