# Changelog

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
