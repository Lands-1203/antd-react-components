export interface linkProps {
  key?: string;
  title: React.ReactNode;
  href: string;
  blankTarget?: boolean;
}
export interface FooterProps {
  /**
   * @description 公司名称
   * @default "lands科技（重庆）有限公司"
   */
  companyName?: string;
  /**
   * @description 友情链接
   * @default
    [
      {
        key: 'Business platform',
        title: '业务平台',
        href: '/',
        blankTarget: true,
      },
      {
        key: 'lands',
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
    ]
   */
  links?: linkProps[];
}
