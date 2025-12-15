interface CustomXAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
  index?: number;
  lastIndex: number;
}

const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({
                                                           x = 0,
                                                           y = 0,
                                                           payload,
                                                           index = 0,
                                                           lastIndex,
                                                         }) => {
  const isLast = index === lastIndex;

  return (
    <text
      x={x}
      y={y + 12}
      textAnchor="middle"
      fill={isLast ? "#222222" : "#939396"}
      fontSize={12}
      fontWeight={400}
    >
      {payload?.value}
    </text>
  );
};



export default CustomXAxisTick;