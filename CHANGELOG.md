# Changelog

---
## [1.1.1-bb.3] (2025-10-22)
### Changed
- Redis updated from 22.0.7 to 23.1.1
- bb-common updated from 0.8.2 to 0.9.1

## [1.1.1-bb.2] (2025-10-09)
### Changed
- ironbank/bitnami/redis from 8.2.1 to 8.2.2

## [1.1.1-bb.1] (2025-09-30)
### Changed
- add init container "wait-for-redis" to avoid initial CrashLoopBackOff as redis is starting up.
- remove unused variable redis.image.tag. If an image change is desired, user can refer to the redis-bb chart to pass in those related options. (See upstream.image.registry, upstream.image.repository, upstream.image.tag in the redis-bb chart)
- bump bb-common dependency to 0.8.2

## [1.1.1-bb.0] (2025-09-30)
### Changed
- authservice updated from 1.0.4 to 1.1.1

## [1.0.4-bb.5] (2025-09-05)
### Changed
- Integrate bb-common network policy implementation

## [1.0.4-bb.4] (2025-08-25)
### Changed
- Redis updated from 20.13.2 to 22.0.4
- Redis values updated to align with passthrough pattern.

## [1.0.4-bb.3] (2025-04-29)

### Changed

- ironbank/bitnami/redis updated from 7.4.2 to 7.4.3

## [1.0.4-bb.2] - 2025-03-05

### Added

- Added the ability to reference Kubernetes secrets in place of the OIDC `client_secret` value by using `client_secret_ref` under `templates/secret.yaml`.
- Added Role and RoleBinding for the Authservice service account to access secrets in the release namespace under `templates/rbac.yaml`.
- Added corresponding example `chains.full.client_secret_ref` entry in `chart/values.yaml`.

## [1.0.4-bb.1] - 2025-02-11

### Changed

- Updated istio egress newtork policy to be more dynamic

## [1.0.4-bb.0] - 2025-02-07

### Changed

- ironbank/bitnami/redis updated from 7.4.1 to 7.4.2
- ironbank/istio-ecosystem/authservice updated from 1.0.3-ubi9 to 1.0.4-ubi9

## [1.0.3-bb.0] - 2024-11-20

### Changed

- ironbank/istio-ecosystem/authservice updated from 1.0.2 to 1.0.3
- Update Redis chart to 20.2.1-bb.4
- Added the maintenance track annotation and badge

## [1.0.2-bb.2] - 2024-11-04

### Changed

- redis updated from 20.0.1-bb.1 to 20.2.1-bb.3
- ironbank/bitnami/redis updated from 7.4.0 to 7.4.1

## [1.0.2-bb.1] - 2024-11-04

### Changed

- Updated pod labels to use authservice.labels so version will be included

## [1.0.2-bb.0] - 2024-09-11

### Changed

- redis updated from 19.5.0 to 20.0.1
- ironbank/bitnami/redis updated from 7.2.5 to 7.4.0
- ironbank/istio-ecosystem/authservice updated from 1.0.1 to 1.0.2

## [1.0.1-bb.5] - 2024-08-23

### Updated

- Removed previous kiali label epic changes and updated to new pattern

## [1.0.1-bb.4] - 2024-07-26

### Added

- Fix the issue with sso and kiali when not using hardening
- Made the jwt-authz policy ACTION explicit

## [1.0.1-bb.3] - 2024-07-16

### Added

- Added `bigbang.labels` helper function to authservice under `templates/bigbang`
- Added call to `bigbang.labels` function in pod template section of `chart/templates/deployment.yaml`
- Added `redis-bb.master.podLabels` and `redis-bb.replica.podLabels` entries for `app` and `version` in `chart/values.yaml`

## [1.0.1-bb.2] - 2024-06-21

### Changed

- Removed shared authorization policies

## [1.0.1-bb.1] - 2024-05-31

### Changed

- Moved the shared kiali policy into authservice

## [1.0.1-bb.0] - 2024-05-28

### Changed

- redis updated from 18.7.1 to 19.5.0
- ironbank/bitnami/redis updated from 7.2.4 to 7.2.5
- ironbank/istio-ecosystem/authservice updated from 1.0.0 to 1.0.1

## [1.0.0-bb.1] - 2024-04-29

### Added

- Added the ability to deploy additional network policies from the values yaml

## [1.0.0-bb.0] - 2024-03-27

### Changed

- Updated authservice to 1.0.0

## [0.5.3-bb.30] - 2024-03-04

### Changed

- Added Openshift update for deploying authservice into Openshift cluster

## [0.5.3-bb.29] - 2024-02-13

### Changed

- Added istio Sidecar and ServiceEntry resources

## [0.5.3-bb.28] - 2024-01-26

### Changed

- Updated redis chart to 18.7.1-bb.1

## [0.5.3-bb.27] - 2024-01-11

### Changed

- ironbank/bitnami/redis updated from 7.2.3 to 7.2.4

## [0.5.3-bb.26] - 2024-01-17

### Changed

- removed istio.enabled during testing

## [0.5.3-bb.25] - 2024-01-16

### Changed

- Disabled istio

## [0.5.3-bb.24] - 2024-01-12

### Changed

- Enabled istio hardening during testing

## [0.5.3-bb.23] - 2024-01-04

### Changed

- Bumped Redis chart dependency to `18.3.2-bb.2`

## [0.5.3-bb.22] - 2023-12-22

### Added

- support for istio authorization policies and hardening

## [0.5.3-bb.21] - 2023-11-03

### Changed

- add non-root-group for redis subchart

## [0.5.3-bb.20] - 2023-10-25

### Changed

- redis updated from 18.0.4-bb.0 to 18.2.0-bb.0
- registry1.dso.mil/ironbank/bitnami/redis 7.2.1 -> 7.2.2

## [0.5.3-bb.19] - 2023-10-17

### Changed

- OSCAL update from 1.0.0 to 1.1.1

## [0.5.3-bb.18]

### Changed

- redis updated from 17.15.4-bb.0 to 18.0.4-bb.0

## [0.5.3-bb.17] - 2023-09-14

### Fixed

- Fixed an issue with the `global.certificate_authority` value and the system CA bundle.

## [0.5.3-bb.16]

### Changed

- Added optional trigger-rules configuration.

## [0.5.3-bb.15]

### Fixed

- Bug fix. Run helm dependency update to pull latest redis subchart

## [0.5.3-bb.14]

### Changed

- Allow configuration of additional scopes.

## [0.5.3-bb.13] - 2023-08-30

### Changed

- redis updated from 17.10.2 to 17.15.4
- ironbank/bitnami/redis updated from 7.0.11 to 7.2.0

## [0.5.3-bb.12]

### Changed

- Fixed egress-istiod network policy to match correctly.

## [0.5.3-bb.11]

### Changed

- Allow for passing templates inside templates for chains prefixes and callback uris.

## [0.5.3-bb.10]

### Changed

- Added `sso-tls-ca` volume mount to the deployment to enable JWKS URI usage even if the OIDC IdP uses a custom CA.

## [0.5.3-bb.9]

### Changed

- Fixes a double quoting bug in `jwks_uri` setting.

## [0.5.3-bb.8]

### Changed

- Bumped Redis chart dependency to `17.10.2-bb.0`

## [0.5.3-bb.7]

### Changed

- skip_verify_peer_cert fixed to also work with the token endpoint and chain jwks_uri calls.

## [0.5.3-bb.6]

### Changed

- Update HPA template syntax to support apiVersion v2 for AWS-EKS 1.23+

## [0.5.3-bb.5]

### Changed

- HPA template syntax update to support apiVersion v2 for k8s 1.23+

## [0.5.3-bb.4]

### Added

- NetworkPolicy template to facilitate tracing engine communication
- HPA update to support apiVersion v2 for k8s 1.23+

## [0.5.3-bb.3]

### Changed

- Updated redis to latest version

## [0.5.3-bb.2]

### Added

- Added AuthorizationPolicy custom ruleset value and logic

## [0.5.3-bb.1]

### Added

- Added support for `equality` chain matching

## [0.5.3-bb.0]

### Added

- Added support for `jwks_uri`

### Changed

- Updated to 0.5.3 AuthService image version

## [0.5.2-bb.1]

### Changed

- Updated mTLS mode for metrics

## [0.5.2-bb.0]

### Changed

- Updated to 0.5.2 Authservice image version
- Add allow_unmatched_requests toggle with corresponding change to CUSTOM authz policy

## [0.5.1-bb.5]

### Added

- Added capabilities: drop: ALL
- updated redis to 16.12.3-bb.2

## [0.5.1-bb.4]

### Added

- Added contributing document

## [0.5.1-bb.3]

### Changed

- Updated redis to 16.12.3-bb.1

## [0.5.1-bb.2]

### Changed

- Update Authservice to run as non root user

## [0.5.1-bb.1]

### Changed

- Updated Redis sub-chart to version `16.9.2-bb.0` appVersion `6.2.6`

## [0.5.1-bb.0]

### Changed

- Updated to 0.5.1 Authservice image version

## [0.4.0-bb.27]

### Changed

- Updated `renovate.json` to have renovate automatically update appVersion in `Chart.yaml`

## [0.4.0-bb.26]

### Added

- Added support for `absolute_session_timeout` and `idle_session_timeout`

## [0.4.0-bb.25]

### Added

- Added network policy for Redis clients

## [0.4.0-bb.24]

### Changed

- Modified PeerAuthentication to allow for passing in mode

## [0.4.0-bb.23]

### Changed

- Enable istio mtls

## [0.4.0-bb.22]

### Update

- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization

## [0.4.0-bb.21]

### Changed

- Updated redis dependency to version `14.1.0-bb.7`
- Adding `redis-bb` commonConfiguration option to set:
  - `maxmemory` to `200mb` (default pod resource limits/requests=256mb)
  - `maxmemory-policy allkeys-lru` setting recommended for caches: This sets every key within the cache to have an exire set. Once the 200MB of cache is taken up, tokens will automatically be expired (starting with the oldest set)

## [0.4.0-bb.19]

### Added

- `monitoring.enabled` value, to be passed down from BigBang installation.

### Changed

- Added monitoring value flags to related NetworkPolicy templates.

## [0.4.0-bb.18]

### Changed

- RequestAuthentication resource use jwks value if present over jwksUri

## [0.4.0-bb.17]

### Changed

- Auto-generate the cookie_name_prefix to be the name of the chain

## [0.4.0-bb.16]

### Changed

- Replaced envoyfilters with authz CUSTOM action

## [0.4.0-bb.15]

### Changed

- Added Limits and Requests
- updated redis to 14.1.0-bb.3 for update pod limits and requests
- Added in dependencies for new CI

## [0.4.0-bb.14]

### Update

- Istio 1.10 update

## [0.4.0-bb.13]

### Changed

- Fixed redis sub-chart and alias mapping so redis-bb values get passed down correctly.
- Fixed issue with redis deploying by default in handful of latest package version.

## [0.4.0-bb.12]

### Changed

- Templating for all `trusted_certificate_authority` values. Better readability for both humans and helm.

## [0.4.0-bb.11]

### Changed

- Istio 1.9 update

## [0.4.0-bb.10]

### Added

- Add openshift toggle. If it's set, add port 5353 egress rule.

## [0.4.0-bb.9]

### Changed

- Updated redis to big bang base image

## [0.4.0-bb.8]

### Fixed

- Turned redis off by default

## [0.4.0-bb.7]

### Changed

- Redis Dependency chart update to 6.2.2

## [0.4.0-bb.6]

### Added

- networkPolicies for HA Authservice (Redis)

## [0.4.0-bb.5]

### Added

- networkPolicies values and boolean
- BigBang specific Network Policy Templates

## [0.4.0-bb.4]

### Changed

- Update to ironbank image to 0.4.0
- add optional redis deployment with authservice

## [0.4.0-bb.2]

### Added

- Fixing skipping templating out Keycloak formatted URL when certain URIs are explicitly specified for an authservice chain.

## [0.4.0-bb.1]

### Changed

- update changelog

## [0.4.0-bb.0]

### Changed

- update authservice to 0.4.0
- change secret to use `default_oidc_config` and `oidc_override`

## [0.1.6-bb.3]

### Changed

- Pointing image to registry1 image from IronBank.

## [0.1.3-bb.0]

### Added

Added section of values to allow dynamic creation of secret containing the config.json chains:

```yaml
global:
  client_id: "global_id"
  client_secret: "global_secret"
  match:
    header: ":authority"
    prefix: "*"
  cookie_name_prefix: "global_prefix"
  logout_path: "/globallogout"
  oidc:
    host: login.dso.mil
    realm: baby-yoda
    # escaped json
  jwks: '{"keys":[{"kid":"4CK69bW66HE2wph9VuBs0fTc1MaETSTpU1iflEkBHR4","kty":"RSA","alg":"RS256","use":"sig","n":"hiML1kjw-sw25BgaZI1AyfgcCRBPJKPE-wwttqa7NNxptr_5RCBGuJXqDyo3p1vjcbb8KjdKnXI7kWer8b2Pz_RP1m_QcPrKOxSluk7GZF8ARsc6FPGbzYgi8o8cBVSsaml6HZzpN3ZnH4DFZ27ifM-Ul_PyMxZ2aweohIaizXp-rgF7Rqpav5NXUwmcSyH8LP92NVIuFlD3HYTDGosVbfA_u_H25Z4XCGKW_vLDTNrl8PcA3HqIoD-vNavysdxAq_KNw7iLLc0KLsjFYSdJL_54H7QubsGR0AyIrLLurJbqAtvttGJK38k5XYWKIwYGtu6iiJwjSb7UtonVdPh8Vw","e":"AQAB","x5c":["MIICoTCCAYkCBgFyLIEqUjANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwHhcNMjAwNTE5MTAzNDIyWhcNMzAwNTE5MTAzNjAyWjAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCGIwvWSPD6zDbkGBpkjUDJ+BwJEE8ko8T7DC22prs03Gm2v/lEIEa4leoPKjenW+NxtvwqN0qdcjuRZ6vxvY/P9E/Wb9Bw+so7FKW6TsZkXwBGxzoU8ZvNiCLyjxwFVKxqaXodnOk3dmcfgMVnbuJ8z5SX8/IzFnZrB6iEhqLNen6uAXtGqlq/k1dTCZxLIfws/3Y1Ui4WUPcdhMMaixVt8D+78fblnhcIYpb+8sNM2uXw9wDceoigP681q/Kx3ECr8o3DuIstzQouyMVhJ0kv/ngftC5uwZHQDIissu6sluoC2+20YkrfyTldhYojBga27qKInCNJvtS2idV0+HxXAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAIVkoDYkM6ryBcuchdAL5OmyKbmmY4WDrMlatfa3uniK5jvFXrmVaJ3rcu0apdY/NhBeLSOLFVlC5w1QroGUhWm0EjAA4zyuU63Pk0sro0vyHrxztBrGPQrGXI3kjXEssaehZZvYP4b9VtYpus6oGP6bTmaDw94Zu+WrDsWdFs+27VEYwBuU0D6E+ENDGlfR+9ADEW53t6H2M3H0VsOtbArEutYgb4gmQcOIBygC7L1tGJ4IqbnhTYLh9DMKNklU+tq8TMHacps9FxELpeAib3O0J0E5zYXdraQobCCe+ao1Y7sA/wqcGQBCVuoFgty7Y37nNL7LMvygcafgqVDqw5U="],"x5t":"mxFIwx7EdgxyC3Y6ODLx8yr8Bx8","x5t#S256":"SdT7ScKVOnBW6qs_MuYdTGVtMGwYK_-nmQF9a_8lXco"}]}'

chains:
  # - name: idp_filter
  #   match:
  #     header: ":authority"
  #     prefix: "localhost"
  #   client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_hello-world-authservice
  #   client_secret: secret_value
  #   callback_uri: https://localhost/login
  #   cookie_name_prefix: "hello-world"
  #   logout:
  #     path: "/logout"
  #   oidc:
  #     host: local_oidc_host
  #     realm: local_oidc_relm
  #   jwks: local_jwks
  - name: local_filter
    match:
      header: ":local"
      prefix: "localhost"
    client_id: local_id
    client_secret: local_secret
    callback_uri: https://localhost/login
    cookie_name_prefix: "local_cookie"
    logout_path: "/local"
  - name: minimal
    callback_uri: https://minimal.bigbang.dev
  - name: oidcs
    callback_uri: https://oidc.bigbang.dev
    oidc:
      host: oidc-hsot
      realm: oidc_realm
    jwks: oidc_jwks
```

The global section provides default values for chain elements that do not specify their own values. Each chain needs at least `name` and `callback_uri`
