FlowRouter.route('/', {
   name: 'homePage',
    action() {
        BlazeLayout.render('MainLayout', {main: 'homePage'});
    }
});



FlowRouter.route('/student/viewscore', {
   name: 'viewScore',
    action() {
        BlazeLayout.render('MainLayout', {main: 'viewScore'});
    }
});

FlowRouter.route('/student/viewbill', {
   name: 'viewBill',
    action() {
        BlazeLayout.render('MainLayout', {main: 'viewBill'});
    }
});
