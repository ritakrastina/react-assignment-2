import { Fragment } from "react";

const Messages = ({ type, text, object, onClose }) => {
  return (
    <Fragment>
      {type && (
        <div className={`message-${type}`}>
          <button
            className="button-close"
            onClick={onClose}
            title="Close messages"
          >
            x
          </button>
          {text}
          {object && (
            <span>
              <span> {object.error}</span>
              <ul>
                {object.emails?.map((email, indx) => (
                  <li key={indx}>{email}</li>
                ))}
              </ul>
            </span>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Messages;
