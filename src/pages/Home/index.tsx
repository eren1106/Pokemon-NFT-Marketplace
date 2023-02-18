import * as React from 'react';
import PageWrapper from '../../components/PageWrapper';

export interface IHomeProps {
}

export default function Home(props: IHomeProps) {
  return (
    <PageWrapper title="Home">
      <div>
        Home
      </div>
    </PageWrapper>
  );
}
