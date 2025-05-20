const homePageCards = [
  {
    id: "whats-new",
    header: {
      title: "What's New?",
      subtitle: "Configure the Kubelet with Embedded Cluster",
      icon: {
        src: "/images/icons/chat_bubble.png",
        darkModeSrc: "/images/icons/chat_bubble_white.png",
        alt: "chat bubble icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Use the Embedded Cluster Config to change the Kubelet configuration based on your application's needs.",
    links: [
      {
        text: "Learn more",
        url: "/reference/embedded-config#configure-the-kubelet"
      }
    ]
  },
  {
    id: "did-you-know",
    header: {
      title: "Did You Know?",
      subtitle: "Customize the SDK with Helm Values",
      icon: {
        src: "/images/icons/lightbulb.png",
        darkModeSrc: "/images/icons/lightbulb_white.png",
        alt: "lightbulb icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "The Replicated SDK's Helm values support various configuration options, like adding custom annotations across all resources, defining container resource requirements, and more.",
    links: [
      {
        text: "Learn more",
        url: "/vendor/replicated-sdk-customizing"
      }
    ]
  },
  {
    id: "getting-started",
    header: {
      title: "Getting Started with Replicated",
      icon: {
        src: "images/icons/alien_vault.png",
        alt: "ufo icon",
        width: "55px", 
        height: "55px"
      }
    },
    description: "Onboarding workflows, tutorials, and labs to help you get started with Replicated quickly.",
    links: [
      { text: "Introduction to Replicated", url: "intro-replicated" },
      { text: "Replicated FAQs", url: "/vendor/kots-faq" },
      { text: "Replicated Onboarding", url: "/vendor/replicated-onboarding" },
      { text: "Tutorials", url: "/vendor/tutorial-embedded-cluster-setup" }
    ]
  },
  {
    id: "vendor-platform",
    header: {
      title: "Vendor Platform",
      icon: {
        src: "images/icons/vendor_portal_1.png",
        alt: "vendor portal icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Create and manage your account and team.",
    links: [
      { text: "Create a Vendor Account", url: "/vendor/vendor-portal-creating-account" },
      { text: "Manage Team Members", url: "/vendor/team-management#invite-members" },
      { text: "Configure RBAC Policies", url: "/vendor/team-management-rbac-configuring" }
    ]
  },
  {
    id: "compatibility-matrix",
    header: {
      title: "Compatibility Matrix",
      icon: {
        src: "images/icons/release.png",
        alt: "rocket ship icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Rapidly create Kubernetes clusters, including OpenShift.",
    links: [
      { text: "About Compatibility Matrix", url: "/vendor/testing-about" },
      { text: "Use Compatibility Matrix", url: "/vendor/testing-how-to" },
      { text: "Supported Cluster Types", url: "/vendor/testing-supported-clusters" },
      { text: "Cluster Add-ons", url: "/vendor/testing-cluster-addons" },
      { text: "Recommended CI/CD Workflows", url: "/vendor/ci-workflows" }
    ]
  },
  {
    id: "helm-charts",
    header: {
      title: "Helm Charts",
      icon: {
        src: "images/icons/helm-logo.png",
        alt: "helm logo",
        className: "helm-logo"
      }
    },
    description: "Distribute Helm charts with Replicated.",
    links: [
      { text: "Install with Helm", url: "/vendor/install-with-helm" },
      { text: "Package a Helm Chart for a Release", url: "/vendor/helm-install-release" },
      { text: "About the Replicated SDK", url: "/vendor/replicated-sdk-overview" }
    ]
  },
  {
    id: "kots",
    header: {
      title: "Replicated KOTS",
      icon: {
        src: "images/icons/admin.png",
        alt: "kots icon"
      }
    },
    description: "A kubectl plugin and in-cluster Admin Console that installs applications in customer-controlled environments.",
    links: [
      { text: "Introduction to KOTS", url: "intro-kots" },
      { text: "About Distributing Helm Charts with KOTS", url: "/vendor/helm-native-about" }
    ]
  },
  {
    id: "embedded-cluster",
    header: {
      title: "Embedded Cluster",
      icon: {
        src: "images/icons/k8s_installer.png",
        alt: "installer icon"
      }
    },
    description: "Embed Kubernetes with your application to support installations on VMs or bare metal servers.",
    links: [
      { text: "Embedded Cluster Overview", url: "/vendor/embedded-overview" },
      { text: "Install with Embedded Cluster", url: "/enterprise/installing-embedded" },
      { text: "Tutorial: Deploy a Helm Chart on a VM with Embedded Cluster", url: "/vendor/tutorial-embedded-cluster-setup" }
    ]
  },
  {
    id: "insights-telemetry",
    header: {
      title: "Insights and Telemetry",
      icon: {
        src: "images/icons/dashboard_1.png",
        alt: "dashboard icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Get insights on installed instances of your application.",
    links: [
      { text: "About Instance and Event Data", url: "/vendor/instance-insights-event-data" },
      { text: "Adoption Report", url: "/vendor/customer-adoption" },
      { text: "Instance Details", url: "/vendor/instance-insights-details" },
      { text: "Configure Custom Metrics", url: "/vendor/custom-metrics" }
    ]
  },
  {
    id: "channels-releases",
    header: {
      title: "Channels and Releases",
      icon: {
        src: "images/icons/vendor_portal_2.png",
        alt: "vendor portal icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Manage application releases with the vendor platform.",
    links: [
      { text: "About Channels and Releases", url: "/vendor/releases-about" },
      { text: "Manage Releases with the Vendor Portal", url: "/vendor/releases-creating-releases" },
      { text: "Manage Releases with the CLI", url: "/vendor/releases-creating-cli" }
    ]
  },
  {
    id: "customer-licensing",
    header: {
      title: "Customer Licensing",
      icon: {
        src: "images/icons/licensing.png",
        alt: "licensing icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Create, customize, and issue customer licenses.",
    links: [
      { text: "About Customers", url: "/vendor/licenses-about" },
      { text: "Create and Manage Customers", url: "/vendor/releases-creating-customer" },
      { text: "Manage Customer License Fields", url: "/vendor/licenses-adding-custom-fields" }
    ]
  },
  {
    id: "preflight-checks",
    header: {
      title: "Preflight Checks",
      icon: {
        src: "images/icons/checklist.png",
        alt: "checklist icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Define and verify installation environment requirements.",
    links: [
      { text: "Define Preflight Checks", url: "/vendor/preflight-defining" },
      { text: "Run Preflight Checks for Helm Installations", url: "/vendor/preflight-running" },
      { text: "Preflight Checks Tutorial for Helm Charts", url: "/vendor/tutorial-preflight-helm-setup" },
      { text: "Preflight Checks Lab in Instruqt", url: "https://play.instruqt.com/embed/replicated/tracks/avoiding-installation-pitfalls?token=em_gJjtIzzTTtdd5RFG" }
    ]
  },
  {
    id: "support-bundles",
    header: {
      title: "Support Bundles",
      icon: {
        src: "images/icons/support_bundle.png",
        alt: "support bundle icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "Gather information about customer environments for troubleshooting.",
    links: [
      { text: "Add and Customize Support Bundles", url: "vendor/support-bundle-customizing" },
      { text: "Configure Host Support Bundles", url: "/vendor/support-host-support-bundles" },
      { text: "Generate Support Bundles", url: "/vendor/support-bundle-generating" },
      { text: "Support Bundles Lab in Instruqt", url: "https://play.instruqt.com/embed/replicated/tracks/closing-information-gap?token=em_MO2XXCz3bAgwtEca" }
    ]
  },
  {
    id: "developer-tools",
    header: {
      title: "Developer Tools",
      icon: {
        src: "images/icons/tools.png",
        alt: "carpenter tools icon",
        width: "55px",
        height: "55px"
      }
    },
    description: "APIs, CLIs, and an SDK for interacting with the Replicated platform.",
    links: [
      { text: "Install the Replicated CLI", url: "/reference/replicated-cli-installing" },
      { text: "Use the Vendor API v3", url: "/reference/vendor-api-using" },
      { text: "Install the KOTS CLI", url: "/reference/kots-cli-getting-started" },
      { text: "Replicated SDK", url: "/vendor/replicated-sdk-overview" },
      { text: "Replicated SDK API", url: "/reference/replicated-sdk-apis" }
    ]
  }
];

export default homePageCards; 