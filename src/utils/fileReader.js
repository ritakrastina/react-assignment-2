function readFileData(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      // event.target points to FileReader
      const content = event.target.result;
      const lines = content
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => /\S+/.test(item));

      resolve(lines);
    };
    reader.readAsText(file);
  });
}

function readFileListData(fileList) {
  return new Promise((resolve) => {
    const promises = [];

    fileList.forEach((file) => {
      promises.push(readFileData(file));
    });

    Promise.all(promises).then((values) => {
      resolve(values.flat());
    });
  });
}

export { readFileListData };
