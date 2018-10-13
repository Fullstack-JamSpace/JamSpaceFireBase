import React from 'react';
import { Button } from 'semantic-ui-react';

export const EditProfileButton = (props) => {
  const user = props.user;

  const handleClick = () => {
   console.log('edit button clicking')
  };

  return user && (
    <Button
      className="follow-button"
      onClick={handleClick}
      icon="pencil"
      content='Edit'
    />
  );
};
