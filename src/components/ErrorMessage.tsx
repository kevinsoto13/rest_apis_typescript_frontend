import { type PropsWithChildren } from 'react'

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className="flex-1">
      <div className="text-red-700 bg-red-50/80 backdrop-blur-sm font-semibold p-3 rounded-xl border border-red-200/50 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
          <span>{children}</span>
        </div>
      </div>
    </div>
  )
}
