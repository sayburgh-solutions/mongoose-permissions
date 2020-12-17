# mongoose-permissions

A simple rabc plugin for `mongoose` that is not over engineered.

## Development Task List
- [x] Authorization check with `can()` method.
- [x] Role management with `assignRole()` and `revokeRole()` methods.
- [x] Direct permission management with `givePermissionTo()` and `revokePermissionTo()` methods.
- [ ] Check, assign, or revoke multiple permissions in a single function call.

## Installation
Installation is as simple as any other `npm` package:

```
$ npm install mongoose-permissions
```

## Usage
You can attach the permissions plugin to your user schema and have the authorization funtionalities injected.

```js
// models/user.js

// regular mongoose stuff.
const mongoose = require('mongoose');

// require mongoose-permissions in your schema.
const permissions = require('mongoose-permissions');

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
    },
    { timestamps: true },
  ).plugin(permissions), // registering the plugin.
);

module.exports = User;
```

### Roles and Permissions
In `mongoose-permissions` permissions are king. The roles are collection of permissions for easy assignment to users. You may store them anywhere you want as long as you're following the proper structure. A role for example needs to be in the following structure:

```js

// roles.js

module.exports = [
    {
        name: "Admin",
        permissions: [
            {
                name: "create-article"
            },
            {
                name: "edit-article"
            },
            {
                name: "delete-article"
            },
            {
                name: "publish-article"
            }
        ]
    },
    {
        name: "Editor",
        permissions: [
            {
                name: "create-article"
            },
            {
                name: "edit-article"
            }
        ]
    }
]

```

You can either save the roles and permissions in your database or you may store them in a json or js file and then import them where necessary.

### Role Management
For easily assigning and revoking role from a user there are two methods. They are `assignRole()` and `revokeRole()` methods.

```js
const user = await User.findById('5fd7586ab8069d56e77e170e');

// the assignRole() method takes a complete role object as it's input.
// assigning a new role automatically replaces the old one.
user.assignRole({
        name: "Editor",
        permissions: [
            {
                name: "create-article"
            },
            {
                name: "edit-article"
            }
        ]
    });

// whereas the revokeRole() method takes the role name as an input.
// revoking a role leaves the selected user with no permissions at all.
user.revokeRole("Admin");
```

### Checking Roles
The package comes with a `hasRole()` method for checking if a user has the given permission or not.

```js
const user = await User.findById('5fd7586ab8069d56e77e170e');

// the hasRole() method takes the role name as input.
// the method returns true if the user has the role, false otherwise.
if (user.hasRole("Admin")) {
    // necessary logic goes here.
};

```

Although checking permissions is advised, you may use this method if necessary.

### Direct Permissions
In case you want to assign an extra permission to a user that doesn't exist in their role. For that purpose there are `givePermissionTo()` and `revokePermissionTo()` methods.

```js
const user = await User.findById('5fd7586ab8069d56e77e170e');

// the givePermissionTo() method takes a permission name it's input.
user.givePermissionTo("publish-article");

// the revokePermissionTo() method takes a permission name it's input as well.
user.revokePermissionTo("publish-article");
```

Direct permissions are stored separately from the role permissions so even if you change the user's role, direct permissions will remain the same.

### Checking Permissions
The package comes with a very handy `can()` method for checking permissions on a user.

```js
const user = await User.findById('5fd7586ab8069d56e77e170e');

// the can() methods takes the permission name as input.
// the method returns true if the user has the permission, false otherwise.
if (user.can("edit-articles")) {
    // article editing logic goes here.
};

```

The `can()` method checks in roles permissions as well as direct permissions.