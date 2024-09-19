<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# authservice

![Version: 1.0.2-bb.0](https://img.shields.io/badge/Version-1.0.2--bb.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.0.2](https://img.shields.io/badge/AppVersion-1.0.2-informational?style=flat-square)

A Helm chart for Kubernetes

## Upstream References

* <https://github.com/istio-ecosystem/authservice>

### Upstream Release Notes

* [Find upstream chart's release notes and CHANGELOG here](https://github.com/istio-ecosystem/authservice/releases)

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install authservice chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| replicaCount | int | `1` | When setting this above 1, a redis configuration is required.  See globals.redis_server_uri |
| istio.enabled | bool | `false` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.kiali.enabled | bool | `true` |  |
| istio.hardened.kiali.namespaces[0] | string | `"kiali"` |  |
| istio.hardened.kiali.principals[0] | string | `"cluster.local/ns/kiali/sa/kiali-service-account"` |  |
| istio.namespace | string | `"istio-system"` |  |
| istio.clusterWideHardeningEnabled | bool | `false` |  |
| istio.mtls | object | `{"mode":"STRICT"}` | Default authservice peer authentication |
| istio.mtls.mode | string | `"STRICT"` | Two mtls modes allowed STRICT = Allow only mutual TLS traffic PERMISSIVE = Allow both plain text and mutual TLS traffic |
| monitoring.enabled | bool | `false` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| image.repository | string | `"registry1.dso.mil/ironbank/istio-ecosystem/authservice"` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.tag | string | `"1.0.2-ubi9"` | Overrides the image tag whose default is the chart appVersion. |
| imagePullSecrets | list | `[]` |  |
| issuer_uri | string | `""` | Issuer and jwks URIs if not using Keycloak |
| jwks_uri | string | `""` |  |
| allow_unmatched_requests | bool | `true` | If true will allow the requests even no filter chain match is found |
| custom_authpolicy_rules | list | `[{"when":[{"key":"request.headers[authorization]","notValues":["*"]}]}]` | Extra Ruleset for AuthorizationPolicy CUSTOM action to forward to Authservice. To enable `allow_unmatched_requests` must be `false`. These custom rules mean that only these requests will be routed and will break default BigBang setup for `prometheus/alertmanager/tempo` unless added. Path specific Operations are not supported, it is recommended to use only hosts, notHosts, & method operations. See reference: https://istio.io/latest/docs/reference/config/security/authorization-policy/ |
| global.client_id | string | `"global_id"` | Global Authorization URI value to set if not using Keycloak authorization_uri: "" Global Token URI Value to set if not using Keycloak token_uri: "" Default client_id to be used in each chain |
| global.client_secret | string | `"global_secret"` | default client_secret to be used in each chain |
| global.match.header | string | `":authority"` | Header to match.  The value ":authority" is used to match the requested hostname |
| global.match.prefix | string | `"bigbang"` | value matches the start of the header value defined above |
| global.logout_path | string | `"/globallogout"` | Logout URL for the client |
| global.logout_redirect_uri | string | `""` | Logout Redirect URI for the client |
| global.absolute_session_timeout | int | `0` |  |
| global.idle_session_timeout | int | `0` |  |
| global.certificate_authority | string | `""` | CA signing the OIDC provider. Passed through as a Helm multi-line string. See README for example. |
| global.oidc | object | `{"host":"login.dso.mil","realm":"baby-yoda"}` | URI for Redis instance used for OIDC token storage/retrieval. This may also be specified per-chain. redis_server_uri: tcp://{{ .Release.Name }}-{{ .Release.Namespace }}-auth-redis-master:6379/ |
| global.oidc.host | string | `"login.dso.mil"` | OpenID Connect hostname.  Assumption of Keycloak based on URL construction |
| global.oidc.realm | string | `"baby-yoda"` | Realm for OpenID Connect |
| global.jwks | string | `""` | escaped json for the JWKS |
| global.jwks_uri | string | `""` | Request URI that has the JWKs. If neither jwks or jwks_uri are specified the jwks_uri is computed based on the provided OIDC realm and and host" |
| global.periodic_fetch_interval_sec | int | `60` | Request interval to check whether new JWKs are available. |
| global.skip_verify_peer_cert | bool | `false` | If set to true, the verification of the destination certificate will be skipped when making a request to the JWKs URI and the token endpoint. This option is useful when you want to use a self-signed certificate for testing purposes, but basically should not be set to true in any other cases. |
| chains | object | `{"local":{"callback_uri":"https://localhost/login","client_id":"local_id","client_secret":"local_secret","logout_path":"/local","match":{"header":":local","prefix":"localhost"}}}` | Individual chains.  Must have a `name` value and a `callback_uri` NOTE: if using "match" can only specify `prefix` OR `equality`, not both |
| nameOverride | string | `"authservice"` |  |
| fullnameOverride | string | `"authservice"` |  |
| serviceAccount.create | bool | `true` | Specifies whether a service account should be created |
| serviceAccount.annotations | object | `{}` | Annotations to add to the service account |
| serviceAccount.name | string | `""` | The name of the service account to use. If not set and create is true, a name is generated using the fullname template |
| podAnnotations | object | `{}` |  |
| podLabels | object | `{}` |  |
| podSecurityContext.runAsUser | int | `1000` |  |
| podSecurityContext.runAsGroup | int | `1000` |  |
| podSecurityContext.runAsNonRoot | bool | `true` |  |
| securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| securityContext.readOnlyRootFilesystem | bool | `true` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| securityContext.runAsUser | int | `1000` |  |
| service.type | string | `"ClusterIP"` |  |
| service.port | int | `10003` |  |
| resources.limits | object | `{"cpu":"100m","memory":"512Mi"}` | We usually recommend not to specify default resources and to leave this as a conscious choice for the user. This also increases chances charts run on environments with little resources, such as Minikube. If you do want to specify resources, uncomment the following lines, adjust them as necessary, and remove the curly braces after 'resources:'. |
| resources.requests.cpu | string | `"100m"` |  |
| resources.requests.memory | string | `"512Mi"` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.minReplicas | int | `1` |  |
| autoscaling.maxReplicas | int | `3` |  |
| autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
| config | object | `{"logLevel":"trace"}` | Name of the secret to source authservices `config.json` from, created outside of helm chart TODO: Create this as part of the helmchart? |
| selector | object | `{"key":"protect","value":"keycloak"}` | Label to determine what workloads (pods/deployments) should be protected by authservice. |
| redis | object | `{"enabled":false,"image":{"tag":"7.4.0"}}` | Conditional for enabling Redis Subchart |
| redis.image | object | `{"tag":"7.4.0"}` | Values passthrough for redis Subchart |
| redis-bb.auth.enabled | bool | `false` |  |
| redis-bb.istio.redis.enabled | bool | `false` |  |
| redis-bb.image.pullSecrets[0] | string | `"private-registry"` |  |
| redis-bb.networkPolicies.enabled | bool | `true` |  |
| redis-bb.networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| redis-bb.master.containerSecurityContext.enabled | bool | `true` |  |
| redis-bb.master.containerSecurityContext.runAsUser | int | `1001` |  |
| redis-bb.master.containerSecurityContext.runAsGroup | int | `1001` |  |
| redis-bb.master.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| redis-bb.master.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| redis-bb.replica.containerSecurityContext.enabled | bool | `true` |  |
| redis-bb.replica.containerSecurityContext.runAsUser | int | `1001` |  |
| redis-bb.replica.containerSecurityContext.runAsGroup | int | `1001` |  |
| redis-bb.replica.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| redis-bb.replica.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| redis-bb.metrics.enabled | bool | `false` |  |
| redis-bb.metrics.containerSecurityContext.enabled | bool | `true` |  |
| redis-bb.metrics.containerSecurityContext.runAsUser | int | `1001` |  |
| redis-bb.metrics.containerSecurityContext.runAsGroup | int | `1001` |  |
| redis-bb.commonConfiguration | string | `"# Enable AOF https://redis.io/topics/persistence#append-only-file\nappendonly no\nmaxmemory 200mb\nmaxmemory-policy allkeys-lru\nsave \"\""` |  |
| openshift | bool | `false` |  |
| trigger_rules | list | `[]` | Values to bypass OIDC chains in favor or using istio authorizationpolicies.security.istio.io and requestauthentications.security.istio.io for certain endpoints. |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

