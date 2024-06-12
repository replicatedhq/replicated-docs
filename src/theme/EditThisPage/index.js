/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import ReportIcon from "../../../static/images/report.svg";
import PullRequestIcon from "../../../static/images/git-pull-request.svg";
import styles from "./styles.module.css";

export default function EditThisPage({ editUrl }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const issueTitle =
    typeof window !== "undefined"
      ? url.substring(url.lastIndexOf("/") + 1)
      : "";

  return (
    <div className={styles.githubLinksWrapper}>
      <a
        href={editUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={ThemeClassNames.common.editThisPage}
        style={{ textDecoration: "none" }}
      >
        <div className={styles.iconTextWrapper}>
          <PullRequestIcon className={styles.icon} />
          <Translate
            id="theme.common.editThisPage"
            description="The link label to edit the current page"
          >
            Propose Changes
          </Translate>
        </div>
      </a>
      <a
        href={`https://github.com/replicatedhq/replicated-docs/issues/new?title=Docs%20feedback%20on%20${issueTitle}&body=URL:%20${url}%0AFeedback%20details:`}
        target="_blank"
        rel="noreferrer noopener"
        className={ThemeClassNames.common.editThisPage}
        style={{ textAlign: "right", textDecoration: "none" }}
      >
        <div className={styles.iconTextWrapper}>
          <ReportIcon className={styles.icon} />
          <Translate
            id="theme.common.provideFeedback"
            description="The link label to provide feedback in github"
          >
            Provide Feedback
          </Translate>
        </div>
      </a>
    </div>
  );
}
