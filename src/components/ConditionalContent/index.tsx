import * as React from 'react';

interface IConditionalContentProps {
  condition: boolean | undefined;
  first: React.ReactNode;
  second?: React.ReactNode
}

// when condition is true, first element will show up, second will not visible and etc.
// can also be use to show and hide an element according to the condition, the second element will not be used
const ConditionalContent: React.FunctionComponent<IConditionalContentProps> = ({
  condition,
  first,
  second = null,
}) => {
  return (
    <>
      {condition ? first : second}
    </>
  );
};

export default ConditionalContent;
