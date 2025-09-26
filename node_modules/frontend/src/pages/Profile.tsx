import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'

export default function Profile() {
  const user = useSelector((s: RootState) => s.auth.user)
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      {!user ? (
        <div>No user loaded.</div>
      ) : (
        <div className="space-y-2">
          <div><span className="font-medium">ID:</span> {user.id}</div>
          <div><span className="font-medium">Email:</span> {user.email}</div>
          <div><span className="font-medium">Role:</span> {user.role}</div>
          <div><span className="font-medium">Tenant:</span> {user.tenantId}</div>
          <div><span className="font-medium">Created:</span> {new Date(user.createdAt).toLocaleString()}</div>
        </div>
      )}
    </div>
  )
}


