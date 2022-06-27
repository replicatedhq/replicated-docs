/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Translate from "@docusaurus/Translate";
import IconEdit from "@theme/IconEdit";
import FeedbackIcon from "../../../static/images/feedback-icon.svg";
import { ThemeClassNames } from "@docusaurus/theme-common";
export default function EditThisPage({ editUrl }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <a
        href={editUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={ThemeClassNames.common.editThisPage}
      >
        <IconEdit />
        <Translate
          id="theme.common.editThisPage"
          description="The link label to edit the current page"
        >
          Create pull request
        </Translate>
      </a>
      <a
        href={"https://github.com/replicatedhq/replicated-docs/issues/new"}
        target="_blank"
        rel="noreferrer noopener"
        className={ThemeClassNames.common.editThisPage}
        style={{ textAlign: "right" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FeedbackIcon width="28" height="26" style={{ marginRight: "8px" }} />
          <Translate
            id="theme.common.editThisPage"
            description="The link label to edit the current page"
          >
            Provide feedback in GitHub
          </Translate>
        </div>
      </a>
    </div>
  );
}
