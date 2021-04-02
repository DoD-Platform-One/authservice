# Node Affinity & Anti-Affinity with Authservice

Affinity is exposed through values options for the Authservice. If you want to schedule your pods to deploy on specific nodes you can do that through the `affinity` value. Additional info is provided below as well to help in configuring this.

It is good to have a basic knowledge of node affinity and available options to you before customizing in this way - the upstream kubernetes documentation [has a good walkthrough of this](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity).

## Values for Affinity

The `affinity` value at the top level should be used to specify affinity. The format to include follows what you'd specify at a pod/deployment level. See the example below for scheduling the operator pods only to nodes with the label `node-type` equal to `authservice`:

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: node-type
          operator: In
          values:
          - authservice
```

## Values for Anti-Affinity

The `affinity` value at the top level for Authservice can be set in the same way to schedule pods based on anti-affinity. Since Authservice defaults to deploying with just 1 replica, the below example shows how to schedule authservice pods to not be scheduled to nodes with pods that are labeled `dont-schedule-with: authservice`. Alternatively if scaling up Authservice you could make use of the labels on the authservice pods to distribute them across separate nodes.

```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - topologyKey: "kubernetes.io/hostname"
        labelSelector:
          matchLabels:
            dont-schedule-with: authservice
```
