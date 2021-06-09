# Authservice

## Overview

This package is a bundle of applications which create an OIDC proxy to provide SSO for other services running in the cluster.

#### Authservice

[Authservice](https://github.com/istio-ecosystem/authservice) is an implementation of [Envoy External Authorization](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_authz_filter), focused on delivering authN/Z solutions for Istio and Kubernetes. Authservice handles incoming authN/Z requests and delegates part of the OIDC token-granting workflow to the backend SSO provider.

#### HAProxy

[HAProxy](http://www.haproxy.org/) is a commonly-used TCP/HTTP load balancer. Its function in this chart is to handle incoming HTTP requests and forward them to Authservice for authN/Z.

#### Redis

[Redis](https://redis.io/) is an in-memory data structure store, used as a database, cache, and message broker. It is optional to deploy and is used by Authservice to cache session data. See [backup.md](backup.md) for more details.

## Dependencies

This package depends on the [istio-controlplane](https://repo1.dso.mil/platform-one/big-bang/apps/core/istio-controlplane) and [istio-operator](https://repo1.dso.mil/platform-one/big-bang/apps/core/istio-operator) Big Bang packages.

## How it works

First, Authservice must be [enabled](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/values.yaml#L428) through the addons functionality of Big Bang. This will cause an instance of Authservice and HAProxy to be deployed into the `authservice` namespace. For every other Big Bang package that has SSO enabled ([e.g.](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/values.yaml#L428)), the respective application will redirect all unauthenticated requests to HAProxy which will then delegate the authN/Z request to Authservice and ultimately the backend SSO provider. All unauthenticated requests will ultimately be redirected to either the [authentication URL](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/values.yaml#L74) specified in the Big Bang values file or in an [individual chain](https://repo1.dso.mil/platform-one/big-bang/apps/core/authservice/-/blob/main/README.md#chains).
