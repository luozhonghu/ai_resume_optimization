'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiBrain, BiEdit } from 'react-icons/bi'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/ai-config', icon: BiBrain, label: 'AI配置', color: 'text-purple-300' },
  { href: '/resume', icon: BiEdit, label: '简历优化', color: 'text-emerald-300' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-linear-to-b from-blue-600 via-indigo-600 to-purple-600 z-50 border-r border-white/20"
    >
      {/* 侧边栏头部 */}
      <div className="p-6 border-b border-white/20">
        <Link href="/">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-4xl">🍀</span>
            <div>
              <h1 className="text-xl font-bold text-white">AI 简历优化</h1>
              <p className="text-white/70 text-sm">配置中心</p>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* 导航菜单 */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
        <div className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index + 0.3 }}
              >
                <Link
                  href={item.href}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive
                      ? 'bg-white/25 text-white border-l-4 border-cyan-300'
                      : 'text-white hover:bg-white/15 hover:translate-x-1'
                    }
                  `}
                >
                  <Icon className={`text-xl ${isActive ? 'text-cyan-300' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </nav>

      {/* 底部信息 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20"
      >
        <div className="text-center">
          <p className="text-white/60 text-xs">v1.0.0</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
