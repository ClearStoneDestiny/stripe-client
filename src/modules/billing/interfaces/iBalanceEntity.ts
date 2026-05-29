export interface IBalanceEntity {
  availableMinutes: number;
  availableHours: number;
  usedMinutes: number;
  usedHours: number;
  totalMinutes: number;
  totalHours: number;
  currentMonth: string;
  nextResetAt: string;
}
