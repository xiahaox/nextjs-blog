// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    { id: 0, title: '四库全书' },
    { id: 1, title: '发大水发' },
  ]);
}
