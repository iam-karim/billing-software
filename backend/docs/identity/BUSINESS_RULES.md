# User Business Rules

## User Identity

- Every user has one global account.
- A user can belong to multiple organizations.
- A user logs in using email.
- Username is not supported.
- Email must be unique globally.

---

## Authentication

- Passwords are never stored.
- Only password hashes are stored.
- JWT Authentication is used.
- Refresh Tokens are supported.
- Two Factor Authentication is supported.

---

## User Profile

Every user has:

- First Name
- Last Name
- Display Name
- Email
- Phone (Optional)
- Avatar (Optional)

---

## Organization Access

A user can belong to multiple organizations through Membership.

Example:

John

Owner → Company A

Manager → Company B

Accountant → Company C

---

## Soft Delete

Users are never permanently deleted.

deletedAt is used.

---

## Status

A user can be:

- Pending Verification
- Active
- Inactive
- Suspended

---

## Audit

Every important action should be logged.

Examples:

- Login
- Password Change
- Email Change
- Organization Joined
- User Invited