// 시간 슬롯 생성 로직
export const generateTimeSlots = (startMins: number, endMins: number) => {
  const slots: string[] = [];
  let currentTime = startMins;

  while (currentTime < endMins) {
    const hours = Math.floor(currentTime / 60);
    const mins = currentTime % 60;
    slots.push(`${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`);
    currentTime += 30;
  }
  return slots;
};

// 시간 표시 로직
export const displayTime = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${String(minute).padStart(2, "0")}`;
};
