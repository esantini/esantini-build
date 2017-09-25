# esantini-build


### AWS:
	http://34.213.31.169/
	http://esantini.us-west-2.elasticbeanstalk.com/


### How to Heroku:
`git clone (repo)`

`cd (repo)` 

Create Procfile with text: `web: node app.js` 

`heroku create (name)`

###### `git push heroku master`

`heroku ps:scale web=1` // Ensure that at least one instance of the app is running. Or turn "dynos" off with 0

`heroku open`

`heroku logs --tail`
