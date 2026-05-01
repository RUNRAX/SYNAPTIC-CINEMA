'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/entities/User'
import RippleButton from '@/components/RippleButton'

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me()
        setUser(currentUser)
      } catch (e) {
        console.log('Error fetching user', e)
        // Note: we can redirect to login here if we want strictly protected route
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <div className="w-full min-h-full flex flex-col relative lg:flex-row">
      {/* Left: Info */}
      <div className="flex-1 p-6 lg:p-12 border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.1)] relative z-10">
        <h1 className="font-display text-7xl text-black leading-none mb-12">Identification</h1>

        {loading ? (
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-4 w-32 bg-[rgba(0,0,0,0.1)]"></div>
            <div className="h-8 w-64 bg-[rgba(0,0,0,0.1)]"></div>
          </div>
        ) : user ? (
          <div className="flex flex-col gap-12 max-w-lg">
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-[rgba(0,0,0,0.1)] pt-8">
              <div>
                <p className="font-body text-[10px] tracking-widest text-mid uppercase mb-2">Subject Name</p>
                <p className="font-body text-sm uppercase">{user.full_name}</p>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-widest text-mid uppercase mb-2">Clearance Level</p>
                <p className="font-body text-sm uppercase text-accent bg-black inline-block px-2 py-1">Standard</p>
              </div>
              <div className="col-span-2">
                <p className="font-body text-[10px] tracking-widest text-mid uppercase mb-2">Email Address</p>
                <p className="font-mono text-sm">{user.email}</p>
              </div>
            </div>

            <RippleButton 
              onClick={handleLogout}
              className="self-start px-8 py-3 border border-black hover:bg-black hover:text-cream font-body text-[10px] tracking-widest transition-colors uppercase"
            >
              Terminate Session
            </RippleButton>
          </div>
        ) : (
          <div>
            <p className="font-body text-[11px] tracking-widest text-mid uppercase mb-6">Subject Not Found</p>
            <RippleButton 
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-black text-cream hover:bg-accent hover:text-black font-body text-[10px] tracking-widest transition-colors uppercase"
            >
              Authenticate
            </RippleButton>
          </div>
        )}
      </div>

      {/* Right: History/Stats */}
      <div className="flex-1 bg-cream-2 p-6 lg:p-12 relative z-10">
        <h2 className="font-display text-4xl mb-8">Scan History</h2>
        
        <div className="border border-[rgba(0,0,0,0.1)]">
          {[1, 2, 3].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-4 border-b border-[rgba(0,0,0,0.1)] last:border-b-0 hover:bg-black hover:text-cream transition-colors group cursor-pointer">
              <div>
                <p className="font-mono text-[10px] text-mid group-hover:text-gray mb-1">04.12.2026 / 14:00</p>
                <p className="font-body text-[12px] uppercase tracking-wide">Analysis Log #{400 - i}</p>
              </div>
              <span className="font-body text-[10px] tracking-widest uppercase">View →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
