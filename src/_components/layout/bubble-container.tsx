"use client"

import { useState, useEffect, useRef } from "react"

interface BubbleData {
  id: string
  name: string
  items: Array<{ name: string; url: string }>
}

interface Bubble extends BubbleData {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const BubbleContainer = ({ data }: { data: BubbleData[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const animationRef = useRef<number>(0)

  // Initialize bubbles
  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const initialBubbles = data.map((item, index) => {
      // Size constants in pixels for precise positioning
      const cursorSize = 12;   // 12px (inner dot)
      const trailSize = 52;    // 52px (outer circle)
      const halfCursor = cursorSize / 2;
      const halfTrail = trailSize / 2;
  
      // Calculate max boundaries to keep bubbles within container
      const maxX = typeof window !== 'undefined' ? window.innerWidth : 1024;
      const maxY = typeof window !== 'undefined' ? window.innerHeight : 768;

      const radius = 40;
      const margin = radius * 2; // Double the radius for safety
      
      return {
        ...item,
        x: margin + Math.random() * (containerWidth - margin * 2),
        y: margin + Math.random() * (containerHeight - margin * 2),
        vx: (Math.random() - 0.5) * 4, // Reduced speed for better control
        vy: (Math.random() - 0.5) * 4,
        radius: radius,
      };
    })

    setBubbles(initialBubbles)
    bubblesRef.current = initialBubbles
  }, [data])

  // Animation loop with direct mutation for performance
  useEffect(() => {
    if (!containerRef.current) return

    const animate = () => {
      const container = containerRef.current!
      const containerRect = container.getBoundingClientRect()
      const width = containerRect.width
      const height = containerRect.height
      const bubblesToUpdate = bubblesRef.current
      const borderWidth = 2 // Match this with your border width in CSS

      for (let i = 0; i < bubblesToUpdate.length; i++) {
        const bubble = bubblesToUpdate[i]

        if (hoveredId === bubble.id) {
          bubble.vx = 0
          bubble.vy = 0
          continue
        }

        // Update position
        bubble.x += bubble.vx
        bubble.y += bubble.vy

        // Enhanced border collision with bounce effect
        const effectiveRadius = bubble.radius + borderWidth / 2
        const bounceFactor = 0.9
        const minSpeed = 0.5

        // Left wall
        if (bubble.x - effectiveRadius <= 0) {
          bubble.x = effectiveRadius
          bubble.vx = Math.max(minSpeed, Math.abs(bubble.vx) * bounceFactor)
        }
        // Right wall
        if (bubble.x + effectiveRadius >= width) {
          bubble.x = width - effectiveRadius
          bubble.vx = -Math.max(minSpeed, Math.abs(bubble.vx) * bounceFactor)
        }
        // Top wall
        if (bubble.y - effectiveRadius <= 0) {
          bubble.y = effectiveRadius
          bubble.vy = Math.max(minSpeed, Math.abs(bubble.vy) * bounceFactor)
        }
        // Bottom wall
        if (bubble.y + effectiveRadius >= height) {
          bubble.y = height - effectiveRadius
          bubble.vy = -Math.max(minSpeed, Math.abs(bubble.vy) * bounceFactor)
        }

        // Maintain velocity with minimal friction
        bubble.vx *= 0.995
        bubble.vy *= 0.995
      }

      for (let i = 0; i < bubblesToUpdate.length; i++) {
        for (let j = i + 1; j < bubblesToUpdate.length; j++) {
          const b1 = bubblesToUpdate[i]
          const b2 = bubblesToUpdate[j]

          const dx = b2.x - b1.x
          const dy = b2.y - b1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          let r1 = b1.radius
          let r2 = b2.radius

          if (hoveredId === b1.id) r1 = 80
          if (hoveredId === b2.id) r2 = 80

          const minDistance = r1 + r2

          if (distance < minDistance) {
            if (hoveredId === b1.id) {
              const angle = Math.atan2(dy, dx)
              b2.vx += Math.cos(angle) * 2
              b2.vy += Math.sin(angle) * 2
              b2.x += Math.cos(angle) * 2
              b2.y += Math.sin(angle) * 2
            } else if (hoveredId === b2.id) {
              const angle = Math.atan2(dy, dx)
              b1.vx -= Math.cos(angle) * 2
              b1.vy -= Math.sin(angle) * 2
              b1.x -= Math.cos(angle) * 2
              b1.y -= Math.sin(angle) * 2
            } else {
              const angle = Math.atan2(dy, dx)
              const sin = Math.sin(angle)
              const cos = Math.cos(angle)

              const vx1 = b1.vx * cos + b1.vy * sin
              const vy1 = b1.vy * cos - b1.vx * sin
              const vx2 = b2.vx * cos + b2.vy * sin
              const vy2 = b2.vy * cos - b2.vx * sin

              b1.vx = vx2 * cos - vy1 * sin
              b1.vy = vy1 * cos + vx2 * sin
              b2.vx = vx1 * cos - vy2 * sin
              b2.vy = vy2 * cos + vx1 * sin

              const overlap = minDistance - distance + 0.5
              const separationX = (overlap / 2) * cos
              const separationY = (overlap / 2) * sin

              b1.x -= separationX
              b1.y -= separationY
              b2.x += separationX
              b2.y += separationY
            }
          }
        }
      }

      setBubbles([...bubblesToUpdate])
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [hoveredId])

  return (
    <div ref={containerRef} className="relative w-full h-full bg-muted/20 rounded-lg overflow-hidden">
      {bubbles.map((bubble) => {
        const isHovered = hoveredId === bubble.id
        const displayRadius = isHovered ? 80 : bubble.radius

        return (
          <div
            key={bubble.id}
            className="absolute cursor-pointer"
            style={{
              transform: `translate(calc(-50% + ${bubble.x}px), calc(-50% + ${bubble.y}px))`,
              transition: isHovered ? "width 0.3s, height 0.3s" : "none",
            }}
            onMouseEnter={() => setHoveredId(bubble.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`flex flex-col items-center justify-center rounded-full border bg-theme-color/20 backdrop-blur-sm text-foreground font-medium transition-all duration-300 ${
                isHovered 
                  ? "border-2 border-theme-color scale-110" 
                  : "border-2 border-theme-color/40 hover:border-theme-color/60"
              }`}
              style={{
                width: `${displayRadius * 2}px`,
                height: `${displayRadius * 2}px`,
              }}
            >
              {isHovered ? (
                <div className="text-center px-3 py-2 w-full flex flex-col gap-1">
                  <div className="text-sm font-medium text-foreground/90">{bubble.name}</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto text-xs text-foreground/90">
                    {bubble.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline text-foreground/80 hover:text-theme-color transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-theme-color text-xs font-medium break-words px-2 line-clamp-2">{bubble.name}</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BubbleContainer
