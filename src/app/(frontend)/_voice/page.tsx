import type { Metadata } from 'next'
import { Page } from '@/components/page'
import RealtimeVoice from './voice-core'

export const metadata: Metadata = {
    title: 'Voice | Tushar Gaurav',
    description: 'Voice',
}

export default function Voice() {

    return (
        <Page className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)]">
            <RealtimeVoice />
        </Page>
    )
}