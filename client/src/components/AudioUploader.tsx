import React from "react";
import { FileUploader } from "react-drag-drop-files";

interface Props {
    handleChange: any;
}

const fileTypes = ["MP3", "WAV"]

const AudioUploader: React.FC<Props> = ({handleChange}) => {
    return (
        <div className='fileuploader'>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
    )
}




export default AudioUploader