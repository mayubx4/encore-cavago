import { Upload, UploadProps } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import React, { ReactNode } from 'react';

export default function FileSelect({
  children, onChange, value, ...props
}:
  UploadProps & { children: ReactNode; onChange: (file?: unknown) => void, value?: UploadFile }) {
  const onSelect = (file: RcFile) => {
    onChange(file);

    return false;
  };

  return (
    <Upload
      multiple={false}
      fileList={value && [value]}
      {...props}
      beforeUpload={onSelect}
      onRemove={() => onChange()}
    >
      {children}
    </Upload>
  );
}
