import { Modal, ModalProps } from 'antd';
import { Base64 } from 'js-base64';
import React, { useEffect, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';
export interface ModalViewProps {
  open: boolean;
  url: string;
  modalProps?: ModalProps;
}
export type ModalViewType = {
  open: (url: string, modalProps?: ModalProps) => void;
  remove: () => void;
};

const ModalView: React.FC<ModalViewProps> & ModalViewType = ({
  open: modalOpen,
  url,
  modalProps,
}: ModalViewProps) => {
  const [open, setOpen] = useState<boolean>(!!modalOpen);
  useEffect(() => {
    if (!open) ModalView.remove();
  }, [open]);
  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      width={'70%'}
      title="文件预览"
      footer={null}
      {...modalProps}
    >
      <embed
        src={
          'http://lookfile.lantao.work/onlinePreview?url=' +
          encodeURIComponent(Base64.encodeURI(url))
        }
        style={{
          height: 700,
          width: '100%',
        }}
      />
    </Modal>
  );
};

let root: Root;
ModalView.open = (url, modalProps) => {
  let lands_ModalView = document.getElementById('lands_ModalView');
  if (!lands_ModalView) {
    lands_ModalView = document.createElement('div');
    lands_ModalView.id = 'lands_ModalView';
    document.body.append(lands_ModalView);
  }
  root = createRoot(lands_ModalView);
  root.render(<ModalView open={true} url={url} modalProps={modalProps} />);
};
ModalView.remove = () => {
  root.unmount();
  const lands_ModalView = document.getElementById('lands_ModalView');
  if (lands_ModalView) {
    document.body.removeChild(lands_ModalView);
  }
};
export default ModalView;
