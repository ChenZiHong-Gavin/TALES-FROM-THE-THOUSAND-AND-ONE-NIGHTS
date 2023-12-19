import Home from '../views/Home';
import Selection from '../views/Selection';
import { Theatre, Actor, Emotion, Photo, Tag } from '../views/Map';
import Movie from '../views/Movie';
import AIExperiment from '../views/AIExperiment';

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
      },
      {
        path: '/map/photo',
        element: <Photo />,
      },
      // {
      //   path: '/map/tag',
      //   element: <Tag />,
      // }
    ],
  },
  {
    path: '/movie',
    element: <Movie />
  },
  {
    path: '/aiexperiment',
    element: <AIExperiment />
  }
];

export default routes;