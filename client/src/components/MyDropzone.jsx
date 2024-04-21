import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import "./MyDropzone.css";

// npm install --save react-dropzone

export default function MyDropzone({
  onUploadFile,
  uploadStatus,
  resetUploadStatus,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadInvalid, setUploadInvalid] = useState(false);
  const previewRef = useRef(null);

  const accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "video/mp4": [".mp4"],
  };

  function handleDrop(acceptedFiles, fileRejections) {
    resetUploadStatus();

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }

    if (acceptedFiles.length) {
      setSelectedFile(acceptedFiles[0]);
      setUploadInvalid(false);
      previewRef.current = URL.createObjectURL(acceptedFiles[0]);
    } else if (fileRejections.length) {
      setSelectedFile(null);
      setUploadInvalid(true);
    }
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    };
  }, []);

  async function handleUploadClick() {
    onUploadFile(selectedFile);
  }

  const isUploading = uploadStatus === "loading";
  const isUploaded = uploadStatus === "success";
  const isUploadButtonDisabled = uploadStatus === "loading" || !selectedFile;

  return (
    <Dropzone onDrop={handleDrop} accept={accept} maxFiles="1">
      {({ getRootProps, getInputProps }) => (
        <div className="mt-4">
          <div
            className="border-4"
            style={{ cursor: "pointer", borderStyle: "dashed" }}
          >
            <div
              {...getRootProps({ className: "p-3 link-secondary text-center" })}
            >
              <input {...getInputProps()} />
              <p className="m-0">Drag a file or click to select it</p>
              <small
                className={`${
                  uploadInvalid ? "text-danger fw-bold" : "text-body-tertiary"
                }`}
              >
                (Please upload a single photo (JPEG/PNG) or video (MP4))
              </small>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUploadClick}
            className="btn btn-primary mt-2"
            disabled={isUploadButtonDisabled}
          >
            {uploadStatus === "loading" ? "Uploading..." : "Upload"}
          </button>

          {selectedFile && (
            <div className="card d-flex mt-4">
              <div className="card-body">
                <div className="d-flex justify-content-start">
                  {selectedFile.type.startsWith("image/") ? (
                    <img
                      src={previewRef.current}
                      width="200px"
                      className="img-thumbnail"
                      alt="Preview"
                    />
                  ) : (
                    <video
                      src={previewRef.current}
                      width="200px"
                      controls
                      className="img-thumbnail"
                    />
                  )}
                  <div className="p-2 ps-4 d-flex flex-column justify-content-start">
                    <span className="fs-4" >{selectedFile.name}</span>
                    {isUploading && (
                      <span className="text-body-tertiary">⌛Uploading...</span>
                    )}
                    {isUploaded && (
                      <span className="text-success">✅Uploaded!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
}
