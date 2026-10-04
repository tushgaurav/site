"use client"

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

type OrbVisualizerProps = {
    volume: number
    isActive: boolean
    intensity?: number
    onClick?: () => void
    className?: string
}

function OrbVisualizer({
    volume,
    isActive,
    intensity = 3,
    onClick,
    className,
}: OrbVisualizerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const groupRef = useRef<THREE.Group | null>(null)
    const ballRef = useRef<THREE.Mesh | null>(null)
    const originalPositionsRef = useRef<Float32Array | null>(null)
    const resizeObserverRef = useRef<ResizeObserver | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    const volumeRef = useRef<number>(volume)
    const intensityRef = useRef<number>(intensity)
    const isActiveRef = useRef<boolean>(isActive)
    const hasResetRef = useRef<boolean>(!isActive)

    const noise = useMemo(() => createNoise3D(), [])
    const workingVertex = useMemo(() => new THREE.Vector3(), [])
    const BASE_RADIUS = 14

    useEffect(() => {
        volumeRef.current = volume
    }, [volume])

    useEffect(() => {
        intensityRef.current = intensity
    }, [intensity])

    useEffect(() => {
        isActiveRef.current = isActive
        if (isActive) {
            hasResetRef.current = false
        }
    }, [isActive])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(container.clientWidth, container.clientWidth)
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
        renderer.domElement.style.objectFit = 'contain'

        container.innerHTML = ''
        container.appendChild(renderer.domElement)
        rendererRef.current = renderer

        const scene = new THREE.Scene()
        sceneRef.current = scene

        const camera = new THREE.PerspectiveCamera(20, 1, 1, 100)
        camera.position.set(0, 0, 100)
        camera.lookAt(scene.position)
        scene.add(camera)
        cameraRef.current = camera

        const group = new THREE.Group()
        groupRef.current = group
        scene.add(group)

        const geometry = new THREE.IcosahedronGeometry(BASE_RADIUS, 8)
        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            wireframe: true,
        })

        const ball = new THREE.Mesh(geometry, material)
        ball.position.set(0, 0, 0)
        group.add(ball)
        ballRef.current = ball

        originalPositionsRef.current = geometry.attributes.position.array.slice(
            0,
        ) as Float32Array

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const spotLight = new THREE.SpotLight(0xffffff)
        spotLight.intensity = 0.9
        spotLight.position.set(-10, 40, 20)
        spotLight.lookAt(ball.position)
        spotLight.castShadow = false
        scene.add(spotLight)

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0]
            if (!entry) return
            const { width, height } = entry.contentRect
            const size = Math.min(width, height)
            renderer.setSize(size, size, false)
            renderer.domElement.style.width = '100%'
            renderer.domElement.style.height = '100%'
            if (cameraRef.current) {
                cameraRef.current.aspect = 1
                cameraRef.current.updateProjectionMatrix()
            }
        })

        resizeObserver.observe(container)
        resizeObserverRef.current = resizeObserver

        const updateBallMorph = (mesh: THREE.Mesh, volumeValue: number) => {
            const geometry = mesh.geometry as THREE.BufferGeometry
            const positionAttribute = geometry.getAttribute('position')

            const offset = BASE_RADIUS
            const amp = 2.5
            const time = window.performance.now()
            const rf = 0.00001

            for (let i = 0; i < positionAttribute.count; i += 1) {
                workingVertex.set(
                    positionAttribute.getX(i),
                    positionAttribute.getY(i),
                    positionAttribute.getZ(i),
                )

                workingVertex.normalize()

                const distance =
                    offset +
                    volumeValue * 4 * intensityRef.current +
                    noise(
                        workingVertex.x + time * rf * 7,
                        workingVertex.y + time * rf * 8,
                        workingVertex.z + time * rf * 9,
                    ) *
                    amp *
                    volumeValue *
                    intensityRef.current

                workingVertex.multiplyScalar(distance)
                positionAttribute.setXYZ(i, workingVertex.x, workingVertex.y, workingVertex.z)
            }

            positionAttribute.needsUpdate = true
            geometry.computeVertexNormals()
        }

        const resetBallMorph = (mesh: THREE.Mesh, originalPositions: Float32Array) => {
            const geometry = mesh.geometry as THREE.BufferGeometry
            const positionAttribute = geometry.getAttribute('position')

            for (let i = 0; i < positionAttribute.count; i += 1) {
                positionAttribute.setXYZ(
                    i,
                    originalPositions[i * 3],
                    originalPositions[i * 3 + 1],
                    originalPositions[i * 3 + 2],
                )
            }

            positionAttribute.needsUpdate = true
            geometry.computeVertexNormals()
        }

        const renderScene = () => {
            const rendererInstance = rendererRef.current
            const sceneInstance = sceneRef.current
            const cameraInstance = cameraRef.current
            const groupInstance = groupRef.current
            const ballInstance = ballRef.current

            if (
                !rendererInstance ||
                !sceneInstance ||
                !cameraInstance ||
                !groupInstance ||
                !ballInstance
            ) {
                return
            }

            groupInstance.rotation.y += 0.005

            if (isActiveRef.current) {
                updateBallMorph(ballInstance, volumeRef.current)
            } else if (
                !hasResetRef.current &&
                originalPositionsRef.current &&
                ballInstance
            ) {
                resetBallMorph(ballInstance, originalPositionsRef.current)
                hasResetRef.current = true
            }

            rendererInstance.render(sceneInstance, cameraInstance)
            animationFrameRef.current = requestAnimationFrame(renderScene)
        }

        animationFrameRef.current = requestAnimationFrame(renderScene)

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect()
                resizeObserverRef.current = null
            }

            if (ballRef.current) {
                ballRef.current.geometry.dispose()
                if (Array.isArray(ballRef.current.material)) {
                    ballRef.current.material.forEach((material) => material.dispose())
                } else {
                    ballRef.current.material.dispose()
                }
                ballRef.current = null
            }

            renderer.dispose()
            renderer.forceContextLoss()
            renderer.domElement.remove()

            scene.clear()

            rendererRef.current = null
            sceneRef.current = null
            cameraRef.current = null
            groupRef.current = null
        }
    }, [noise, workingVertex])

    useEffect(() => {
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
            }
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect()
                resizeObserverRef.current = null
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={`relative aspect-square w-full ${className ?? ''}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-pressed={isActive}
            aria-label={
                onClick
                    ? isActive
                        ? 'Stop voice assistant'
                        : 'Start voice assistant'
                    : undefined
            }
            onKeyDown={(event) => {
                if (onClick && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault()
                    onClick()
                }
            }}
        />
    )
}

export default OrbVisualizer

