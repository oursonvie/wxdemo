if ( Meteor.users.find().count() === 0 ) {

    let id = Accounts.createUser({
        email: 'oursonvie@qq.com',
        password: 'hacker'
    });
    Roles.addUsersToRoles(id, ['admin', 'superadmin'])

}
