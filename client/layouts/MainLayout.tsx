import React, { FC } from 'react';
import Head from 'next/head';
import { Container } from '@material-ui/core';

import NavBar from '../components/NavBar';
import Player from '../components/Player';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: FC<MainLayoutProps> = ({
  children,
  title = 'Музыкальная площадка',
  description = '',
  keywords = 'музыка, треки, артисты',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым. ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <Container style={{ marginTop: '90px' }}>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
