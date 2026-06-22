# Identity Module ERD

## Purpose

The Identity module is responsible for authentication, authorization, organizations, branches, users, memberships, roles, and permissions.

It is the foundation of the InvoicePro platform.

---

## Modules

- User
- Organization
- Branch
- Membership
- Role
- Permission
- RolePermission
- Invitation
- Session
- RefreshToken
- EmailVerification
- PasswordReset
- AuditLog

---

## Relationship Overview

User
│
├── Membership
│       │
│       ├── Organization
│       ├── Branch
│       └── Role
│
├── Session
├── RefreshToken
├── PasswordReset
└── EmailVerification

Role
│
└── RolePermission
        │
        └── Permission