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

    1. If you haven't authorized helm to access the Harbor registry, you can do so with `helm registry login registry1.dso.mil`.
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

# Testing new Authservice version

## Cluster setup

⚠️ Always make sure your local bigbang repo is current before deploying.

1. Export your Ironbank/Harbor credentials (this can be done in your `~/.bashrc` or `~/.zshrc` file if desired). These specific variables are expected by the `k3d-dev.sh` script when deploying metallb (part of the `-a` flag), and are referenced in other commands for consistency:

    ```sh
    export REGISTRY_USERNAME='<your_username>'
    export REGISTRY_PASSWORD='<your_password>'
    ```

1. Export the path to your local bigbang repo (without a trailing `/`):

   ⚠️ Note that wrapping your file path in quotes when exporting will break expansion of `~`.

    ```sh
    export BIGBANG_REPO_DIR=<absolute_path_to_local_bigbang_repo>
    ```

    e.g.

    ```sh
    export BIGBANG_REPO_DIR=~/repos/bigbang
    ```

1. Run the [k3d_dev.sh](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/assets/scripts/developer/k3d-dev.sh) script to deploy a dev cluster (`-a` flag required if deploying a local Keycloak):

    For `login.dso.mil` Keycloak:

    ```sh
    "${BIGBANG_REPO_DIR}/docs/assets/scripts/developer/k3d-dev.sh"
    ```

    For local `keycloak.dev.bigbang.mil` Keycloak (`-a` deploys instance with a second public IP and metallb):

    ```sh
    "${BIGBANG_REPO_DIR}/docs/assets/scripts/developer/k3d-dev.sh -a"
    ```

1. Export your kubeconfig:

    ```sh
    export KUBECONFIG=~/.kube/<your_kubeconfig_file>
    ```

    e.g.

    ```sh
    export KUBECONFIG=~/.kube/Christopher.Galloway-dev-config
    ```

1. [Deploy flux to your cluster](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/scripts/install_flux.sh):

    ```sh
    "${BIGBANG_REPO_DIR}/scripts/install_flux.sh -u ${REGISTRY_USERNAME} -p ${REGISTRY_PASSWORD}"
    ```

## Deploy Bigbang

   ⚠️ Note that testing against your local branch or tag is only possible if you edit the overrides file to point to your changes.

From the root of this repo, run one of the following deploy commands depending on which Keycloak you wish to reference:

For `login.dso.mil` Keycloak:

  ```sh
  helm upgrade -i bigbang ${BIGBANG_REPO_DIR}/chart/ -n bigbang --create-namespace \
  --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/tests/test-values.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/chart/ingress-certs.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/docs/assets/configs/example/dev-sso-values.yaml \
  -f docs/dev-overrides/minimal.yaml \
  -f docs/dev-overrides/authservice-testing.yaml
  ```

For local `keycloak.dev.bigbang.mil` Keycloak:

  ```sh
  helm upgrade -i bigbang ${BIGBANG_REPO_DIR}/chart/ -n bigbang --create-namespace \
  --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/tests/test-values.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/chart/ingress-certs.yaml \
  -f docs/dev-overrides/minimal.yaml \
  -f docs/dev-overrides/authservice-testing-local-keycloak.yaml
  ```

This will deploy the following apps for testing (while disabling non-essential apps):

- Istio, Istio operator and Authservice
- Jaeger and Monitoring (specifically, Prometheus), with SSO enabled
- Optionally Keycloak

## Validation/Testing Steps

1. If you deployed with local keycloak enabled, login to [https://keycloak.dev.bigbang.mil/auth/admin/master/console/](https://keycloak.dev.bigbang.mil/auth/admin/master/console/) as the default admin user and set up a user account that can log into monitoring. You can find basic keycloak admin instructions [here](https://repo1.dso.mil/big-bang/product/packages/keycloak/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md?ref_type=heads). IMPORTANT: To perform the next testing step successfully you must:

- Create this account in the baby-yoda realm, not in the master realm.
- Add the user to the "Impact Level 2 Authorized" group.

1. Navigate to [Jaeger](https://tracing.dev.bigbang.mil/) and validate that you are prompted to login with SSO and that the login is successful. This verifies that Authservice is working as an Istio extension.
1. Navigate to [Prometheus](https://prometheus.dev.bigbang.mil) (also uses Authservice) and validate that you are prompted to login with SSO and that the login is successful.

- If you deployed with local keycloak enabled, make sure it's `keycloak.dev.bigbang.mil` and not `login.dso.mil`.

### automountServiceAccountToken

The mutating Kyverno policy named [update-automountserviceaccounttokens](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads#L679) is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`.

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.

# Modifications made to upstream chart

This section has nothing in it because this chart is basically all custom.
