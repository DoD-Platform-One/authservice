# Authservice

## Overview

[Authservice](https://github.com/istio-ecosystem/authservice) is an implementation of [Envoy External Authorization](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_authz_filter), focused on delivering authN/Z solutions for Istio and Kubernetes. Big Bang uses Authservice as an OIDC proxy for providing SSO to other services running in the cluster, including other Big Bang packages such as Kibana and Grafana.

## Dependencies

Authservice depends on the [istio-controlplane](https://repo1.dso.mil/platform-one/big-bang/apps/core/istio-controlplane) and [istio-operator](https://repo1.dso.mil/platform-one/big-bang/apps/core/istio-operator) Big Bang packages.

## How it works

First, Authservice must be [enabled](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/values.yaml#L428) through the addons functionality of Big Bang. This will cause an instance of Authservice to be deployed into its own `authservice` namespace. For every other Big Bang package that has SSO enabled ([e.g.](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/values.yaml#L428)), Big Bang will edit the VirtualService for that application and point it to Authservice as opposed to the actual service on the backend so that it will intercept and authenticate incoming traffic. All unauthenticated requests will be redirected to the [authentication URL](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/values.yaml#L74) specified in the Big Bang values file and prompt the user to authenticate to the SSO service for that environment.
