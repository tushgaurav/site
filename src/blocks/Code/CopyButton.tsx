'use client'

import { useState } from 'react'
import { CopyIcon, ClipboardCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Code copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
      {copied ? <ClipboardCheck className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
    </Button>
  )
}
