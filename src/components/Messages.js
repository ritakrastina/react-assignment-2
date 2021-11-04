import { Fragment } from "react";

const Messages = ({ type, text, object, onClose }) => {
  return (
    <Fragment>
      {type && (
        <div className="messages-container">
          <button className="button-close" onClick={onClose}>
            Close messages
          </button>
          <div className={`message-${type}`}>
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
        </div>
      )}
    </Fragment>
  );
};

export default Messages;
