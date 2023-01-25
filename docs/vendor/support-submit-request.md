# Submitting a Support Request

You can submit a support request and a support bundle using the Replicated vendor portal. Uploading a support bundle is secure and helps the Replicated support team troubleshoot your application faster. Severity 1 issues are resolved three times faster when you submit a support bundle with your support request.

:::note

If your customer cannot generate a support bundle using the admin console and needs an alternative method, see [Generating Support Bundles](/enterprise/troubleshooting-an-app).
:::

### Prerequisites

The following prerequisites must be met to submit support requests:

* Your vendor portal account must be configured for access to support before you can submit support requests. Contact your administrator to ensure that you are added to the correct team.

* Your team must have a replicated-collab repository configured. If you are a team administrator and need information about getting a collab repository set up and adding users, see [Adding Users to the Collab Repository](team-management-github-username#add).


### Submit a Support Request

To submit a support request:

1. From the [vendor portal](https://vendor.replicated.com), click **Support > Submit a Support Request** or go directly to the [Support page](https://vendor.replicated.com/support).

1. In section 1 of the Support Request form, complete the fields with information about your issue.

1. In section 2, do _one_ of the following actions:
    - Use your pre-selected support bundle or select a different bundle in the pick list
    - Select **Upload and attach a new support bundle** and attach a bundle from your file browser

    <!-- - Select **I'm unable to generate a support bundle** and do the following in the user interface:

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
        - iptables -L -v-->
1. Click **Submit Support Request**. You receive a link to your support issue, where you can interact with the support team.

  :::note
  Click **Back** to exit without submitting a support request.
  :::
