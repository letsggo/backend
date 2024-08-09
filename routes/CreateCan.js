import express from 'express';
import Location from '../models/Location.js';
import Candidate from '../models/Candidates.js';

const router = express.Router();

// 장소를 Candidate 테이블에 추가하는 API
router.post('/add', async (req, res) => {
  const { list_name, locations } = req.body;

  if (!list_name || !locations || !Array.isArray(locations)) {
    return res.status(400).json({ error: 'List name and locations should be valid' });
  }

  try {
    const createdCandidates = await Promise.all(
      locations.map(async (loc) => {
        // Location 테이블에서 location_id로 해당 위치 정보 조회
        const location = await Location.findOne({ where: { location_id: loc.location_id } });
        if (!location) {
          throw new Error(`Location with ID ${loc.location_id} not found`);
        }

        // Candidate 테이블에 데이터 추가
        const candidate = await Candidate.create({
          can_id : "3",
          list_name,
          location_id: loc.location_id,
          can_name: location.location_name // can_name 필드 추가
        });

        return {
          location_id: loc.location_id,
          location_name: location.location_name,
          location_address: location.location_address
        };
      })
    );

    res.status(201).json({
      message: 'Candidate list created successfully',
      candidateList: {
        list_name,
        locations: createdCandidates
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding locations' });
  }
});

export default router;