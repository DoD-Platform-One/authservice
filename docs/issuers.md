# Additional Issuers

This document explains how to configure multiple JWT issuers (OIDC providers) in authservice using the `additionalIssuers` feature.

## Overview

The `additionalIssuers` feature allows you to configure multiple JWT token issuers beyond the primary issuer. This is useful when:

- You need to accept tokens from multiple identity providers
- Different applications or services use different OIDC providers
- You want to restrict certain issuers to specific hosts/applications

## How It Works

### Primary Issuer

The primary issuer is configured using either:

- `issuer_uri` and `jwks_uri` values, OR
- `global.oidc.host` and `global.oidc.realm` (for Keycloak-based setups)

This primary issuer is always included in the authentication and authorization policies.

### Additional Issuers Configuration

Additional issuers are configured via the `additionalIssuers` array in values.yaml. Each additional issuer can optionally specify which hosts it should apply to.

## Configuration

### Basic Configuration (No Host Restrictions)

When you add additional issuers without specifying `hosts`, they work for all hosts (except those explicitly restricted to other issuers):

```yaml
additionalIssuers:
  - issuer: "https://issuer1.example.com"
    jwks_uri: "https://issuer1.example.com/.well-known/jwks.json"
  - issuer: "https://issuer2.example.com/auth"
    jwks_uri: "https://issuer2.example.com/.well-known/jwks.json"
```

**Result:** Both additional issuers work for all hosts, alongside the primary issuer.

### Host-Restricted Configuration

You can restrict an additional issuer to specific hosts by adding a `hosts` array:

```yaml
additionalIssuers:
  - issuer: "https://partner-idp.example.com"
    jwks_uri: "https://partner-idp.example.com/.well-known/jwks.json"
    hosts:
      - "partner-app.example.com"
      - "partner-api.example.com"
```

**Result:** This issuer ONLY works for the specified hosts. The primary issuer and other additional issuers are EXCLUDED from these hosts.

### Mixed Configuration

You can mix host-restricted and non-restricted issuers:

```yaml
additionalIssuers:
  # This issuer works for all hosts (except those restricted below)
  - issuer: "https://corp-sso.example.com"
    jwks_uri: "https://corp-sso.example.com/.well-known/jwks.json"

  # This issuer ONLY works for specific hosts
  - issuer: "https://partner-idp.example.com"
    jwks_uri: "https://partner-idp.example.com/.well-known/jwks.json"
    hosts:
      - "partner-app.example.com"
      - "partner-api.example.com"
```

## Generated Istio Resources

### RequestAuthentication (JWT Validation)

The `RequestAuthentication` resource validates JWT tokens from all configured issuers:

```yaml
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-authn
spec:
  jwtRules:
    # Primary issuer
    - issuer: https://login.dso.mil/auth/realms/baby-yoda
      jwksUri: https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/certs
      forwardOriginalToken: true

    # Additional issuers (all included regardless of host restrictions)
    - issuer: https://partner-idp.example.com
      jwksUri: https://partner-idp.example.com/.well-known/jwks.json
      forwardOriginalToken: true
```

### AuthorizationPolicy (Access Control)

The `AuthorizationPolicy` controls which hosts accept tokens from which issuers. **Each issuer gets its own separate rule.**

#### Without Host Restrictions

When no additional issuers have host restrictions, each issuer gets a simple rule:

```yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: jwt-authz
spec:
  action: ALLOW
  rules:
    # Primary issuer - applies to all hosts
    - from:
      - source:
          requestPrincipals:
          - "https://login.dso.mil/auth/realms/baby-yoda/*"

    # Additional issuer 1 - applies to all hosts
    - from:
      - source:
          requestPrincipals:
          - "https://corp-sso.example.com/*"
```

#### With Host Restrictions (notHosts)

When ANY additional issuer has host restrictions, the chart automatically adds `notHosts` constraints to prevent the primary issuer and unrestricted additional issuers from accessing the restricted hosts:

```yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: jwt-authz
spec:
  action: ALLOW
  rules:
    # Primary issuer - EXCLUDED from partner-app.example.com
    - from:
      - source:
          requestPrincipals:
          - "https://login.dso.mil/auth/realms/baby-yoda/*"
      to:
      - operation:
          notHosts:
          - "partner-app.example.com"

    # Additional issuer without hosts - EXCLUDED from partner-app.example.com
    - from:
      - source:
          requestPrincipals:
          - "https://corp-sso.example.com/*"
      to:
      - operation:
          notHosts:
          - "partner-app.example.com"

    # Additional issuer with hosts - ONLY for partner-app.example.com
    - from:
      - source:
          requestPrincipals:
          - "https://partner-idp.example.com/*"
      to:
      - operation:
          hosts:
          - "partner-app.example.com"
```

### ServiceEntry (Network Access)

When Istio hardened mode is enabled (`istio.hardened.enabled: true`), a ServiceEntry is automatically created for each additional issuer to allow outbound HTTPS traffic to the JWKS endpoint:

```yaml
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: partner-idp-example-com-issuer
spec:
  hosts:
    - partner-idp.example.com
  location: MESH_EXTERNAL
  ports:
    - number: 443
      protocol: TLS
      name: https
```
