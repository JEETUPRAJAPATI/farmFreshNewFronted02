import { useLocation } from "wouter";

export const useSearchParams = () => {
  const [location, navigate] = useLocation();

  const getParams = () => {
    return new URLSearchParams(location.split("?")[1] || "");
  };

  const updateURL = (newParams: Record<string, string | null>) => {
    const currentParams = getParams();

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    const newURL =
      location.split("?")[0] +
      (currentParams.toString() ? `?${currentParams.toString()}` : "");

    navigate(newURL, { replace: true });
  };

  return {
    params: getParams(),
    updateURL,
  };
};
