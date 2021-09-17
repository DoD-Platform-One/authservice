# Authservice

## Overview

This package is a bundle of applications which create an OIDC proxy to provide SSO for other services running in the cluster.

#### Authservice

[Authservice](https://github.com/istio-ecosystem/authservice) is an implementation of [Envoy External Authorization](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_authz_filter), focused on delivering authN/Z solutions for Istio and Kubernetes. Authservice handles incoming authN/Z requests and delegates part of the OIDC token-granting workflow to the backend SSO provider.

#### Redis

[Redis](https://redis.io/) is an in-memory data structure store, used as a database, cache, and message broker. It is optional to deploy and is used by Authservice to cache session data. See [backup.md](backup.md) for more details.

## Dependencies

This package depends on the [istio-controlplane](https://repo1.dso.mil/platform-one/big-bang/apps/core/istio-controlplane) and [istio-operator](https://repo1.dso.mil/platform-one/big-bang/apps/core/istio-operator) Big Bang packages.

## How it works

First, Authservice must be [enabled](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/tree/master/chart/values.yaml#L511) through the addons functionality of Big Bang. This will cause an instance of Authservice to be deployed into the `authservice` namespace. For every workload in the cluster that is labeled with the value of the [selector](https://repo1.dso.mil/platform-one/big-bang/apps/core/authservice/-/blob/main/chart/values.yaml#L160), the respective application will then redirect all requests through Authservice which will then validate a user through the backend SSO provider and then foward to the workload as normal. Each workload placed behind authservice must have a matching [individual chain](https://repo1.dso.mil/platform-one/big-bang/apps/core/authservice/-/tree/main/README.md#chains).

Please review the BigBang [Architecture Document](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/charter/packages/authservice/Architecture.md) for more information about it's role within BigBang.
