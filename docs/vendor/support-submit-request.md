# Submitting a Support Request

You can submit a support request with or without a support bundle using the Replicated vendor portal. Uploading a support bundle is secure and helps the Replicated support team troubleshoot your application faster.

If you or your customer are unable to generate a support bundle, you can submit the request without a support bundle and the support team will assist you.

For more information about how to generate a support bundle using either the Replicated admin console or the kubectl CLI, see [Troubleshooting an Application](https://docs.replicated.com/enterprise/troubleshooting-an-app).

To submit a support request:

1. From the [vendor portal](https://vendor.replicated.com), click **Support > Submit a Support Request** or go directly to the [Support page](https://vendor.replicated.com/support).

1. In section 1 of the Support Request form, complete the fields with information about your issue.

1. In section 2, do _one_ of the following actions:

    - Use your pre-selected support bundle or select a different bundle in the pick list
    - Select **Upload and attach a new support bundle** and attach a bundle from your file browser
    - Select **I'm unable to generate a support bundle** and do the following in the user interface:

      - Describe any procedures that led to the failure, including playbooks or scripts that were used

      - Gather the following information using kubectl and attach it to the support request:
        - Logs from the failed support bundle collection
        - Output from `kubectl get po -A`
        - Kubernetes installer information using `kubectl get installers -o yaml`
        - Logs from all pods that are not in Ready status
        - Logs from any Ceph Operator or Longhorn  pods
        - Logs from all pods in the kube-system namespace

      - Gather the following cluster node information and attach it to the support request:
        - uptime
        - cat /etc/*-release
        - uname -a
        - docker info
        - crictl info
        - df -kh
        - sestatus
        - systemctl status firewalld
        - systemctl status kubelet
        - systemctl status k3s
        - systemctl status docker (if you use Docker as the container runtime)
        - systemctl status containerd (if you use Containerd as the container runtime)
        - crictl ps -a
        - docker ps -a
        - journalctl -u kubelet –no-pager
        - journalctl -u docker –no-pager
        - iptables -L -v

1. Click **Submit Support Request**. You receive a link to your support issue, where you can interact with the support team.

  :::note
  Click **Back** to exit without submitting a support request.
  :::
