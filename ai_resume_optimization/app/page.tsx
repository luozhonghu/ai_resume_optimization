'use client'

import { useState, useEffect } from 'react'
import { BiBrain, BiEdit, BiArrowToRight } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/app/components/PageHeader'

export default function HomePage() {
  const [hasConfig, setHasConfig] = useState(false)

  useEffect(() => {
    const config = localStorage.getItem('aiConfig')
    setHasConfig(!!config)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<BiBrain className="text-2xl" />}
        title="AI 简历优化系统"
        subtitle="使用 AI 智能优化您的简历"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* AI配置卡片 */}
        <Card className="animate-in fade-in slide-in-from-bottom-5 duration-700 hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BiBrain className="text-purple-500 text-2xl" />
              AI 配置
            </CardTitle>
            <CardDescription>
              配置 API 接口、模型和密钥
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                设置 AI 服务的 API 地址、访问密钥和模型名称，支持测试连接
              </p>
              <div className="flex items-center gap-2 text-sm">
                {hasConfig ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    已配置
                  </span>
                ) : (
                  <span className="text-yellow-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    未配置
                  </span>
                )}
              </div>
              <Button
                onClick={() => window.location.href = '/ai-config'}
                className="w-full group-hover:bg-purple-600 transition-colors"
              >
                前往配置
                <BiArrowToRight className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 简历优化卡片 */}
        <Card className="animate-in fade-in slide-in-from-bottom-6 duration-700 hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BiEdit className="text-emerald-500 text-2xl" />
              简历优化
            </CardTitle>
            <CardDescription>
              填写简历信息，获取 AI 优化建议
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                填写您的简历基本信息、教育经历、项目经验等，AI 将根据目标岗位描述优化您的简历
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  智能优化
                </span>
              </div>
              <Button
                onClick={() => window.location.href = '/resume'}
                className="w-full group-hover:bg-emerald-600 transition-colors"
              >
                开始优化
                <BiArrowToRight className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-bottom-7 duration-700">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
              <p>首先在 <strong className="text-foreground">AI 配置</strong> 页面设置您的 API 接口信息</p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
              <p>在 <strong className="text-foreground">简历优化</strong> 页面填写您的简历信息和目标岗位描述</p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
              <p>点击 <strong className="text-foreground">开始优化</strong> 按钮，AI 将分析并提供优化建议</p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</span>
              <p>查看优化结果，可以复制保存或继续调整</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
