
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-[#1a1a2e] p-8 rounded-2xl border-2 border-[#333] w-full max-w-sm text-center shadow-2xl shadow-purple-500/20">
        {children}
      </div>
    </div>
  );
};

export default Modal;
