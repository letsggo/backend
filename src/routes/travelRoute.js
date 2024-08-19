import express from 'express';
import TravelRoute from '../models/travelRoute.js';

// URL 생성 API
const generateNaverSearchUrl = (startTitle, endTitle) => {
  const baseUrl = 'https://search.naver.com/search.naver?query=';
  const encodedStart = encodeURIComponent(startTitle);
  const encodedEnd = encodeURIComponent(endTitle);
  return `${baseUrl}${encodedStart}+to+${encodedEnd}`;
};

const router = express.Router();

// route 테이블 생성하는 API
router.get('/:travel_id/routes', async (req, res) => {
  const { travel_id } = req.params;
  const { location_id, acc_id } = req.body; // location_id와 acc_id를 사용해서 데이터를 찾습니다.

  // route 테이블 생성
  try {
    // TravelRoute에서 start_location과 end_location에 해당하는 데이터를 가져옴
    const startLocation = await Location.findByPk(location_id);
    const endLocation = await Accommodations.findByPk(acc_id);

    if (!startLocation || !endLocation) {
      return res.status(404).json({ message: '해당하는 Location 또는 Accommodation을 찾을 수 없습니다.' });
    }

    // 길찾기 URL 생성
    const search_url = generateNaverSearchUrl(startLocation.location_name, endLocation.acc_name);

    // 새로운 Route 데이터를 생성
    const newRoute = await Route.create({
      travel_id,
      start_location: startLocation.location_name,
      end_location: endLocation.acc_name,
      search_url
    });


    res.status(201).json({
      message: 'Route가 성공적으로 생성되었습니다.',
      route: newRoute
    });
  } catch (error) {
    console.error('Route 생성 오류:', error);
    res.status(500).json({ error: 'Route 생성 중 오류가 발생했습니다.' });
  }
});

// 길찾기 URL 조회 API
router.post('/:travel_id/routes/:route_id', async (req, res) => {
    const { start_location, end_location } = req.body;
  
    try {
      // Route 테이블에서 start_location과 end_location이 일치하는 데이터 조회
      const route = await Route.findOne({
        where: {
          start_location,
          end_location
        }
      });
  
      if (!route) {
        return res.status(404).json({ message: '일치하는 경로를 찾을 수 없습니다.' });
      }
  
      // 일치하는 경로 데이터 반환
      res.status(200).json({
        route_id: route.route_id,
        search_url: route.search_url
      });
    } catch (error) {
      console.error('Route 검색 오류:', error);
      res.status(500).json({ error: 'Route 검색 중 오류가 발생했습니다.' });
    }
});
  
export default router;