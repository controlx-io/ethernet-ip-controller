## Contribution Guide

### Development Environment

To contribute, you'll need the following on your local machine:

- **Deno**: Version `v2.5.2` or later.
- **Git**: For version control.

After cloning the repository, you don't need to install dependencies manually.
Deno will fetch them on the first run of any task.

### Code Quality & Style

We use Deno's built-in tooling to maintain code quality. Before committing,
please run these commands:

- **Formatting**: Ensure consistent code style with `deno fmt`. All submitted
  code must be formatted.
- **Linting**: Catch common issues and enforce best practices with `deno lint`.
  The code must pass all linting rules.
- **Type Checking**: Verify type correctness across the project with
  `deno check`. The code must be free of type errors.

### Testing

All new features must include comprehensive tests, and bug fixes must include a
regression test.

- **Run All Tests**: Execute the entire test suite using
  `deno test --allow-all`.
- **Coverage**: Strive for high test coverage. You can check this by running
  `deno test --coverage`.
- **Cross-Runtime CI**: Pull requests will automatically trigger a Continuous
  Integration (CI) pipeline (e.g., using GitHub Actions) that tests the code
  against all supported runtimes (Deno, Node, Bun) to ensure compatibility.

### Documentation

Clear documentation is crucial for usability and maintenance.

- **API Documentation**: All exported functions, classes, and types **must have
  JSDoc comments**. JSR uses these to automatically generate the package's
  documentation pages.
- **README.md**: The README should be kept up-to-date with installation
  instructions, clear usage examples, and a link to the full API documentation
  on JSR.

### Commits & Versioning

- **Commit Messages**: Commits must follow the **Conventional Commits**
  specification. This helps in automating changelog generation and determining
  version bumps.
  - Examples: `feat: add support for XYZ`,
    `fix: correct buffer overflow in parser`, `docs: update usage examples`.
- **Versioning**: The package adheres to **Semantic Versioning (SemVer)**.
  Versioning will be managed by maintainers based on the nature of the commits
  merged.

### Governance

- **License**: The project is licensed under the **MIT License** (or your chosen
  license). All contributions are accepted under this license.
- **Code of Conduct**: This project has a `CODE_OF_CONDUCT.md` that all
  contributors are expected to follow.
