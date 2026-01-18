'use client'

import { useState } from 'react'
import { BiSave, BiCheckCircle, BiXCircle, BiLoader, BiCodeBlock } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageHeader from '@/app/components/PageHeader'

export default function AiConfigPage() {
  const [config, setConfig] = useState({
    baseUrl: '',
    apiKey: '',
    model: 'deepseek-v3',
  })

  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const testConnection = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      const response = await fetch(config.baseUrl + '/v3/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [{ role: 'user', content: '你好' }],
          max_tokens: 10
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.choices && data.choices.length > 0) {
          setTestResult({ success: true, message: '接口连接成功！' })
        } else {
          setTestResult({ success: false, message: '接口返回格式异常' })
        }
      } else {
        const error = await response.text()
        setTestResult({ success: false, message: `连接失败: ${response.status} ${error}` })
      }
    } catch (error) {
      setTestResult({ success: false, message: `连接失败: ${error instanceof Error ? error.message : '未知错误'}` })
    } finally {
      setTesting(false)
      setShowDialog(true)
    }
  }

  const handleSave = async () => {
    try {
      localStorage.setItem('aiConfig', JSON.stringify(config))
      alert('配置已保存到本地')
    } catch (error) {
      alert('保存失败')
    }
  }

  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('aiConfig')
      if (saved) {
        setConfig(JSON.parse(saved))
      }
    } catch (error) {
      console.error('加载配置失败:', error)
    }
  }

  useState(() => {
    loadConfig()
  })

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<BiCodeBlock className="text-2xl" />}
        title="AI 配置"
        subtitle="配置 AI API 接口信息"
        actions={
          <div className="flex gap-2">
            <Button
              onClick={testConnection}
              size="sm"
              variant="outline"
              disabled={testing || !config.baseUrl || !config.apiKey}
              className="rounded-full px-4"
            >
              {testing ? <BiLoader className="mr-1 animate-spin" /> : <BiCodeBlock className="mr-1" />}
              测试连接
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <BiSave className="mr-1" /> 保存配置
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        <Card className="animate-in fade-in slide-in-from-bottom-5 duration-700">
          <CardHeader>
            <CardTitle>API 配置</CardTitle>
            <CardDescription>配置 AI 服务的 API 信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseUrl">API Base URL</Label>
              <Input
                id="baseUrl"
                value={config.baseUrl}
                onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                placeholder="https://ark.ap-southeast.bytepluses.com"
              />
              <p className="text-xs text-muted-foreground">AI 服务的基础 URL，不需要包含 /api/v3</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="sk-xxxxxxxxxxxxxxxxx"
              />
              <p className="text-xs text-muted-foreground">API 访问密钥</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">模型名称</Label>
              <Input
                id="model"
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                placeholder="deepseek-v3-2-251201"
              />
              <p className="text-xs text-muted-foreground">要使用的 AI 模型</p>
            </div>
          </CardContent>
        </Card>

        {showDialog && testResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-[92%] max-w-sm border border-gray-200 dark:border-neutral-800">
              <Card className="border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {testResult.success ? (
                      <BiCheckCircle className="text-green-500 text-2xl" />
                    ) : (
                      <BiXCircle className="text-red-500 text-2xl" />
                    )}
                    {testResult.success ? '测试成功' : '测试失败'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">{testResult.message}</p>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setShowDialog(false)}
                      className="rounded-full px-4"
                      variant={testResult.success ? 'default' : 'destructive'}
                    >
                      知道了
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
