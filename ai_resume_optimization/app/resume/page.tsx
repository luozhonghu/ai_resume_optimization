'use client'

import { useState, useEffect } from 'react'
import { BiSend, BiLoader, BiCopy, BiCheck } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import PageHeader from '@/app/components/PageHeader'

export default function ResumePage() {
  const [resume, setResume] = useState({
    basicInfo: '',
    education: '',
    certificates: '',
    projects: '',
    workExperience: '',
    skills: '',
    selfAssessment: '',
    techStack: '',
    jobDescription: '',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('resumeData')
      if (saved) {
        setResume(JSON.parse(saved))
      }
    } catch (error) {
      console.error('加载简历数据失败:', error)
    }
  }

  useEffect(() => {
    loadConfig()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setResult('')

    try {
      const aiConfigStr = localStorage.getItem('aiConfig')
      if (!aiConfigStr) {
        throw new Error('请先配置 AI 接口')
      }

      const aiConfig = JSON.parse(aiConfigStr)
      const { baseUrl, apiKey, model } = aiConfig

      const systemPrompt = `你是一个简历优化的人工智能，我将给你一些需要匹配的目标岗位还有我简历的一些描述，你需要根据我给你的简历描述和岗位描述来优化我的简历，并且按照对应点来优化。要求字数要少并且精炼，尽量符合岗位要求，但是不能撒谎不能脱离简历描述，要突出简历的亮点。分点进行优化，每个点前面加上序号1. 2. 3.除了能优化简历中的一些信息，同时能针对简历提供一些职业上的建议，如果没有问就不给建议，提问对应的看法和建议再提供建议，否则只优化简历。`

      const userPrompt = `下面是我的简历基本信息
基本信息：${resume.basicInfo || '未填写'}

教育经历：${resume.education || '未填写'}

证书与学术成果：${resume.certificates || '未填写'}

创新项目经历：${resume.projects || '未填写'}

工作经历：${resume.workExperience || '未填写'}

个人能力：${resume.skills || '未填写'}

个人评估：${resume.selfAssessment || '未填写'}

技术栈：${resume.techStack || '未填写'}

下面是我期望的岗位描述
期望岗位描述：${resume.jobDescription || '未填写'}

现在依据岗位描述，帮我优化上面的简历内容，突出简历亮点，适当匹配岗位要求，但是不能脱离简历描述，并且不能撒谎，不能夸大。`

      const response = await fetch(`${baseUrl}/v3/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        })
      })

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`)
      }

      const data = await response.json()
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setResult(data.choices[0].message.content)
      } else {
        throw new Error('API 返回格式异常')
      }
    } catch (error) {
      setResult(`错误: ${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resume))
      alert('简历信息已保存')
    } catch (error) {
      alert('保存失败')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      alert('复制失败')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<BiSend className="text-2xl" />}
        title="简历优化"
        subtitle="填写简历信息并使用 AI 优化"
        actions={
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              variant="outline"
              className="rounded-full px-4"
            >
              保存信息
            </Button>
            <Button
              onClick={handleSubmit}
              size="sm"
              disabled={loading}
              className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {loading ? <BiLoader className="mr-1 animate-spin" /> : <BiSend className="mr-1" />}
              开始优化
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        <Card className="animate-in fade-in slide-in-from-bottom-5 duration-700">
          <CardHeader>
            <CardTitle>简历信息</CardTitle>
            <CardDescription>填写您的简历信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="basicInfo">基本信息</Label>
              <Textarea
                id="basicInfo"
                value={resume.basicInfo}
                onChange={(e) => setResume({ ...resume, basicInfo: e.target.value })}
                placeholder="姓名、年龄、联系方式等基本信息"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">教育经历</Label>
              <Textarea
                id="education"
                value={resume.education}
                onChange={(e) => setResume({ ...resume, education: e.target.value })}
                placeholder="学校、专业、学历、毕业时间等"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificates">证书与学术成果</Label>
              <Textarea
                id="certificates"
                value={resume.certificates}
                onChange={(e) => setResume({ ...resume, certificates: e.target.value })}
                placeholder="获得的证书、发表的论文、学术奖项等"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projects">创新项目经历</Label>
              <Textarea
                id="projects"
                value={resume.projects}
                onChange={(e) => setResume({ ...resume, projects: e.target.value })}
                placeholder="项目名称、项目描述、你的角色和贡献等"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workExperience">工作经历</Label>
              <Textarea
                id="workExperience"
                value={resume.workExperience}
                onChange={(e) => setResume({ ...resume, workExperience: e.target.value })}
                placeholder="公司、职位、工作内容、主要成就等"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">个人能力</Label>
              <Textarea
                id="skills"
                value={resume.skills}
                onChange={(e) => setResume({ ...resume, skills: e.target.value })}
                placeholder="专业技能、软技能、语言能力等"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="selfAssessment">个人评估</Label>
              <Textarea
                id="selfAssessment"
                value={resume.selfAssessment}
                onChange={(e) => setResume({ ...resume, selfAssessment: e.target.value })}
                placeholder="自我评价、职业规划等"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack">技术栈</Label>
              <Textarea
                id="techStack"
                value={resume.techStack}
                onChange={(e) => setResume({ ...resume, techStack: e.target.value })}
                placeholder="掌握的技术和工具，如：Java、Python、React、MySQL 等"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">期望岗位描述</Label>
              <Textarea
                id="jobDescription"
                value={resume.jobDescription}
                onChange={(e) => setResume({ ...resume, jobDescription: e.target.value })}
                placeholder="粘贴目标岗位的招聘描述，AI 将根据此描述优化您的简历"
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>优化结果</CardTitle>
                <CardDescription>AI 优化后的简历建议</CardDescription>
              </div>
              <Button
                onClick={handleCopy}
                size="sm"
                variant="outline"
                className="rounded-full"
              >
                {copied ? <BiCheck className="mr-1" /> : <BiCopy className="mr-1" />}
                {copied ? '已复制' : '复制'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/50 p-4 rounded-lg">
                {result}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
