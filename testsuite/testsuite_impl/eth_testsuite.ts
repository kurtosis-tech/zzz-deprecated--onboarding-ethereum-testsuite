import { Test } from "kurtosis-testsuite-api-lib";
import { BasicEthTest } from "./basic_eth_test/basic_eth_test";


export class EthTestsuite {
    constructor() {}

    public getTests(): Map<string, Test> {
        const tests: Map<string, Test> = new Map();
        tests.set("basicEthTest", new BasicEthTest());
        return tests;
    }
}
