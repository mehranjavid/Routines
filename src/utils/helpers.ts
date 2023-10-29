// 'desc' on false

interface Activity {
  _id: string;
  name: string;
  schedule: string;
  visualAidUrl: string;
  createdAt: string;
}

export const filter_ = (data: Activity[], sortOrder: boolean): Activity[] => {
  const newData = [...data];

  newData.sort((a, b) => {
    const date_a = new Date(a.createdAt);
    const date_b = new Date(b.createdAt);

    if (sortOrder) {
      return date_a.getTime() - date_b.getTime();
    }
    if (!sortOrder) {
      return date_b.getTime() - date_a.getTime();
    }
    return 0;
  });

  return newData;
};
