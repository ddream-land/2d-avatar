import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { DigitalLifeDetailType, DEFAULT_DIGITAL_LIFE_CHARACTER_DATA } from "@/lib/definitions.digitallife";
import DigitalLifeAvatar from "@/icons/assets_store/DigitalLifeAvatar";
import { Image } from "@nextui-org/react";

interface DigitalLifeAvatarPreviewProps {
  digitalLifePublicInfo: DigitalLifeDetailType;
}

const DigitalLifeAvatarPreview: FC<DigitalLifeAvatarPreviewProps> = ({ digitalLifePublicInfo }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <div className="flex items-center justify-between gap-2 ">
        <div className="flex flex-grow items-center justify-start bg-[#3F3F46] px-[18px] py-5 gap-4 rounded-lg">
          <DigitalLifeAvatar className="w-6 h-6" />
          <div className="#EEEFF1 font-normal text-base text-wrap flex justify-start">
            <span>{digitalLifePublicInfo.spec}</span>
            <span className="ml-1">ver.{digitalLifePublicInfo.spec_version}</span>
          </div>
        </div>

        <Button onPress={onOpen} className="bg-[#3F3F46] max-w-fit h-full rounded-lg px-3 py-5">
          <span className="text-white text-base font-medium">Preview</span>
        </Button>
        <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
          <ModalContent className="w-[522px]">
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-center items-center ">
                  <span className="text-white font-medium text-lg">Live 2D Avtar</span>
                </ModalHeader>
                <ModalBody className="pt-3 pb-6">
                  <Image src="/images/default-live-avatar.png" width={450} height={450} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
// src={DEFAULT_DIGITAL_LIFE_CHARACTER_DATA.extensions.nuwa_avatar.url ?? "/default-live-avatar.png"}

export default DigitalLifeAvatarPreview;
