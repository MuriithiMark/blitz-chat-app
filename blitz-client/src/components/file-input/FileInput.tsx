import axios from "axios";
import { useEffect, useRef } from "react";

type FileInputProps = {
  onFileSelect: ({
    filePath,
    fileType,
  }: {
    filePath: string;
    fileType: string;
  }) => void;
  fileReset?: boolean;
  onFileResetUnset: () => void;
  required: boolean;
  fileInputRef?: React.RefObject<HTMLInputElement> | null;
  value?: null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputChange = React.ChangeEvent<HTMLInputElement>;

const FileInput = ({
  onFileSelect,
  fileReset = false,
  required,
  onFileResetUnset,
}: FileInputProps) => {

  const fileInputRef =  useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: InputChange) => {
    try {
      const fileMessage = event.target.files![0];
      if (!fileMessage) {
        return;
      }
      const formData = new FormData();
      formData.append("file", fileMessage);
      const response = await axios.post("/uploads", formData);

      // unset previous file reset
      onFileResetUnset();
      onFileSelect({
        filePath: response.data.filePath,
        fileType: response.data.fileType,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // resets the file input to null
    if (fileReset && fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [fileReset]);

  return (
    <div className="file-input">
      <input
        type="file"
        name="file-message"
        required={required}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileInput;
