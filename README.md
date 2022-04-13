# authservice

![Version: 0.5.1-bb.0](https://img.shields.io/badge/Version-0.5.1--bb.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 0.5.1](https://img.shields.io/badge/AppVersion-0.5.1-informational?style=flat-square)

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
| replicaCount | int | `1` |  |
| istio.namespace | string | `"istio-system"` |  |
| istio.mtls.mode | string | `"STRICT"` |  |
| monitoring.enabled | bool | `false` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| image.repository | string | `"registry1.dso.mil/ironbank/istio-ecosystem/authservice"` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.tag | string | `"0.5.1"` |  |
| imagePullSecrets | list | `[]` |  |
| issuer_uri | string | `""` |  |
| jwks_uri | string | `""` |  |
| global.client_id | string | `"global_id"` |  |
| global.client_secret | string | `"global_secret"` |  |
| global.match.header | string | `":authority"` |  |
| global.match.prefix | string | `"bigbang"` |  |
| global.logout_path | string | `"/globallogout"` |  |
| global.logout_redirect_uri | string | `""` |  |
| global.absolute_session_timeout | int | `0` |  |
| global.idle_session_timeout | int | `0` |  |
| global.certificate_authority | string | `""` |  |
| global.oidc.host | string | `"login.dso.mil"` |  |
| global.oidc.realm | string | `"baby-yoda"` |  |
| global.jwks | string | `"{\"keys\":[{\"kid\":\"4CK69bW66HE2wph9VuBs0fTc1MaETSTpU1iflEkBHR4\",\"kty\":\"RSA\",\"alg\":\"RS256\",\"use\":\"sig\",\"n\":\"hiML1kjw-sw25BgaZI1AyfgcCRBPJKPE-wwttqa7NNxptr_5RCBGuJXqDyo3p1vjcbb8KjdKnXI7kWer8b2Pz_RP1m_QcPrKOxSluk7GZF8ARsc6FPGbzYgi8o8cBVSsaml6HZzpN3ZnH4DFZ27ifM-Ul_PyMxZ2aweohIaizXp-rgF7Rqpav5NXUwmcSyH8LP92NVIuFlD3HYTDGosVbfA_u_H25Z4XCGKW_vLDTNrl8PcA3HqIoD-vNavysdxAq_KNw7iLLc0KLsjFYSdJL_54H7QubsGR0AyIrLLurJbqAtvttGJK38k5XYWKIwYGtu6iiJwjSb7UtonVdPh8Vw\",\"e\":\"AQAB\",\"x5c\":[\"MIICoTCCAYkCBgFyLIEqUjANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwHhcNMjAwNTE5MTAzNDIyWhcNMzAwNTE5MTAzNjAyWjAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCGIwvWSPD6zDbkGBpkjUDJ+BwJEE8ko8T7DC22prs03Gm2v/lEIEa4leoPKjenW+NxtvwqN0qdcjuRZ6vxvY/P9E/Wb9Bw+so7FKW6TsZkXwBGxzoU8ZvNiCLyjxwFVKxqaXodnOk3dmcfgMVnbuJ8z5SX8/IzFnZrB6iEhqLNen6uAXtGqlq/k1dTCZxLIfws/3Y1Ui4WUPcdhMMaixVt8D+78fblnhcIYpb+8sNM2uXw9wDceoigP681q/Kx3ECr8o3DuIstzQouyMVhJ0kv/ngftC5uwZHQDIissu6sluoC2+20YkrfyTldhYojBga27qKInCNJvtS2idV0+HxXAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAIVkoDYkM6ryBcuchdAL5OmyKbmmY4WDrMlatfa3uniK5jvFXrmVaJ3rcu0apdY/NhBeLSOLFVlC5w1QroGUhWm0EjAA4zyuU63Pk0sro0vyHrxztBrGPQrGXI3kjXEssaehZZvYP4b9VtYpus6oGP6bTmaDw94Zu+WrDsWdFs+27VEYwBuU0D6E+ENDGlfR+9ADEW53t6H2M3H0VsOtbArEutYgb4gmQcOIBygC7L1tGJ4IqbnhTYLh9DMKNklU+tq8TMHacps9FxELpeAib3O0J0E5zYXdraQobCCe+ao1Y7sA/wqcGQBCVuoFgty7Y37nNL7LMvygcafgqVDqw5U=\"],\"x5t\":\"mxFIwx7EdgxyC3Y6ODLx8yr8Bx8\",\"x5t#S256\":\"SdT7ScKVOnBW6qs_MuYdTGVtMGwYK_-nmQF9a_8lXco\"}]}"` |  |
| chains.local.match.header | string | `":local"` |  |
| chains.local.match.prefix | string | `"localhost"` |  |
| chains.local.client_id | string | `"local_id"` |  |
| chains.local.client_secret | string | `"local_secret"` |  |
| chains.local.callback_uri | string | `"https://localhost/login"` |  |
| chains.local.logout_path | string | `"/local"` |  |
| nameOverride | string | `"authservice"` |  |
| fullnameOverride | string | `"authservice"` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.annotations | object | `{}` |  |
| serviceAccount.name | string | `""` |  |
| podAnnotations | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| securityContext | object | `{}` |  |
| service.type | string | `"ClusterIP"` |  |
| service.port | int | `10003` |  |
| resources.limits.cpu | string | `"100m"` |  |
| resources.limits.memory | string | `"512Mi"` |  |
| resources.requests.cpu | string | `"100m"` |  |
| resources.requests.memory | string | `"512Mi"` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.minReplicas | int | `1` |  |
| autoscaling.maxReplicas | int | `3` |  |
| autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
| config.logLevel | string | `"trace"` |  |
| selector.key | string | `"protect"` |  |
| selector.value | string | `"keycloak"` |  |
| redis.enabled | bool | `false` |  |
| redis-bb.auth.enabled | bool | `false` |  |
| redis-bb.istio.redis.enabled | bool | `false` |  |
| redis-bb.networkPolicies.enabled | bool | `true` |  |
| redis-bb.networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| redis-bb.commonConfiguration | string | `"# Enable AOF https://redis.io/topics/persistence#append-only-file\nappendonly no\nmaxmemory 200mb\nmaxmemory-policy allkeys-lru\nsave \"\""` |  |
| openshift | bool | `false` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
