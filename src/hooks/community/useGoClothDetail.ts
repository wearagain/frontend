import { useNavigate } from "react-router-dom";

export const useGoClothDetail = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.split("/list")[0];

  return (id: string) => navigate(currentPath + `/list/${id}`);
};
