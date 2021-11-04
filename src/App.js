import "./App.css";
import { useRef, useState } from "react";
import { readFileListData } from "./utils/fileReader";
import { postEmails } from "./utils/api";
import FileSelector from "./components/FileSelector";
import Messages from "./components/Messages";
import Loading from "./components/Loading";

function App() {
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const fileSelectorRef = useRef();

  const clearMessages = () => {
    setMessage({});
  };

  const sendEmails = async () => {
    clearMessages();

    const validFileList = fileSelectorRef.current?.getValidFileList() || [];

    if (!validFileList.length) {
      setMessage({
        type: "info",
        text: "No valid files added",
        object: {},
      });
    } else {
      setLoading(true);

      try {
        const emailList = await readFileListData(validFileList);
        const postEmailsResponse = await postEmails(emailList);

        setLoading(false);

        if (postEmailsResponse.error) {
          setMessage({
            type: "error",
            text: "There was an error:",
            object: postEmailsResponse,
          });
        } else {
          fileSelectorRef.current?.clearFileList();
          setMessage({
            type: "success",
            text: "Emails sent successfully!",
            object: {},
          });
        }
      } catch (error) {
        setLoading(false);
        setMessage(error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Email file manager</h1>
      <FileSelector ref={fileSelectorRef} />

      <div className="button-container">
        <span className="button-info-text">*only valid files are used</span>
        <button className="button-send" onClick={() => sendEmails()}>
          Send emails
        </button>
      </div>

      <Loading loading={loading} />
      <Messages {...message} onClose={clearMessages} />
    </div>
  );
}

export default App;
