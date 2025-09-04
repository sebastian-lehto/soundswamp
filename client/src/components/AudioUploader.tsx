import React from "react";
import Dropzone from "react-dropzone";

interface Props {
    handleChange: (fileList: FileList) => Promise<void>;
}

const fileTypes = [".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"];

const AudioUploader: React.FC<Props> = ({handleChange}) => {
    return (
        <div className='fileuploader'>
        <Dropzone
          onDrop={(acceptedFiles) => handleChange(acceptedFiles as unknown as FileList)}
          accept={{ 'audio/*': fileTypes }}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
          const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`,
              })}
            >
              <input {...getInputProps()} />
              <p>Drag and drop a file or click to select</p>
            </div>
          );
        }}
        </Dropzone>
      </div>
    )
}




export default AudioUploader