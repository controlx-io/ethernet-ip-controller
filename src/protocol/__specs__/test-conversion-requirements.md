## Jest to Deno Test Conversion Rules

### 1. **Test Structure Pattern**

```typescript
// ✅ Correct Deno pattern
Deno.test("Test Group Name", async (t) => {
  await t.step("Specific Test Name", () => {
    // test implementation
  });
});

// ❌ Avoid nested Deno.test()
Deno.test("Test Group", () => {
  Deno.test("Specific Test", () => {
    // This creates separate test contexts
  });
});
```

### 2. **Import Statements**

```typescript
// ✅ Convert from CommonJS to ES6
import { assertEquals, assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import * as module from "./module.ts";

// ❌ Don't use CommonJS
const { assertEquals } = require("@std/assert");
```

### 3. **Assertion Conversions**

```typescript
// Jest → Deno equivalents
expect().toBeTruthy() → assert()
expect().toBeFalsy() → assert(!condition)
expect().toEqual() → assertEquals()
expect().toThrow() → assertThrows(() => function())
expect().not.toThrow() → function() // direct call
expect().toMatchSnapshot() → assertEquals(actual, Buffer.from(expected))
```

### 4. **Type Safety**

```typescript
// ✅ Add type assertions for invalid inputs
assertThrows(() => build("invalid" as any, 5));
build(validInput); // Let TypeScript catch type errors

// ✅ Convert strings to Buffers when needed
const mr = messageRouterBuild(0x4c, Buffer.from("string"), data);
```

### 5. **Buffer Handling**

```typescript
// ✅ Consistent Buffer creation
const expected = new Uint8Array([1, 2, 3, 4]);
assertEquals(actual, Buffer.from(expected));

// ✅ Use Buffer.from() for string conversion
const path = Buffer.from("stringPath");
```

### 6. **Test Organization**

- Use descriptive test group names that match the module being tested
- Keep test names specific and action-oriented
- Group related tests under the same parent test
- Use `async (t) =>` for main tests, regular functions for steps

### 7. **Error Handling Tests**

```typescript
// ✅ Test both valid and invalid cases
await t.step("Valid cases", () => {
  build(validInput); // Should not throw
});

await t.step("Invalid cases", () => {
  assertThrows(() => build(invalidInput));
});
```

### 8. **Snapshot Conversion**

- Extract expected values from Jest snapshots
- Convert to explicit `Uint8Array` declarations
- Use `Buffer.from(expected)` for comparisons
- Document the source of expected values with comments

### 9. **Modern Patterns**

- Prefer explicit assertions over implicit ones
- Use TypeScript's compile-time checking over runtime validation where possible
- Maintain the same test coverage as the original Jest version
- Follow Deno's native testing conventions

### 10. **File Cleanup**

- Remove original `.spec.js` files after successful conversion
- Keep snapshot files for reference if needed
- Update any import paths that reference the old test files

These patterns ensure consistent, type-safe, and maintainable Deno tests that
preserve the original functionality while leveraging Deno's native testing
capabilities.
