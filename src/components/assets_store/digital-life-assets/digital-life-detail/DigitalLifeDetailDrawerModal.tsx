"use client";
import React from "react";
import DrawerModal from "../../DrawerModal";
import { ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import DigitalLifeDetail from "./DigitalLifeDetail";
import { DigitalLifeCardType } from "@/lib/definitions.digitallife";

function DigitalLifeDetailDrawerModal({
  isOpen,
  publishId,
  selectedDigitalLife,
  onChange,
  onRunSuccess,
}: {
  isOpen: boolean;
  publishId: string | undefined;
  selectedDigitalLife: DigitalLifeCardType | null;
  onChange?: (isOpen: boolean) => void;
  onRunSuccess: (p_id: string, success: boolean) => void;
}) {
  const digitalLifeDetailModal = useDisclosure({
    onClose() {
      onChange && onChange(false);
    },
    isOpen: isOpen,
  });

  return (
    <DrawerModal modalDisclosure={digitalLifeDetailModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              {publishId && (
                <DigitalLifeDetail
                  onRunSuccess={onRunSuccess}
                  key={publishId}
                  publishId={publishId}
                  selectedDigitalLife={selectedDigitalLife}
                />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </DrawerModal>
  );
}

export default DigitalLifeDetailDrawerModal;
