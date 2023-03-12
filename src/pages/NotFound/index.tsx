import React from 'react';

interface INotFoundProps {
}

const NotFound: React.FunctionComponent<INotFoundProps> = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px'
    }}>
      <h1 style={{
        fontSize: '60px'
      }}>
        Opps...
      </h1>
      <h1 style={{
        fontSize: '120px'
      }}>
        404
      </h1>
      <h1 style={{
        fontSize: '40px'
      }}>
        Page Not Found
      </h1>
    </div>
  );
};

export default NotFound;
