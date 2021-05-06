import React from 'react';

import MainLayout from '../layouts/MainLayout';

export default function Index() {
  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Добро пожаловать!</h1>
          <h3>Здесь собраны лучшие треки!</h3>
        </div>
      </MainLayout>

      <style jsx>
        {`
          .center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 150px auto 0;
          }
        `}
      </style>
    </>
  );
}
