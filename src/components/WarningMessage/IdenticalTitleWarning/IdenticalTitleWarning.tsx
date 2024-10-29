import React, { SetStateAction } from "react";
import {WarningMessage} from "../WarningMessage";

type Props = {
  fileTitle: string;
  setShowWarning: React.Dispatch<SetStateAction<boolean>>;
  warningType: string;
};

export const IdenticalTitleWarning = ({
  fileTitle,
  setShowWarning,
  warningType,
}: Props) => {
  return (
    <WarningMessage setShowWarning={setShowWarning}>
      <div className="delete-document-warning">
        <h4>Error: Identical Titles</h4>
        {warningType === "duplicate" && (
          <p>
            The title `{fileTitle.trim()}` is already being used for another one
            of your files. Please change it before saving.
          </p>
        )}
        {warningType === "dot" && (
          <p>
            The title `{fileTitle.trim()}` contains a dot . somewhere in the
            title. Titles cannot contain dots/periods. Please remove before
            saving.
          </p>
        )}
        {warningType === "blank" && (
          <p>
            The title for this document is currently blank. Please give this
            document a title before saving.
          </p>
        )}
        <button className="reg-button" onClick={() => setShowWarning(false)}>
          Confirm
        </button>
      </div>
    </WarningMessage>
  );
};
