import {
  Fragment,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

function FileSelector(props, ref) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // parrent calls to return and clear added file list
  useImperativeHandle(ref, () => ({
    getValidFileList: () => {
      return selectedFiles.filter((file) => !file.invalid);
    },
    clearFileList: () => {
      setSelectedFiles([]);
    },
  }));

  const fileInputRef = useRef();

  const dragOver = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files.length) {
      handleFiles(files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current?.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current?.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const exists = selectedFiles.find((item) => item.name === files[i].name);
      if (!exists) {
        if (files[i].type !== "text/plain") files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const deleteFile = (name) => {
    const indx = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(indx, 1);
    setSelectedFiles([...selectedFiles]);
  };

  return (
    <Fragment>
      <div
        className="drop-container"
        onDragOver={dragOver}
        onDrop={fileDrop}
        onClick={fileInputClicked}
      >
        <div className="drop-message">
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
          Click here or Drag & drop files to upload
        </div>
      </div>

      <div className="file-list-container">
        {selectedFiles.map((file, indx) => (
          <div className="file-row" key={indx}>
            <button
              className="button-delete"
              title="Delete file"
              onClick={() => deleteFile(file.name)}
            >
              x
            </button>
            {file.invalid ? (
              <Fragment>
                <span className="strike-through">{file.name}</span>
                <span className="file-error-message">(File is not valid)</span>
              </Fragment>
            ) : (
              file.name
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default forwardRef(FileSelector);
