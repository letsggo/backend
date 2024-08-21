import express from 'express';
import TravelRoute from '../models/travelRoute.js';
import Route from '../models/Route.js';

// URL 생성 API
const generateNaverSearchUrl = (startTitle, endTitle) => {
  const baseUrl = 'https://search.naver.com/search.naver?query=';
  const encodedStart = encodeURIComponent(startTitle);
  const encodedEnd = encodeURIComponent(endTitle);
  return `${baseUrl}${encodedStart}+to+${encodedEnd}`;
};

const router = express.Router();

// route url 저장하는 API
router.post('/:travel_id/routes', async (req, res) => {
  const { travel_id, route_title, route_order } = req.params;

  // route 테이블 생성
  try {
    const Route = [];

    // TravelRoute에서 route_order로 출발 장소 가져오기
    const Location = await TravelRoute.findOne({
      where: {
          travel_id,
          route_title,
          route_order
      }
    });

    if (!Location) {
        return res.status(404).json({ message: '해당 travel_id의 route_title에 있는 Location을 찾을 수 없습니다.' });
    }

    const start = await TravelRoute.findOne(Location.route_order);
    const end = await TravelRoute.findOne(Location.route_order + 1);

    if (!end) {
        return res.status(404).json({ message: '도착 장소가 없습니다.' });
    }

    // 길찾기 URL 생성
    const search_url = generateNaverSearchUrl(start.place_name, end.place_name);

    // Route 테이블에 추가
    Route.push({
        travel_id,
        route_title,
        start_location: start.place_name,
        end_location: end.place_name,
        search_url
    });

    res.status(201).json({
      message: 'Route 테이블이 성공적으로 추가되었습니다.',
      route: newRoute
    });
  } catch (error) {
    console.error('Route url 추가 오류:', error);
    res.status(500).json({ error: 'Route url 추가 중 오류가 발생했습니다.' });
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
        search_url: route.search_url
      });
    } catch (error) {
      console.error('url 조회 오류:', error);
      res.status(500).json({ error: 'url 조회 중 오류가 발생했습니다.' });
    }
});
  
export default router;