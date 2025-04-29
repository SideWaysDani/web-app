import React from 'react';
import { motion } from 'framer-motion';

interface Candle {
  x: number;
  height: number;
  isPositive: boolean;
}

const TradingBackground: React.FC = () => {
  const generateCandles = (): Candle[] => {
    return Array.from({ length: 20 }, (_, i) => ({
      x: i * 50,
      height: Math.random() * 100 + 50,
      isPositive: Math.random() > 0.5
    }));
  };

  const [candles, setCandles] = React.useState(generateCandles());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prevCandles => {
        const newCandles = [...prevCandles.slice(1)];
        newCandles.push({
          x: newCandles[newCandles.length - 1].x + 50,
          height: Math.random() * 100 + 50,
          isPositive: Math.random() > 0.5
        });
        return newCandles;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.1,
      overflow: 'hidden',
      zIndex: 0
    }}>
      <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
        {candles.map((candle, index) => (
          <motion.g
            key={`${index}-${candle.x}`}
            initial={{ opacity: 0, x: candle.x + 50 }}
            animate={{ opacity: 1, x: candle.x }}
            exit={{ opacity: 0, x: candle.x - 50 }}
            transition={{ duration: 2, ease: "linear" }}
          >
            {/* Candle body */}
            <motion.rect
              x={candle.x - 8}
              y={200 - (candle.isPositive ? candle.height : 0)}
              width={16}
              height={candle.height}
              fill={candle.isPositive ? '#26a69a' : '#ef5350'}
              opacity={0.6}
            />
            {/* Candle wick */}
            <motion.line
              x1={candle.x}
              y1={200 - candle.height * 1.2}
              x2={candle.x}
              y2={200 + candle.height * 0.2}
              stroke={candle.isPositive ? '#26a69a' : '#ef5350'}
              strokeWidth={2}
              opacity={0.6}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

export default TradingBackground;