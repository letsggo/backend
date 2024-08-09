import express from 'express';
import Vote from '../models/vote.js';
import Candidate from '../models/Candidates.js';

const router = express.Router();

// 후보지에 투표하는 API
router.post('/', async (req, res) => {
  const { candidate_id, user_id, state, skip } = req.body;

  try {
    // 후보지가 존재하는지 확인
    const candidate = await Candidate.findOne({ where: { can_id: candidate_id } });
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // 사용자 투표 확인 및 업데이트
    const [vote, created] = await Vote.findOrCreate({
      where: { candidate_id, user_id },
      defaults: { state, skip }
    });

    if (!created) {
      vote.state = state;
      vote.skip = skip;
      await vote.save();
    }

    res.status(201).json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while voting' });
  }
});

export default router;