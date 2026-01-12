import { useSelector } from "react-redux"
import type { RootState } from "./store/store"
import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string | string[];
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const auth = useSelector((state: RootState) => state.auth)

  if (!auth.isLoggedIn) return <Navigate to="/" />

  if (role) {
    if (Array.isArray(role)) {
      if (!auth.role || !role.includes(auth.role)) return <Navigate to="/" />
    } else {
      if (auth.role !== role) return <Navigate to="/" />
    }
  }

  return <>{children}</>;
}
