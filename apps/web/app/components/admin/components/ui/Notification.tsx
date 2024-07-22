import { FC } from "react";
import {
  Box,
  Notification as MantineNotification,
  FiCheckCircle,
  MdOutlineClear,
} from "@repo/ui";

interface NotificationProps {
  title: string;
  message: string;
  color: string;
  icon: JSX.Element;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({
  title,
  message,
  color,
  icon,
  onClose,
}) => (
  <Box>
    <MantineNotification
      icon={icon}
      color={color}
      title={title}
      onClose={onClose}
    >
      {message}
    </MantineNotification>
  </Box>
);

export default Notification;
