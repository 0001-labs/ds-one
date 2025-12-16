---
title: Table Component
description: Data table component for displaying structured information
---

The `ds-table` component provides a styled data table for displaying structured information.

## Flexible Content

Table cells can contain any content - text, components, buttons, icons, or any combination. Use `ds-button`, `ds-icon`, `ds-text`, or any other component inside table cells.

## Basic Usage

```html
<ds-table>
  <ds-table-header>
    <ds-table-cell>Name</ds-table-cell>
    <ds-table-cell>Email</ds-table-cell>
    <ds-table-cell>Role</ds-table-cell>
  </ds-table-header>
  <ds-table-row>
    <ds-table-cell>John Doe</ds-table-cell>
    <ds-table-cell>john@example.com</ds-table-cell>
    <ds-table-cell>Admin</ds-table-cell>
  </ds-table-row>
</ds-table>
```

## With Data Binding

```html
<ds-table id="userTable"></ds-table>

<script>
  const table = document.getElementById('userTable');
  table.data = [
    { name: 'John', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane', email: 'jane@example.com', role: 'User' }
  ];
  table.columns = ['name', 'email', 'role'];
</script>
```

## Attributes

| Attribute   | Type      | Default | Description                    |
| ----------- | --------- | ------- | ------------------------------ |
| `striped`   | `boolean` | `false` | Alternating row colors         |
| `hoverable` | `boolean` | `false` | Highlight rows on hover        |
| `compact`   | `boolean` | `false` | Reduced padding                |
| `bordered`  | `boolean` | `false` | Show cell borders              |

## Styling Variants

### Striped

```html
<ds-table striped>
  <!-- rows -->
</ds-table>
```

### Hoverable

```html
<ds-table hoverable>
  <!-- rows -->
</ds-table>
```

### Compact

```html
<ds-table compact>
  <!-- rows -->
</ds-table>
```

## Examples

### User List

```html
<ds-table striped hoverable>
  <ds-table-header>
    <ds-table-cell>User</ds-table-cell>
    <ds-table-cell>Status</ds-table-cell>
    <ds-table-cell>Actions</ds-table-cell>
  </ds-table-header>
  <ds-table-row>
    <ds-table-cell>John Doe</ds-table-cell>
    <ds-table-cell>Active</ds-table-cell>
    <ds-table-cell>
      <ds-button variant="text">Edit</ds-button>
    </ds-table-cell>
  </ds-table-row>
</ds-table>
```
