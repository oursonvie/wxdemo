FlowRouter.route('/admin', {
   name: 'adminHome',
    action() {
        BlazeLayout.render('desktopLayout', {main: 'adminHome'});
    }
});

FlowRouter.route('/customerServiceManagement', {
   name: 'customerServiceManagement',
    action() {
        BlazeLayout.render('desktopLayout', {main: 'customerServiceManagement'});
    }
});

FlowRouter.route('/studentServiceManagement', {
   name: 'studentServiceManagement',
    action() {
        BlazeLayout.render('desktopLayout', {main: 'studentServiceManagement'});
    }
});
