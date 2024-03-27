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
  required: boolean;
  fileInputRef?: React.RefObject<HTMLInputElement> | null;
  value?: null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({
  onFileSelect,
  fileReset = false,
  required,
  fileInputRef,
  value,
  onChange,
}: FileInputProps) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const fileMessage = event.target.files![0];
      if (!fileMessage) {
        return;
      }
      const formData = new FormData();
      formData.append("file", fileMessage);
      const response = await axios.post("/uploads", formData);
      onFileSelect({
        filePath: response.data.filePath,
        fileType: response.data.fileType,
      });
      if (fileInputRef && fileInputRef.current) {
        // fileRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (fileReset && fileRef.current) {
  //     console.log('should reset files')
  //     fileRef.current.files = null;
  //     fileRef.current.value = "";
  //   }
  // }, [fileReset]);

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
