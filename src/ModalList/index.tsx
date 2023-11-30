import { List, Modal, ModalProps } from 'antd';
import React, { useImperativeHandle, useState } from 'react';

interface IProps<T extends Record<string, any> = Record<string, any>> {
  data?: T[];
  renderItem: ((item: T, index: number) => React.ReactNode) | undefined;
  modalListRef?: React.MutableRefObject<modalListRefType<T> | undefined>;
  ModalProps?: ModalProps;
}
export type modalListRefType<
  T extends Record<string, any> = Record<string, any>,
> = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setDataSource: React.Dispatch<React.SetStateAction<T[] | undefined>>;
};
const ModalList = <T extends Record<string, any>>(props: IProps<T>) => {
  const { data, modalListRef, renderItem, ModalProps } = props;
  const [show, setShow] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<T[] | undefined>(data);

  useImperativeHandle(
    modalListRef,
    () => {
      return {
        setShow,
        setDataSource,
      };
    },
    [modalListRef],
  );
  return (
    <Modal
      open={show}
      onCancel={() => {
        setShow(false);
      }}
      footer={null}
      width={300}
      {...ModalProps}
    >
      <List dataSource={dataSource} renderItem={renderItem} />
    </Modal>
  );
};

export default ModalList;
