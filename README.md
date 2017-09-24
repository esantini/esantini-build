# esantini-build


### AWS:
	http://34.213.31.169/
	http://esantini.us-west-2.elasticbeanstalk.com/

#### Tutorial:
https://aws.amazon.com/es/getting-started/tutorials/launch-a-virtual-machine/

	server public ip: 34.214.20.42

	entered in git bash:
		ssh -i 'c:\Users\sunombreusuario\.ssh\MyKeyPair.pem' ec2-user@34.214.20.42


### How to Heroku:
`git clone (repo)`

`cd (repo)` 

Create Procfile with text: `web: node app.js` 

`heroku create (name)`

###### `git push heroku master`

`heroku ps:scale web=1` // Ensure that at least one instance of the app is running. Or turn "dynos" off with 0

`heroku open`

`heroku logs --tail`