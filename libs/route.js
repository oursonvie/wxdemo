FlowRouter.route('/', {
   name: 'homePage',
    action() {
        BlazeLayout.render('MainLayout', {main: 'homePage'});
    }
});
