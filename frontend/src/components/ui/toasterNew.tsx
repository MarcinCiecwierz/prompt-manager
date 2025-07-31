import { toaster } from "@/components/ui/toaster";

// Create a toaster instance
export const useToast = () => {
  const showToast = ({
    title,
    description,
    type = "info",
    duration = 5000,
    isClosable = true,
  }) => {
    const id = toaster.create({
      title,
      description,
      type,
      duration,
      isClosable,
    });
    return id;
  };

  const showSuccess = (title, description) => {
    return showToast({ title, description, type: "success" });
  };

  const showError = (title, description) => {
    return showToast({ title, description, type: "error" });
  };

  const showWarning = (title, description) => {
    return showToast({ title, description, type: "warning" });
  };

  const showInfo = (title, description) => {
    return showToast({ title, description, type: "info" });
  };

  const showLoading = (description) => {
    return showToast({
      description,
      type: "loading",
      duration: null,
      isClosable: false,
    });
  };

  const closeToast = (id) => {
    return toaster.dismiss(id);
  };

  const promise = (promiseFunction, options) => {
    return toaster.promise(promiseFunction, options);
  };

  return {
    toast: showToast,
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    close: closeToast,
    promise: promise,
  };
};
