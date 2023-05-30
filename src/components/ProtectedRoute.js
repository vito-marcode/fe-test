import { Navigate } from 'react-router'

const ProtectedRoute = ({ user, redirectPath = '/user', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
