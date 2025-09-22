import { useState, useEffect } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'balloon' | 'sparkle';
  size: number;
  speed: number;
  clicked: boolean;
}

export default function InteractiveElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Initialize floating elements
    const newElements: FloatingElement[] = [];
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        type: ['heart', 'balloon', 'sparkle'][Math.floor(Math.random() * 3)] as any,
        size: Math.random() * 20 + 15,
        speed: Math.random() * 2 + 1,
        clicked: false
      });
    }
    setElements(newElements);

    // Animation loop
    const animateElements = () => {
      setElements(prev => prev.map(element => {
        if (element.clicked) return element;
        
        let newY = element.y - element.speed;
        if (newY < -50) {
          newY = window.innerHeight + 50;
        }
        
        return {
          ...element,
          y: newY,
          x: element.x + Math.sin(newY * 0.01) * 0.5 // Subtle wave motion
        };
      }));
    };

    const interval = setInterval(animateElements, 50);
    return () => clearInterval(interval);
  }, []);

  const handleElementClick = (id: number) => {
    setElements(prev => prev.map(element => 
      element.id === id 
        ? { ...element, clicked: true }
        : element
    ));

    // Remove clicked element after animation
    setTimeout(() => {
      setElements(prev => prev.filter(element => element.id !== id));
    }, 1000);

    // Add new element
    setTimeout(() => {
      setElements(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        type: ['heart', 'balloon', 'sparkle'][Math.floor(Math.random() * 3)] as any,
        size: Math.random() * 20 + 15,
        speed: Math.random() * 2 + 1,
        clicked: false
      }]);
    }, 2000);
  };

  const getElementContent = (type: string) => {
    switch (type) {
      case 'heart': return '💖';
      case 'balloon': return '🎈';
      case 'sparkle': return '✨';
      default: return '💫';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute transition-all duration-500 cursor-pointer pointer-events-auto select-none
            ${element.clicked 
              ? 'animate-ping scale-150 opacity-0' 
              : 'hover:scale-125 hover:animate-bounce'
            }`}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            fontSize: `${element.size}px`,
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
          }}
          onClick={() => handleElementClick(element.id)}
        >
          {getElementContent(element.type)}
        </div>
      ))}
    </div>
  );
}