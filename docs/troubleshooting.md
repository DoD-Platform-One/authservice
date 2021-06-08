# Troubleshooting

## General

Authservice consists of two Pods in the `authservice` namespace, `authservice` and `haproxy-sso`. The Pods have unique labels and can be targeted for troubleshooting commands directly through them as such:

#### Get Pod status
Authservice: `kubectl describe pod -l app.kubernetes.io/name=authservice -n authservice`
HAProxy: `kubectl describe pod -l app.kubernetes.io/name=haproxy -n authservice`

#### Get Pod logs
Authservice: `kubectl logs -l app.kubernetes.io/name=authservice -c authservice -n authservice`
HAProxy: `kubectl get pod -l app.kubernetes.io/name=haproxy -c haproxy -n authservice`

## Authservice Configuration
Authservice mounts its configuration values from a Secret in the authservice namespace named `authservice`. If you want to make sure that the values you are entering via Big Bang are being translated correctly into Authservice configuration values, you can check the values being insert into this Secret object as such:

`kubectl get secret authservice -n authservice -o jsonpath="{.data.config\.json}" | base64 -d`
