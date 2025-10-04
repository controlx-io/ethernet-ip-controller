## Package Technical Requirements

This document outlines the core technical requirements and standards for the
`@controlx-io/ts-ethernet-ip` package. Following these guidelines and rules must
be maintained to keep this package compliant with Ethernet/IP specification.

### Core Package Requirements Package

- **Explicit Message Client**: An explicit message client initiates
  request/response oriented communications with other devices. Message rates and
  latency requirements are typically not too demanding.
- **I/O Scanner**: An I/O scanner initiates implicit communications with I/O
  adapter devices. A scanner is typically the most complex type of EtherNet/IP
  device, as it must deal with issues such as configuration of which connections
  to make, and how to configure the adapter device. Scanners also typically
  support initiating explicit messages.

### Core Principles

- **Language**: All code must be written in **TypeScript**.
- **Registry**: The package is published on and consumed from **JSR**.
- **Runtimes**: It must maintain compatibility with **Deno**, **Node.js**, and
  **Bun**.
- **Dev Runtime**: It must be compatibile with **Deno**: testing and package
  management.
- **Testing**: The primary testing framework is the **Deno built-in test
  runner**.
