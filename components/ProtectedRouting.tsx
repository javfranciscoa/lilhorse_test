import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { loadSessionStorageAndUser, useAppDispatch } from "@/redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const userLoggedIn = useSelector((state: any) => state.main.user.isLoggedIn as any);

  const storedToken = typeof sessionStorage !== 'undefined' && window.sessionStorage.getItem("auth");
  const userLoggedInSessionStorage: { [key: string]: any } | null = storedToken
    ? JSON.parse(storedToken)
    : null;
  const router = useRouter();

  if (userLoggedInSessionStorage?.isLoggedIn && !userLoggedIn && typeof sessionStorage !== 'undefined') {
    const todoCommingFromSession = sessionStorage.getItem("todos") as any;
    const parseTodoList = JSON.parse(todoCommingFromSession);
    parseTodoList?.length > 0 &&
      dispatch(
        loadSessionStorageAndUser({
          todoList: parseTodoList,
          user: userLoggedInSessionStorage,
        }),
      );
  }

  if (!userLoggedIn && !userLoggedInSessionStorage?.isLoggedIn) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
