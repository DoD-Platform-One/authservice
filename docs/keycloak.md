# Keycloak

This chart is meant to insert an authN/Z proxy in front of services in the cluster and forward or deny individual requests based on that. Access to this service does not need to be controlled by SSO directly and as such it does not need to be configured in that way; it does, however need to be configured to talk to an existing SSO backend (such as Keycloak) so that it can correctly proxy auth requests and provide SSO functionality to applications running in the cluster.

## Example Configurations

- https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/values.yaml#L51
- https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/dev-sso-values.yaml
- https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/chart/google-auth-example-values.yaml

