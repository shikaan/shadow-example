# Shadower

Terribly dumb and far from production ready solution to shadow any service with NGINX

It doesn't require:
 * Service Meshes
 * NGINX Plus

## What?

This example will spawn two simple NodeJS services that will just return a simple response, 
regardless of what is the call.

In `nginx.conf` there are two location which will proxy request to these services. The root
location is meant to be called from the outside.

In `shadow.js` the magic happens: upon receiving a request it multiplexes it to the actual
service and the shadowed service in parallel. It eventually performs a comparison between the
replies and logs if there's a mismatch

## Running the example

```bash
# Launch the services. Keep it open and don't detach to see the logs
docker-compose up

# Calls the exposed endpoint and triggers the logic as per above
curl localhost
```