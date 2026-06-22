# InvoicePro - Development Standards

# Purpose

This document defines the coding standards, architecture rules, naming conventions, Git workflow, API standards, and quality guidelines for InvoicePro.

Every contributor must follow these standards.

---

# General Principles

* Readability over clever code.
* Simplicity over complexity.
* Consistency over personal preference.
* Business logic must remain independent from frameworks.
* Every feature should be testable.
* Never duplicate business logic.

---

# Project Architecture

InvoicePro follows a Feature-Based Modular Architecture.

Each module owns its own:

* Routes
* Controllers
* Services
* Repositories
* DTOs
* Validators
* Types
* Interfaces

No global controllers or services.

---

# Folder Naming

Use lowercase.

Examples:

```
auth
users
organization
inventory
payments
```

---

# File Naming

Use camelCase.

Examples:

```
authController.ts
invoiceService.ts
userRepository.ts
createInvoiceValidator.ts
```

---

# Class Naming

Use PascalCase.

Examples:

```
UserService
InvoiceController
PaymentRepository
```

---

# Variable Naming

Use camelCase.

Good:

```
invoiceNumber
userId
organizationId
```

Avoid abbreviations.

---

# Constants

Use UPPER_SNAKE_CASE.

Examples:

```
DEFAULT_PAGE_SIZE
JWT_EXPIRES_IN
MAX_LOGIN_ATTEMPTS
```

---

# Environment Variables

Use uppercase.

Examples:

```
DATABASE_URL
JWT_SECRET
PORT
CLIENT_URL
```

Never hardcode secrets.

---

# API Standards

RESTful APIs only.

Examples:

```
GET /users
GET /users/:id

POST /users

PATCH /users/:id

DELETE /users/:id
```

Avoid verbs in endpoint names.

Good:

```
POST /invoices
```

Avoid:

```
POST /createInvoice
```

---

# Response Format

Success:

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

Failure:

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

---

# Validation

Every request must be validated using Zod.

Never trust request data.

Controllers should never perform validation.

---

# Business Logic

Business logic belongs only inside Services.

Controllers should remain thin.

Repositories should contain only database queries.

---

# Database Rules

* UUID primary keys
* Soft delete where applicable
* Transactions for financial operations
* Foreign keys for relationships
* Proper indexing
* Never expose database models directly to clients

---

# Authentication

JWT Authentication

Future Support:

* Google OAuth
* Microsoft OAuth
* Two Factor Authentication

---

# Authorization

Role Based Access Control (RBAC)

Permissions must always be verified on the server.

Never rely on frontend permissions.

---

# Error Handling

Centralized error handler.

Never expose stack traces to clients.

Meaningful error messages only.

---

# Logging

Log:

* Login
* Logout
* Invoice Creation
* Payment
* User Updates
* Security Events

Do not log passwords, tokens, or sensitive information.

---

# Security

* Helmet
* CORS
* Compression
* Rate Limiting
* Password Hashing
* SQL Injection Protection
* Input Validation
* Audit Logs

---

# Git Workflow

Branch naming:

```
feature/auth
feature/invoices
bugfix/payment
hotfix/login
```

Commit messages:

```
feat(auth): implement JWT login

fix(invoice): correct tax calculation

refactor(user): simplify repository

docs(api): update authentication documentation
```

---

# Code Reviews

Every pull request should verify:

* Business logic
* Validation
* Error handling
* Performance
* Security
* Naming consistency
* Documentation updates

---

# Testing

Every major module should include:

* Unit Tests
* Integration Tests

Critical financial operations must be tested before release.

---

# Documentation

Every module must include:

* Database design
* API documentation
* Validation rules
* Business rules
* Future considerations

---

# Performance

* Use pagination
* Avoid N+1 queries
* Select only required fields
* Use transactions where needed
* Add indexes for frequent queries

---

# Long-Term Goal

InvoicePro should remain maintainable for years, allowing multiple developers to work on the codebase without sacrificing consistency, quality, or scalability.
