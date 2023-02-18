import * as React from 'react';
import PageWrapper from '../../components/PageWrapper';

export interface IProfileProps {
}

export default function Profile(props: IProfileProps) {
  return (
    <PageWrapper title="Profile">
      <div>
        Profile
      </div>
    </PageWrapper>
  );
}
