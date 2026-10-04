import config from '@/payload.config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, context, ...otherDetails } = body

    const payload = await getPayload({ config })

    // Construct email content
    const htmlContent = `
      <h1>New User Information Collected</h1>
      <p><strong>Name:</strong> ${name || 'Not provided'}</p>
      <p><strong>Context:</strong> ${context || 'Not provided'}</p>
      ${
        Object.keys(otherDetails).length > 0
          ? `<p><strong>Other Details:</strong></p><pre>${JSON.stringify(otherDetails, null, 2)}</pre>`
          : ''
      }
    `

    await payload.sendEmail({
      to: 'iamtushgaurav@gmail.com',
      subject: 'New User Info Collected via Voice/Realtime Tool',
      html: htmlContent,
    })

    return NextResponse.json({
      success: true,
      message: 'User information collected and email sent successfully',
    })
  } catch (error) {
    console.error('Error processing collect-user-info request:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process request',
      },
      { status: 500 },
    )
  }
}

