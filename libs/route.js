FlowRouter.route('/', {
   name: 'homePage',
    action() {
        BlazeLayout.render('MainLayout', {main: 'homePage'});
    }
});

FlowRouter.route('/admin', {
   name: 'adminHome',
    action() {
        BlazeLayout.render('desktopLayout', {main: 'adminHome'});
    }
});
