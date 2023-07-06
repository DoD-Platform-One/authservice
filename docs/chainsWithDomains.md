# Chains with Domains

When setting chains it may be helpful to template the URLs if you need to use the same configuration for multiple environments.

You can do this as seen below:

```yaml
addons:
  authservice:
    chains:
      helloWorld:
        match:
          prefix: helloworld.{{ .Values.domain }}
        client_id: <redacted>
        client_secret: ""
        callback_uri: https://helloworld.{{ .Values.domain }}/login/generic_oauth
```

This will then use the value you set in `domain` as part of your URI / Prefix.
