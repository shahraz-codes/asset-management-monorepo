import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { setToken, setUser } from '../features/auth/authSlice'

export default function Login() {
  const [email, setEmail] = useState('admin@tenant.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      dispatch(setToken(data.token))
      const me = await api.get('/profile/me')
      dispatch(setUser(me.data.user))
      navigate('/profile')
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
        <label className="block text-sm mb-1">Email</label>
        <input className="w-full border rounded p-2 mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="block text-sm mb-1">Password</label>
        <input type="password" className="w-full border rounded p-2 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-2">Sign In</button>
      </form>
    </div>
  )
}


