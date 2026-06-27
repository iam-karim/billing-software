# Product Glossary

> Version: 1.0.0
>
> Status: Draft
>
> Owner: Infoogle Software Solutions LLP
>
> Product: InvoicePro
>
> Last Updated: 25 June 2026

---

# Purpose

The Product Glossary defines the official business terminology used throughout the InvoicePro platform.

Its purpose is to ensure that all business, product, architecture, engineering, testing, and operational documentation uses consistent language.

This document serves as the single source of truth for product terminology.

---

# Scope

The glossary applies to:

- Business Documents
- Product Documents
- Architecture Documents
- API Documentation
- Database Design
- Frontend Development
- Backend Development
- Testing Documentation
- User Documentation

---

# Glossary

---

## Account

The authentication identity used to access InvoicePro.

An account may belong to one or more organizations through memberships.

---

## Audit Log

A permanent record of significant actions performed within the platform.

Examples include:

- User Login
- Invoice Creation
- Payment Recorded
- Permission Changes

---

## Branch

A physical or logical business location belonging to an organization.

Future capability.

---

## Contact

A person associated with a customer or supplier.

A customer may have multiple contacts.

---

## Customer

A person or organization that purchases goods or services from an organization.

Customers are referenced by:

- Quotations
- Invoices
- Payments

---

## Dashboard

The primary landing page presented after successful authentication.

Provides business insights and quick access to common actions.

---

## Expense

A business cost recorded by an organization.

Future capability.

---

## Invoice

A commercial document requesting payment for goods or services.

Invoice lifecycle:

- Draft
- Sent
- Partially Paid
- Paid
- Cancelled

---

## Invoice Item

An individual line item within an invoice.

Represents a product or service being billed.

---

## Membership

Represents a user's relationship with an organization.

A membership determines:

- Role
- Permissions
- Access Scope

---

## Notification

A system-generated message informing users about significant events.

Notifications may be delivered through:

- In-App
- Email
- Push (Future)

---

## Organization

A business entity using InvoicePro.

Organizations own all tenant-specific resources.

---

## Payment

A financial transaction associated with one or more invoices.

Payments may be:

- Full
- Partial
- Refunded

---

## Permission

A specific action that a user is allowed to perform.

Examples:

- invoice.read
- invoice.create
- customer.update

Permissions are assigned through roles.

---

## Product

A good or service offered by an organization.

Products may be reused across quotations and invoices.

---

## Quotation

A commercial proposal sent to a customer before an invoice is created.

A quotation may later be converted into an invoice.

---

## Resource

A business entity exposed through the REST API.

Examples:

- Customers
- Products
- Invoices
- Payments

---

## Role

A collection of permissions assigned to memberships.

Examples:

- Owner
- Administrator
- Manager
- Staff

---

## Session

A user's authenticated login instance.

Each device maintains an independent session.

---

## Subscription

Represents an organization's billing plan and associated platform entitlements.

Examples:

- Free
- Starter
- Professional
- Enterprise

---

## Supplier

A business or individual that provides goods or services to an organization.

Future capability.

---

## Tenant

A logical isolation boundary representing a single organization.

Tenant isolation ensures that organizations cannot access each other's data.

---

## User

A person with an InvoicePro account.

A user may belong to multiple organizations through memberships.

---

## Workspace

A user's active operating context within a selected organization.

Changing the active workspace changes the organization context for subsequent operations.

---

# Terminology Rules

The following rules apply across all documentation:

- Use "Organization" instead of "Company".
- Use "User" instead of "Employee" unless referring specifically to employment.
- Use "Customer" instead of "Client".
- Use "Membership" for the relationship between a user and an organization.
- Use "Tenant" only in technical documentation.
- Use "Workspace" only when referring to the active organization context in the user interface.

---

# Reserved Terms

The following terms should not be used interchangeably:

| Preferred | Avoid |
|------------|-------|
| Organization | Company |
| User | Employee |
| Customer | Client |
| Invoice | Bill |
| Membership | Association |
| Permission | Access Right |
| Workspace | Account |

---

# Future Terms

The following terms will be formally defined when introduced into the platform:

- Inventory
- Warehouse
- Purchase Order
- Sales Order
- Credit Note
- Debit Note
- Tax Profile
- Cost Center
- Project
- AI Assistant

---

# Ownership

The Product Glossary is owned by the Product Team.

Changes must be reviewed before adoption to ensure terminology remains consistent across all documentation and implementation.

---

# Revision History

| Version | Date | Author | Changes |
|----------|------|--------|---------|
| 1.0.0 | 25 June 2026 | Infoogle Software Solutions LLP | Initial Draft |