# authservice

![Version: 0.5.1-bb.3](https://img.shields.io/badge/Version-0.5.1--bb.3-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 0.5.1](https://img.shields.io/badge/AppVersion-0.5.1-informational?style=flat-square)

A Helm chart for Kubernetes

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
| istio.namespace | string | `"istio-system"` |  |
| istio.mtls | object | `{"mode":"STRICT"}` | Default authservice peer authentication |
| istio.mtls.mode | string | `"STRICT"` | Two mtls modes allowed STRICT = Allow only mutual TLS traffic PERMISSIVE = Allow both plain text and mutual TLS traffic |
| monitoring.enabled | bool | `false` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| image.repository | string | `"registry1.dso.mil/ironbank/istio-ecosystem/authservice"` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.tag | string | `"0.5.1"` | Overrides the image tag whose default is the chart appVersion. |
| imagePullSecrets | list | `[]` |  |
| issuer_uri | string | `""` | Issuer and jwks URIs if not using Keycloak |
| jwks_uri | string | `""` |  |
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
| global.jwks | string | `"{\"keys\":[{\"kid\":\"4CK69bW66HE2wph9VuBs0fTc1MaETSTpU1iflEkBHR4\",\"kty\":\"RSA\",\"alg\":\"RS256\",\"use\":\"sig\",\"n\":\"hiML1kjw-sw25BgaZI1AyfgcCRBPJKPE-wwttqa7NNxptr_5RCBGuJXqDyo3p1vjcbb8KjdKnXI7kWer8b2Pz_RP1m_QcPrKOxSluk7GZF8ARsc6FPGbzYgi8o8cBVSsaml6HZzpN3ZnH4DFZ27ifM-Ul_PyMxZ2aweohIaizXp-rgF7Rqpav5NXUwmcSyH8LP92NVIuFlD3HYTDGosVbfA_u_H25Z4XCGKW_vLDTNrl8PcA3HqIoD-vNavysdxAq_KNw7iLLc0KLsjFYSdJL_54H7QubsGR0AyIrLLurJbqAtvttGJK38k5XYWKIwYGtu6iiJwjSb7UtonVdPh8Vw\",\"e\":\"AQAB\",\"x5c\":[\"MIICoTCCAYkCBgFyLIEqUjANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwHhcNMjAwNTE5MTAzNDIyWhcNMzAwNTE5MTAzNjAyWjAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCGIwvWSPD6zDbkGBpkjUDJ+BwJEE8ko8T7DC22prs03Gm2v/lEIEa4leoPKjenW+NxtvwqN0qdcjuRZ6vxvY/P9E/Wb9Bw+so7FKW6TsZkXwBGxzoU8ZvNiCLyjxwFVKxqaXodnOk3dmcfgMVnbuJ8z5SX8/IzFnZrB6iEhqLNen6uAXtGqlq/k1dTCZxLIfws/3Y1Ui4WUPcdhMMaixVt8D+78fblnhcIYpb+8sNM2uXw9wDceoigP681q/Kx3ECr8o3DuIstzQouyMVhJ0kv/ngftC5uwZHQDIissu6sluoC2+20YkrfyTldhYojBga27qKInCNJvtS2idV0+HxXAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAIVkoDYkM6ryBcuchdAL5OmyKbmmY4WDrMlatfa3uniK5jvFXrmVaJ3rcu0apdY/NhBeLSOLFVlC5w1QroGUhWm0EjAA4zyuU63Pk0sro0vyHrxztBrGPQrGXI3kjXEssaehZZvYP4b9VtYpus6oGP6bTmaDw94Zu+WrDsWdFs+27VEYwBuU0D6E+ENDGlfR+9ADEW53t6H2M3H0VsOtbArEutYgb4gmQcOIBygC7L1tGJ4IqbnhTYLh9DMKNklU+tq8TMHacps9FxELpeAib3O0J0E5zYXdraQobCCe+ao1Y7sA/wqcGQBCVuoFgty7Y37nNL7LMvygcafgqVDqw5U=\"],\"x5t\":\"mxFIwx7EdgxyC3Y6ODLx8yr8Bx8\",\"x5t#S256\":\"SdT7ScKVOnBW6qs_MuYdTGVtMGwYK_-nmQF9a_8lXco\"}]}"` | escaped json for the JWKS |
| chains | object | `{"local":{"callback_uri":"https://localhost/login","client_id":"local_id","client_secret":"local_secret","logout_path":"/local","match":{"header":":local","prefix":"localhost"}}}` | Individual chains.  Must have a `name` value and a `callback_uri` |
| nameOverride | string | `"authservice"` |  |
| fullnameOverride | string | `"authservice"` |  |
| serviceAccount.create | bool | `true` | Specifies whether a service account should be created |
| serviceAccount.annotations | object | `{}` | Annotations to add to the service account |
| serviceAccount.name | string | `""` | The name of the service account to use. If not set and create is true, a name is generated using the fullname template |
| podAnnotations | object | `{}` |  |
| podSecurityContext.runAsUser | int | `1000` |  |
| podSecurityContext.runAsGroup | int | `1000` |  |
| podSecurityContext.runAsNonRoot | bool | `true` |  |
| securityContext | object | `{}` |  |
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
| redis | object | `{"enabled":false}` | Conditional for enabling Redis Subchart |
| redis-bb | object | `{"auth":{"enabled":false},"commonConfiguration":"# Enable AOF https://redis.io/topics/persistence#append-only-file\nappendonly no\nmaxmemory 200mb\nmaxmemory-policy allkeys-lru\nsave \"\"","istio":{"redis":{"enabled":false}},"networkPolicies":{"controlPlaneCidr":"0.0.0.0/0","enabled":true}}` | Values passthrough for redis Subchart https://repo1.dso.mil/platform-one/big-bang/apps/sandbox/redis/-/blob/main/chart/values.yaml |
| openshift | bool | `false` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
