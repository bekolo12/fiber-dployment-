export const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  gray: '#6b7280',
  emerald: '#10b981',
  purple: '#8b5cf6',
  amber: '#f59e0b',
};

export const PALETTE = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', 
  '#ef4444', '#ec4899', '#14b8a6', '#f97316', '#6366f1',
  '#84cc16', '#a855f7', '#22d3ee', '#fb923c', '#4ade80',
  '#c084fc', '#38bdf8', '#fbbf24'
];

export const plannedFDTData = [
  { name: 'Biji R1', value: 15 },
  { name: 'Biji R2', value: 18 },
  { name: 'Dora R2', value: 1 },
  { name: 'DoraR2', value: 3 },
  { name: 'ENTR2', value: 2 },
  { name: 'GZL R2', value: 9 },
  { name: 'SMR R1', value: 15 },
  { name: 'SMR R2', value: 16 },
  { name: 'SMR R3', value: 11 },
  { name: 'Sht R1', value: 15 },
  { name: 'Sht R2', value: 18 },
  { name: 'Sht R3', value: 13 },
  { name: 'Sht R4', value: 8 },
  { name: 'Sht R5', value: 5 },
  { name: 'Tik R1', value: 15 },
  { name: 'Tik R2', value: 18 },
  { name: 'Tik R3', value: 11 },
];

export const actualFdtData = [
  { name: 'SMR R2', value: 16, color: COLORS.success },
  { name: 'Sht R2', value: 16, color: COLORS.success },
  { name: 'Biji R1', value: 15, color: COLORS.success },
  { name: 'SMR R1', value: 15, color: COLORS.success },
  { name: 'Tik R1', value: 15, color: COLORS.success },
  { name: 'Tik R2', value: 15, color: COLORS.success },
  { name: 'Sht R1', value: 13, color: COLORS.primary },
  { name: 'Biji R2', value: 10, color: COLORS.primary },
  { name: 'Tik R3', value: 9, color: COLORS.purple },
  { name: 'Feedr', value: 7, color: COLORS.purple },
  { name: 'SMR R3', value: 4, color: COLORS.warning },
  { name: 'DoraR2', value: 3, color: COLORS.warning },
  { name: 'GZLR2', value: 3, color: COLORS.warning },
  { name: 'ENTR2', value: 2, color: COLORS.warning },
  { name: 'CC', value: 1, color: COLORS.warning },
  { name: 'Dora R2', value: 1, color: COLORS.warning },
];

export const combinedFdtData = [
  { name: 'Biji R1', planned: 15, actual: 15 },
  { name: 'Biji R2', planned: 18, actual: 10 },
  { name: 'Dora R2', planned: 1, actual: 1 },
  { name: 'DoraR2', planned: 3, actual: 3 },
  { name: 'ENTR2', planned: 2, actual: 2 },
  { name: 'GZL R2', planned: 9, actual: 3 },
  { name: 'SMR R1', planned: 15, actual: 15 },
  { name: 'SMR R2', planned: 16, actual: 16 },
  { name: 'SMR R3', planned: 11, actual: 4 },
  { name: 'Sht R1', planned: 15, actual: 13 },
  { name: 'Sht R2', planned: 18, actual: 16 },
  { name: 'Sht R3', planned: 13, actual: 0 },
  { name: 'Sht R4', planned: 8, actual: 0 },
  { name: 'Sht R5', planned: 5, actual: 0 },
  { name: 'Tik R1', planned: 15, actual: 15 },
  { name: 'Tik R2', planned: 18, actual: 15 },
  { name: 'Tik R3', planned: 11, actual: 9 },
];

export const fdtPendingProgressData = [
  { name: 'Sht R3', in_progress: 0, pending: 13, total: 13 },
  { name: 'GZL R2', in_progress: 0, pending: 9, total: 9 },
  { name: 'Biji R2', in_progress: 0, pending: 8, total: 8 },
  { name: 'Sht R4', in_progress: 0, pending: 8, total: 8 },
  { name: 'SMR R3', in_progress: 2, pending: 5, total: 7 },
  { name: 'Sht R5', in_progress: 0, pending: 5, total: 5 },
  { name: 'Tik R2', in_progress: 0, pending: 3, total: 3 },
  { name: 'Tik R3', in_progress: 0, pending: 2, total: 2 },
  { name: 'Sht R1', in_progress: 0, pending: 2, total: 2 },
  { name: 'Sht R2', in_progress: 2, pending: 0, total: 2 }
];

export const fatSumData = [
  { name: 'Biji R1', value: 597 },
  { name: 'Biji R2', value: 369 },
  { name: 'R2', value: 410 },
  { name: 'SMR R1', value: 586 },
  { name: 'SMR R2', value: 640 },
  { name: 'SMR R3', value: 120 },
  { name: 'Sht R1', value: 604 },
  { name: 'Tik R1', value: 592 },
  { name: 'Tik R2', value: 607 },
  { name: 'Tik R3', value: 351 },
];

export const qcStatusData = [
  { name: 'Done', value: 115, color: COLORS.success },
  { name: 'Ongoing', value: 1, color: COLORS.warning },
  { name: 'Not Started', value: 90, color: COLORS.gray },
];

export const cwFeederData = [
  { name: 'Done', value: 9, color: COLORS.success },
  { name: 'Pending', value: 5, color: COLORS.warning },
  { name: 'In Progress', value: 1, color: COLORS.primary },
];

export const fiberVsDrillingData = [
  { name: 'Biji R1', fiber: 73849, drilling: 69285 },
  { name: 'Biji R2', fiber: 44688, drilling: 44690 },
  { name: 'SMR R1', fiber: 38706, drilling: 43620 },
  { name: 'SMR R2', fiber: 17519, drilling: 52920 },
  { name: 'Sht R1', fiber: 44536, drilling: 42785 },
  { name: 'Sht R2', fiber: 7237, drilling: 42440 },
  { name: 'Tik R1', fiber: 62815, drilling: 56095 },
  { name: 'Tik R2', fiber: 65103, drilling: 51765 },
  { name: 'Tik R3', fiber: 20708, drilling: 22818 },
];

export const grStatusData = [
  { name: 'Biji R1', done: 15, pending: 0 },
  { name: 'Biji R2', done: 9, pending: 9 },
  { name: 'SMR R1', done: 15, pending: 0 },
  { name: 'SMR R2', done: 16, pending: 0 },
  { name: 'SMR R3', done: 11, pending: 0 },
  { name: 'Sht R1', done: 13, pending: 2 },
  { name: 'Sht R2', done: 18, pending: 0 },
  { name: 'Sht R3', done: 0, pending: 13 },
  { name: 'Sht R4', done: 0, pending: 8 },
  { name: 'Sht R5', done: 0, pending: 5 },
  { name: 'Tik R1', done: 15, pending: 0 },
  { name: 'Tik R2', done: 15, pending: 3 },
  { name: 'Tik R3', done: 9, pending: 2 },
];

export const distributionLayingData = [
  { name: 'Biji R1', done: 15, in_progress: 0, no_status: 0 },
  { name: 'Biji R2', done: 9, in_progress: 0, no_status: 0 },
  { name: 'SMR R1', done: 9, in_progress: 6, no_status: 0 },
  { name: 'SMR R2', done: 4, in_progress: 0, no_status: 0 },
  { name: 'Sht R1', done: 13, in_progress: 0, no_status: 0 },
  { name: 'Sht R2', done: 2, in_progress: 0, no_status: 0 },
  { name: 'Tik R1', done: 15, in_progress: 0, no_status: 3 },
  { name: 'Tik R2', done: 15, in_progress: 0, no_status: 0 },
  { name: 'Tik R3', done: 4, in_progress: 4, no_status: 0 },
];

export const durationData = [
  { name: 'Tik R1', days: 108, color: COLORS.danger },
  { name: 'Sht R1', days: 89, color: COLORS.danger },
  { name: 'Tik R3', days: 43, color: COLORS.warning },
  { name: 'Biji R1', days: 41, color: COLORS.warning },
  { name: 'Tik R2', days: 30, color: COLORS.success },
  { name: 'SMR R1', days: 29, color: COLORS.success },
  { name: 'Biji R2', days: 6, color: COLORS.success },
];

export interface HeatmapRow {
    ring: string;
    gr: 'done' | 'pending' | 'inprogress' | 'mixed' | 'nodata';
    cw: 'done' | 'pending' | 'inprogress' | 'mixed' | 'nodata';
    splicing: 'done' | 'pending' | 'inprogress' | 'mixed' | 'nodata';
    distribution: 'done' | 'pending' | 'inprogress' | 'mixed' | 'nodata';
    fdtDone: number;
    fdtPending: number;
    detailed?: boolean;
}

export const heatmapData: HeatmapRow[] = [
    { ring: 'Biji R1', gr: 'done', cw: 'done', splicing: 'done', distribution: 'done', fdtDone: 15, fdtPending: 0 },
    { ring: 'Biji R2', gr: 'mixed', cw: 'done', splicing: 'mixed', distribution: 'mixed', fdtDone: 10, fdtPending: 8 },
    { ring: 'R2 (Dora, ENT, GZL)', gr: 'mixed', cw: 'pending', splicing: 'nodata', distribution: 'nodata', fdtDone: 9, fdtPending: 9, detailed: true },
    { ring: 'SMR R1', gr: 'done', cw: 'done', splicing: 'done', distribution: 'mixed', fdtDone: 15, fdtPending: 0 },
    { ring: 'SMR R2', gr: 'done', cw: 'done', splicing: 'nodata', distribution: 'mixed', fdtDone: 16, fdtPending: 0 },
    { ring: 'SMR R3', gr: 'done', cw: 'inprogress', splicing: 'nodata', distribution: 'nodata', fdtDone: 4, fdtPending: 5 },
    { ring: 'Sht R1', gr: 'mixed', cw: 'done', splicing: 'mixed', distribution: 'mixed', fdtDone: 13, fdtPending: 2 },
    { ring: 'Sht R2', gr: 'done', cw: 'done', splicing: 'nodata', distribution: 'mixed', fdtDone: 16, fdtPending: 0 },
    { ring: 'Sht R3', gr: 'pending', cw: 'pending', splicing: 'nodata', distribution: 'nodata', fdtDone: 0, fdtPending: 0 },
    { ring: 'Sht R4', gr: 'pending', cw: 'pending', splicing: 'nodata', distribution: 'nodata', fdtDone: 0, fdtPending: 0 },
    { ring: 'Sht R5', gr: 'pending', cw: 'pending', splicing: 'nodata', distribution: 'nodata', fdtDone: 0, fdtPending: 0 },
    { ring: 'Tik R1', gr: 'done', cw: 'done', splicing: 'done', distribution: 'done', fdtDone: 15, fdtPending: 0 },
    { ring: 'Tik R2', gr: 'mixed', cw: 'done', splicing: 'mixed', distribution: 'mixed', fdtDone: 15, fdtPending: 3 },
    { ring: 'Tik R3', gr: 'mixed', cw: 'pending', splicing: 'mixed', distribution: 'mixed', fdtDone: 9, fdtPending: 2 },
];