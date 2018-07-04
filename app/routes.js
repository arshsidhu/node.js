//All the routes for the application

module.exports = function(app, passport) {

	//Home page with login links
	app.get('/', function(req, res) {
		//load the index.ejs file
		res.render('index.ejs');
	});

	//Show login form
	app.get('/login', function(req, res) {
		//render the page and pass in any flash data if it exists
		res.render('login.ejs', {message: req.flash('loginMessage') });
	});

	//process the login form
	//app.post('/login', do all our pasport stuff here);

	//Show signup form
	app.get('/signup', function(req, res) {
		//render the page and pass in flash data
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	});

	// process the signup form
    // app.post('/signup', do all our passport stuff here);

    //Profile section
    //this protected so you have to be logged in to visit
    //route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
    	res.render('profile.ejs', {
    		//get and pass the user
    		user: req.user
    	});
    });

    //Logout
    app.get('/logout' , function(req, res) {
    	req.logout();
    	res.redirect('/');
    });
};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated
	if (req.isAuthenticated())
		return next();

	//if they aren't
	res.redirect('/');
}