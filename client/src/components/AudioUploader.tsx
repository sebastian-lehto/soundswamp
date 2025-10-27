import React from "react";
import Dropzone from "react-dropzone";

interface Props {
  handleChange: (fileList: FileList) => Promise<void>;
}

const fileTypes = [".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"];

const AudioUploader: React.FC<Props> = ({ handleChange }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <Dropzone
        onDrop={(acceptedFiles) => handleChange(acceptedFiles as unknown as FileList)}
        accept={{ "audio/*": fileTypes }}
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
          const borderColor = isDragAccept
            ? "border-forest-400"
            : isDragReject
            ? "border-vermilion-500"
            : "border-forest-700";
          const bgColor = isDragActive
            ? "bg-forest-800/70"
            : "bg-forest-900/60";

          return (
            <div
              {...getRootProps()}
              className={`
                ${bgColor} ${borderColor} border-2
                rounded-lg p-6 flex flex-col items-center justify-center
                text-forest-200 text-center
                cursor-pointer transition-all duration-300
                hover:bg-forest-800/80 hover:scale-105
                shadow-inner shadow-forest-950/50
              `}
            >
              <input {...getInputProps()} />
              <p className="select-none">
                {isDragActive
                  ? "Drop it like it’s hot!"
                  : "Drag & drop an audio file here, or click to select"}
              </p>
              <p className="text-sm text-forest-400 mt-2">Supported: MP3, WAV, OGG, FLAC, AAC, M4A</p>
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

export default AudioUploader;