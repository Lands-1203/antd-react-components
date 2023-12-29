import { Footer } from 'dumi-theme-antd-style';
import React from 'react';

export default () => {
  return (
    <Footer
      bottom={
        <>
          © 2023 - 2023 😊&nbsp;
          <a target="_blank" href="https://lantao.work">
            兰涛
          </a>
          <br />
          <a
            target="_blank"
            href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
          >
            渝ICP备2023017609号
          </a>
        </>
      }
      columns={[
        {
          title: '相关资源',
          items: [
            {
              title: 'Ant Design Pro',
              url: 'https://pro.ant.design',
              openExternal: true,
            },
            {
              title: 'Ant Design Pro Components',
              url: 'https://procomponents.ant.design',
              openExternal: true,
            },
            {
              title: 'Umi',
              description: 'React 应用开发框架',
              url: 'https://umijs.org',
              openExternal: true,
            },
            {
              title: 'Dumi',
              description: '组件/文档研发工具',
              url: 'https://d.umijs.org',
              openExternal: true,
            },
            {
              title: 'qiankun',
              description: '微前端框架',
              url: 'https://qiankun.umijs.org',
              openExternal: true,
            },
          ],
        },
        {
          title: '友情链接',
          items: [
            {
              title: '源码地址',
              url: 'https://github.com/Lands-1203/antd-react-components',
              openExternal: true,
            },
            {
              title: '文件预览服务',
              url: 'https://lookfile.lantao.work/index',
              openExternal: true,
            },
            {
              title: 'npm私有库服务',
              url: 'https://npm.lantao.work',
              openExternal: true,
            },
          ],
        },
        {
          title: '博主地址',
          items: [
            {
              title: '个人博客',
              url: 'https://lantao.work',
              openExternal: true,
            },
            {
              title: '掘金主页',
              url: 'https://juejin.cn/user/2186291109706109',
              openExternal: true,
            },
            {
              title: 'GitHub个人主页',
              url: 'https://github.com/Lands-1203',
              openExternal: true,
            },
            {
              title: '语雀主页',
              description: '前端知识点总结',
              url: 'https://www.yuque.com/lands-rolne',
              openExternal: true,
            },
          ],
        },
        {
          title: '其他项目',
          items: [
            {
              title: '微前端框架项目',
              description: '主应用',
              url: 'https://master.lantao.work',
              openExternal: true,
            },
            {
              title: '微前端框架项目',
              description: '子应用',
              url: 'https://micro.lantao.work',
              openExternal: true,
            },
          ],
        },
      ]}
    />
  );
};
