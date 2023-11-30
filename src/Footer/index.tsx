import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import React from 'react';
import { FooterProps } from './typing';

/** 网页底部的footer */
const Footer: React.FC<FooterProps> = (props) => {
  const {
    companyName = 'lands科技（重庆）有限公司',
    links = [
      {
        key: 'Business platform',
        title: '业务平台',
        href: '/',
        blankTarget: true,
      },
      {
        key: 'hz',
        title: <GithubOutlined />,
        href: '/',
        blankTarget: true,
      },
      {
        key: 'Financial gateway platform',
        title: '金融网关平台',
        href: '/',
        blankTarget: true,
      },
    ],
  } = props;
  const defaultMessage = `${dayjs().year()} ${companyName}`;

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={defaultMessage}
      links={links}
    />
  );
};

export default Footer;
