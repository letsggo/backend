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

  // route 테이블 생성
  try {
    // TravelRoute에서 route_title과 route_id 찾기
    const routeTitle = await TravelRoute.findByPk(route_title);
    const startLocation = await TravelRoute.findByPk(route_id);

    if (!routeTitle) {
      return res.status(404).json({ message: 'routeTitle를 찾지 수 없습니다.' });
    } else if (!routeTitle && !startLocation) {
        return res.status(404).json({ message: 'routeTitle에 있는 startLocation을 찾을 수 없습니다.' });
    }

    const endLocation = await TravelRoute.findByPk(route_id + 1);

    if (!routeTitle && !endLocation) {
        return res.status(404).json({ message: 'routeTitle에 있는 endLocation 찾을 수 없습니다.' });
    }

    // 길찾기 URL 생성
    const search_url = generateNaverSearchUrl(startLocation.place_name, endLocation.place_name);

    // 새로운 Route 데이터를 생성
    const newRoute = await Route.create({
      travel_id,
      start_location: startLocation.place_name,
      end_location: endLocation.place_name,
      search_url
    });

    res.status(201).json({
      message: 'Route 테이블이 성공적으로 생성되었습니다.',
      route: newRoute
    });
  } catch (error) {
    console.error('Route 생성 오류:', error);
    res.status(500).json({ error: 'Route 생성 중 오류가 발생했습니다.' });
  }
});

// 길찾기 URL 조회 API
router.get('/:travel_id/routes/:route_id', async (req, res) => {
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
        message: 'url을 성공적으로 조회하였습니다.',
        route_id: route.route_id,
        search_url: route.search_url
      });
    } catch (error) {
      console.error('Route 검색 오류:', error);
      res.status(500).json({ error: 'Route 검색 중 오류가 발생했습니다.' });
    }
});
  
export default router;