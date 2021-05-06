import React, { useRef } from 'react';

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children?: React.ReactNode;
}

function FileUpload({ setFile, accept, children }: FileUploadProps) {
  const ref = useRef<HTMLInputElement>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
}

export default FileUpload;
