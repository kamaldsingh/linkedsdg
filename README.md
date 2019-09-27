# SDG Vocabularies project

This project was created by Epistemik for the United Nations Statistics Division and stitched together using Docker and Docker-Compose.

https://github.com/epistemik-co/sdg-links-webapp

https://github.com/epistemik-co/sdg-links-graph-query-api

https://github.com/epistemik-co/sdg-links-concept-extraction-api

https://github.com/epistemik-co/sdg-links-text-extraction-api

## Getting up and running

To start the demo:

`docker-compose up`

Add the `-d` flag to run in the background as a daemon.

To deploy this into production on kubernetes, use the following command: 

`kompose up -f docker-comp --namespace sdgontologies`

Note that some of the services can take up to 10 minutes to run.
