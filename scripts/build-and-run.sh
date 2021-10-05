set -euo pipefail
script_dirpath="$(cd "$(dirname "${0}")" && pwd)"
root_dirpath="$(dirname "${script_dirpath}")"
kurtosis_core_dirpath="${root_dirpath}/.kurtosis"

show_help_and_exit() {
    echo ""
    echo "Usage: $(basename "${0}") action [kurtosis_cli_arg1] [kurtosis_cli_arg2]..."
    echo ""
    echo "  action              The action that should be passed to the underlying build-and-run-core.sh script to tell it which action should be taken (call"
    echo "                          'bash ${kurtosis_core_dirpath}/build-and-run-core.sh help' directly for all available actions)"
    echo "  kurtosis_cli_arg    Optional, supplemental args that should be passed to the Kurtosis CLI to modify testsuite execution behaviour (call"
    echo "                          'kurtosis test --help' directly for all available args)"
    echo ""
    exit 1  # Exit with error so CI will fail if it accidentally calls this
}

if [ "${#}" -eq 0 ]; then
    show_help_and_exit
fi
action="${1:-}"
shift 1
if [ "${action}" == "help" ]; then
    show_help_and_exit
fi

# >>>>>>>> Add custom testsuite parameters here <<<<<<<<<<<<<
custom_params_json='{
}'
# >>>>>>>> Add custom testsuite parameters here <<<<<<<<<<<<<

bash "${kurtosis_core_dirpath}/build-and-run-core.sh" \
    "${action}" \
    "ethereum-testsuite" \
    "${root_dirpath}" \
    "${root_dirpath}/testsuite/Dockerfile" \
    --custom-params "${custom_params_json}" \
    ${1+"${@}"}
