# Backups and Disaster Recovery

#### Authservice

Authservice is a stateless microservice, as such it does not need any backups configured. It does, however, store session data in memory which can be lost if the service crashes or is redeployed. If this happens it will simply it will return an error to users when they first connect after the service is back up and running but users can refresh the page to resolve the error; session data is not critical data to lose. 

This package does come with an optional Redis deployment which can be used to store session data so that it does persist in the event of a crash and can be enabled in the [values.yaml](../chart/values.yaml#L165).

#### HAProxy

HAProxy is a stateless microservice, as such it does not need any backups configured. If it fails it will simply cause connections to be interrupted and when it restarts it will pick up right where it left off. 
