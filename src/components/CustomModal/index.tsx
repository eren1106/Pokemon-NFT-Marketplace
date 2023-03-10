import { Box, Modal, Typography } from '@mui/material';
import * as React from 'react';

interface ICustomModalProps {
  open: boolean,
  onClose(): void,
  title: string,
  description?: string,
  children?: React.ReactNode,
  width?: number,
  height?: number,
}

const CustomModal: React.FC<ICustomModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  width,
  height
}) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 300,
        minHeight: 100,
        width: width || 'auto',
        height: height || 'auto',
        bgcolor: 'var(--grey-card)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
      }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            color: 'var(--orange)',
          }}
          id="modal-modal-title"
          variant="h4"
        >
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
