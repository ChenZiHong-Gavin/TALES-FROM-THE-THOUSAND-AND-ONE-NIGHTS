import Home from '../views/Home';
import Selection from '../views/Selection';
import { Theatre, Actor, Emotion } from '../views/Map';
import Movie from '../views/Movie';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/selection',
    element: <Selection />,
  },
  {
    path: '/map',
    children: [
      {
        path: '/map/theatre',
        element: <Theatre />,
      },
      {
        path: '/map/emotion',
        element: <Emotion />,
      },
      {
        path: '/map/actor',
        element: <Actor />,
      }
    ],
  },
  {
    path: '/movie',
    element: <Movie />
  }
];

export default routes;