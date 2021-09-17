# Logging

#### Authservice

Use the filter `kubernetes.pod_name = authservice-* AND kubernetes.labels = {app.kubernetes.io/name = authservice}` to get logs from the `authservice` Pod.


#### HAProxy

Use the filter `kubernetes.pod_name = authservice-haproxy-sso*` to get logs from the `haproxy` Pod.
