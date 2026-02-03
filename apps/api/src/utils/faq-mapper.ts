type FaqRow = {
  id: string;
  sortOrder: number;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
};

export const toFaqDto = (row: FaqRow) => ({
  ...row,
  createdAt: row.createdAt.toISOString(),
  updatedAt: row.updatedAt.toISOString(),
});