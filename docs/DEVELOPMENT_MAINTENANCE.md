# How to upgrade the Authservice Package chart

The Authservice chart is mostly custom, but a vague origin can be found [here](https://github.com/istio-ecosystem/authservice/tree/master/bookinfo-example/authservice). That being said, updates to the chart resources are almost all custom, so the modifications to upstream section will be empty.

Most of the renovate work is going to be bumping the redis or authservice version in `Chart.yaml`.

---
1. Checkout the `renovate/ironbank` branch.
1. Find the latest [redis chart version on harbor](https://registry1.dso.mil/harbor/projects/133/repositories/redis/artifacts-tab).
1. Bump the version redis in `chart/Chart.yaml` at `.dependencies["redis"].version`. Renovate may have done this for you.
1. Run a helm dependency command to update the `chart/charts/*.tgz` archives and create a new Chart.lock file. You will commit the tar archives along with the Chart.lock that was generated.
    ```bash
    helm dependency update ./chart
    ```
1. In `chart/Chart.yaml` update `annotations.'helm.sh/image'` entries to to the new versions. Renovate might have already done this for you.
    1. [Redis image on harbor.](https://registry1.dso.mil/harbor/projects/3/repositories/bitnami%2Fredis/artifacts-tab)
    1. [Authservice image on harbor.](https://registry1.dso.mil/harbor/projects/3/repositories/istio-ecosystem%2Fauthservice/artifacts-tab)
    1. Note the `.appversion`, `.version` before the `-bb.Y`, and `annotations.'bigbang.dev/applicationVersions["Authservice"]'` should match `annotations.'helm.sh/image'["authservice"].image` after the ':'.
        ```yaml
        version: X.X.X-bb.Y
        appVersion: X.X.X
        annotations:
          bigbang.dev/applicationVersions: |
            - Authservice: X.X.X
          helm.sh/images: |
            - name: authservice
              image: registry1.dso.mil/ironbank/istio-ecosystem/authservice:X.X.X
            - name: redis
              condition: redis.enabled
              image: registry1.dso.mil/ironbank/bitnami/redis:Z.Z.Z
        ```
    1. In `chart/values.yaml` the `image` entry should match the `chart/Chart.yaml` `annotations.'helm.sh/image'["authservice"].image`.
        ```yaml
        image:
          repository: registry1.dso.mil/ironbank/istio-ecosystem/authservice
          pullPolicy: IfNotPresent
          # -- Overrides the image tag whose default is the chart appVersion.
          tag: "X.X.X"
        ```
1. Update `CHANGELOG.md` with an entry for "upgrade authservice to redis version X.X.X chart version X.X.X-bb.Y". Or, whatever description is appropriate.
1. Update the `/README.md` following the [gluon library script](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).
1. Use a development environment to deploy and test Authservice. See more detailed testing instructions below. Also test an upgrade by deploying the old version first and then deploying the new version.
1. Update the `/README.md` again if you have made any additional changes during the upgrade/testing process.

# Testing a new Authservice version

1. Create a k8s dev environment. One option is to use the Big Bang [k3d-dev.sh](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/tree/master/docs/developer/scripts) with `-m` which will give you the default configuration with metallb. The following steps assume you are using the script.
1. Update your `/etc/hosts` as shown at the end of the script.
1. Run the sshuttle command given at the end of the script to support web/client connections to the metallb instances.
1. Follow the instructions at the end of the script to connect to the k8s cluster and install flux.
1. Deploy Bigbang with these dev values overrides. You can also disable other core apps for quicker deployment.
    1. `chart/ingress-certs.yaml`
    1. `docs/assets/configs/example/policy-overrides-k3d.yaml`
    1. Your registry values (e.g. `../overrides/registry-values.yaml`)
    1. `docs/assets/configs/example/keycloak-dev-values.yaml`
    1. `authservice.yaml` as shown below
        ```yaml
        # Enables and configures sso for all packages using the test bigbang.dev clients:
        sso:
          url: https://keycloak.bigbang.dev/auth/realms/baby-yoda
          name: P1 SSO
          # LetsEncrypt certificate authority for keycloak.bigbang.dev
          # Use this CA if you deployed Keycloak with *.bigbang.dev certificate using docs/assets/configs/example/keycloak-dev-values.yaml
          certificateAuthority:
            cert: |
              -----BEGIN CERTIFICATE-----
              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
              -----END CERTIFICATE-----
          saml:
            # Retrieve from https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/descriptor
            metadata: <md:EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:ds=http://www.w3.org/2000/09/xmldsig# entityID=https://login.dso.mil/auth/realms/baby-yoda><md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"><md:KeyDescriptor use="signing"><ds:KeyInfo><ds:KeyName>4CK69bW66HE2wph9VuBs0fTc1MaETSTpU1iflEkBHR4</ds:KeyName><ds:X509Data><ds:X509Certificate>MIICoTCCAYkCBgFyLIEqUjANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwHhcNMjAwNTE5MTAzNDIyWhcNMzAwNTE5MTAzNjAyWjAUMRIwEAYDVQQDDAliYWJ5LXlvZGEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCGIwvWSPD6zDbkGBpkjUDJ+BwJEE8ko8T7DC22prs03Gm2v/lEIEa4leoPKjenW+NxtvwqN0qdcjuRZ6vxvY/P9E/Wb9Bw+so7FKW6TsZkXwBGxzoU8ZvNiCLyjxwFVKxqaXodnOk3dmcfgMVnbuJ8z5SX8/IzFnZrB6iEhqLNen6uAXtGqlq/k1dTCZxLIfws/3Y1Ui4WUPcdhMMaixVt8D+78fblnhcIYpb+8sNM2uXw9wDceoigP681q/Kx3ECr8o3DuIstzQouyMVhJ0kv/ngftC5uwZHQDIissu6sluoC2+20YkrfyTldhYojBga27qKInCNJvtS2idV0+HxXAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAIVkoDYkM6ryBcuchdAL5OmyKbmmY4WDrMlatfa3uniK5jvFXrmVaJ3rcu0apdY/NhBeLSOLFVlC5w1QroGUhWm0EjAA4zyuU63Pk0sro0vyHrxztBrGPQrGXI3kjXEssaehZZvYP4b9VtYpus6oGP6bTmaDw94Zu+WrDsWdFs+27VEYwBuU0D6E+ENDGlfR+9ADEW53t6H2M3H0VsOtbArEutYgb4gmQcOIBygC7L1tGJ4IqbnhTYLh9DMKNklU+tq8TMHacps9FxELpeAib3O0J0E5zYXdraQobCCe+ao1Y7sA/wqcGQBCVuoFgty7Y37nNL7LMvygcafgqVDqw5U=</ds:X509Certificate></ds:X509Data></ds:KeyInfo></md:KeyDescriptor><md:ArtifactResolutionService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/resolve index="0"/><md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/><md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/><md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/><md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent</md:NameIDFormat><md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat><md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/><md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact" Location=https://login.dso.mil/auth/realms/baby-yoda/protocol/saml/></md:IDPSSODescriptor></md:EntityDescriptor>
        
        monitoring:
          enabled: true
          sso:
            enabled: true
            # these are likely the right values, but they can be pulled from keycloak once it starts up at https://keycloak.bigbang.dev/auth/admin/master/console/#/baby-yoda/clients
            prometheus:
              client_id: dev_00eb8904-5b88-4c68-ad67-cec0d2e07aa6_prometheus
            alertmanager:
              client_id: dev_00eb8904-5b88-4c68-ad67-cec0d2e07aa6_alertmanager
        
        addons:
          authservice:
            enabled: true
            sourceType: "git"
            git:
              repo: https://repo1.dso.mil/big-bang/product/packages/authservice.git
              path: chart
          keycloak:
            values:
              secrets:
                realm:
                  stringData:
                    realm.json: '{{ .Files.Get "resources/dev/baby-yoda-bb-ci.json" }}'
              # NOTE: this is to provide a tag for the init container in the keycloak-dev-values.yaml
              # If the init container get updated there it will need to be updated here as well
              extraInitContainers: |-
                - name: plugin
                  image: registry1.dso.mil/ironbank/big-bang/p1-keycloak-plugin:3.2.1
                  imagePullPolicy: Always
                  command:
                  - sh
                  - -c
                  - | 
                    cp /app/p1-keycloak-plugin.jar /init
                    ls -l /init
                  volumeMounts:
                  - name: plugin
                    mountPath: "/init"
        ```
1. Login to https://keycloak.bigbang.dev/auth/admin/master/console/ as the default admin user and set up a user account that can log into monitoring. You can find basic keycloak admin instructions [here](https://repo1.dso.mil/big-bang/product/packages/keycloak/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md?ref_type=heads). IMPORTANT: To perform the next testing step successfully you must:
- Create this account in the baby-yoda realm, not in the master realm. 
- Add the user to the "Impact Level 2 Authorized" group. 
7. Go to prometheus.bigbang.dev, you should be redirected to your local instance of keycloak for SSO (make sure it's not login.dso.mil).
7. If you have the appropriate persmissions you should be able to login and then get redirected back to prometheus.bigbang.dev.

### automountServiceAccountToken
The mutating Kyverno policy named [update-automountserviceaccounttokens](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads#L679) is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. 

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.

# Modifications made to upstream chart
This section has nothing in it because this chart is basically all custom.
