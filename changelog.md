# Changelog

## [0.1.2-beta] - 2025-01-04

### Added

- **Documentation**: Added comprehensive example section to README
  - Interactive example with user IP prompt
  - Demonstrates tag discovery, reading, and polling
  - Shows proper connection lifecycle management
  - Files changed: `readme.md`

- **Examples**: Added new basic usage example
  - `examples/basic.ts` - Interactive PLC connection and tag polling example
  - Demonstrates finding DINT tags and reading values with interval polling
  - Files added: `examples/basic.ts`

### Changed

- **Version**: Updated package version from `0.1.1-beta` to `0.1.2-beta`
  - Files changed: `deno.json`

## [0.1.0-beta] - 2025-01-04

### Fixed

- **Critical**: Fixed memory leak in `promiseTimeout` utility function that was
  causing process to hang after `controller.disconnect()`
  - Issue: `setTimeout` timers were not being cleared when promises resolved,
    leaving active timers in the event loop
  - Impact: Process would hang for ~40 seconds after disconnect (timeout_sp * 4)
    before exiting
  - Solution: Store timeout ID and clear it when promise resolves or rejects to
    prevent memory leak
  - Files changed: `src/utils/utilities.ts`

- **Error Handling**: Improved CIP error parsing logic for better error messages
  - Fixed error handling when no extended status codes are present
  - Simplified error message structure and reduced unnecessary processing
  - Files changed: `src/protocol/cip/errors.ts`

- **Type Safety**: Enhanced type definitions for better null handling
  - Fixed `program` parameter type in TagList service to properly handle null
    values
  - Removed unnecessary EventEmitter inheritance from ITag interface
  - Files changed: `src/services/tag-list.ts`, `src/services/tag.ts`

### Added

- **Examples**: Added new example files for common use cases
  - `examples/original/controller-manager-test.ts` - Controller manager testing
    example
  - `examples/original/getAttributeSingle.ts` - Single attribute retrieval
    example
  - `examples/original/strings.ts` - String handling example
  - Files added: Multiple example files in `examples/original/`

### Changed

- **Version**: Updated package version from `0.0.1-beta` to `0.1.0-beta`
  - Files changed: `deno.json`

- **Code Cleanup**: Removed commented code and improved documentation
  - Cleaned up `examples/original/array1k.ts` by removing commented interval
    code
  - Added process exit comment explaining the timeout fix
  - Files changed: `examples/original/array1k.ts`
