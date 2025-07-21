import { toaster } from "@/components/ui/toaster";

// Create a toaster instance
export const useToast = () => {
  const showToast = ({
    title,
    description,
    status = "info",
    duration = 5000,
    isClosable = true,
  }) => {
    return toaster.create({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  };

  const showSuccess = (title, description) => {
    return showToast({ title, description, status: "success" });
  };

  const showError = (title, description) => {
    return showToast({ title, description, status: "error" });
  };

  const showWarning = (title, description) => {
    return showToast({ title, description, status: "warning" });
  };

  const showInfo = (title, description) => {
    return showToast({ title, description, status: "info" });
  };

  return {
    toast: showToast,
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    close: toaster.close,
    closeAll: toaster.closeAll,
  };
};
