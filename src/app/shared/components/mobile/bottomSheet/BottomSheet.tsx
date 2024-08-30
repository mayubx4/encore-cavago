import { Button, Drawer } from 'antd';
import React, { ReactNode, useState } from 'react';
import './_bottomSheet.scss';

export interface BottomSheetStateProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}
export function useBottomSheet(defaultOpen?: boolean) {
  const [open, setOpen] = useState(!!defaultOpen);

  return {
    open, setOpen,
  };
}

export default function BottomSheet({
  title,
  bottomButtons,
  onClose,
  children,
  open,
  setOpen,
  className = '',
  fullscreen,
}: {
  children: ReactNode;
  onClose?: () => void;
  title: string | null,
  className?: string;
  fullscreen?: boolean;
  bottomButtons?: {
    title: string;
    loading?: boolean;
    onClick: () => void;
  }[]
} & BottomSheetStateProps) {
  return (
    <Drawer
      className={`bottomSheet ${className}`}
      title={null}
      placement="bottom"
      closable
      onClose={() => {
        onClose?.();
        setOpen(false);
      }}
      open={open}
      height="100%"
      styles={{ content: { borderRadius: fullscreen ? undefined : '20px 20px 0 0' }, header: { paddingBottom: 0, paddingLeft: 15, borderBottomWidth: 0 }, body: { padding: 20 } }}
      footer={
        bottomButtons && bottomButtons.map((b, i) => (
          <Button
            key={i}
            onClick={b.onClick}
            shape="round"
            loading={b.loading}
            className="saveButton"
          >
            {b.title}
          </Button>
        ))
      }
    >
      {title && (
        <h2 className="title">{title}</h2>
      )}
      <div className="body">
        {children}
      </div>
    </Drawer>
  );
}
